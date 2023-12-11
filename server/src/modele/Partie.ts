import json from "./data/data.json";
import ChoixAction from "./enum/ChoixAction";
import ERREURS from "./enum/Erreurs";
import FabriqueBatiments from "./batiments/FabriqueBatiments";
import FabriquePersonnages from "./personnages/FabriquePersonnage";
import FabriqueRegles from "./regles/FabriqueRegles";
import iJoueur from "./joueurs/iJoueur";
import iPersonnage from "./personnages/iPersonnage";
import iRegles from "./regles/iRegles";
import iBatiment from "./batiments/iBatiments";
import PilePersonnage from "./personnages/PilePersonnage";

class Partie {
  private regles: iRegles;
  private joueurs: Array<iJoueur>;
  private pioche: Array<iBatiment>;
  private personnages: PilePersonnage;
  private nombreTour: number;
  private premierHuitBatiments: iJoueur | null;

  constructor(joueurs: Array<iJoueur>) {
    if (joueurs.length < FabriqueRegles.JOUEURS_MIN) {
      throw Error(ERREURS.ERREUR_MANQUE_JOUEURS());
    } else if (joueurs.length > FabriqueRegles.JOUEURS_MAX) {
      throw Error(ERREURS.ERREUR_TROP_JOUEURS());
    }

    this.joueurs = joueurs;
    this.regles = FabriqueRegles.getRegles(this.joueurs.length);
    this.pioche = new Array<iBatiment>(...FabriqueBatiments.init(json.batiments));
    this.pioche.sort(() => Math.random() - 0.5);
    this.personnages = new PilePersonnage(FabriquePersonnages.initAll());
    this.nombreTour = 0;
    this.premierHuitBatiments = null;
  }

  public jouer(): void {
    console.log("DEBUT DE LA PARTIE");
    console.log(this.nombreTour);
    this.initPartie();
    do {
      this.tourDeJeu();
    } while (!this.regles.isPartieTerminee(this.joueurs));
  
    let classement = this.getClassement();
  
    console.log("Nombre de tour joués : " + this.nombreTour + "\n");
    console.log(classement);
    console.log("\nFIN DE LA PARTIE");
  }

  private initPartie(): void {
    this.joueurs.forEach(joueur => {
      for (let i = 0; i < this.regles.getInit().batimentsMain; i++) {
        let carte = this.pioche.shift();
        if (carte) {
          joueur.addBatimentsEnMain(carte);
        }
      }
      joueur.variationArgent(this.regles.getInit().argent);
    });

    var indexCouronne = Math.floor(Math.random() * this.joueurs.length);
    this.joueurs[indexCouronne].setCouronne(true);
  }

  private tourDeJeu(): void {
    this.nombreTour++;
    this.phaseChoixDuRole();
    this.phaseAction();
    this.phaseFinDeTour();
  }

  private getClassement(): Array<{ pseudo: string; score: number }> {
    let classement: Array<{ pseudo: string; score: number }> = [];
  
    this.joueurs.forEach(joueur => {
      let score = this.regles.calculScore(joueur, this.premierHuitBatiments!);
      classement.push({ pseudo: joueur.getPseudo(), score });
    });
  
    // Trier le classement selon les scores (en ordre décroissant)
    classement.sort((a, b) => b.score - a.score);
  
    return classement;
  }

  /* Phase d'un tour de jeu */
  private phaseChoixDuRole(): void {
    this.personnages.getCartesChoisissables().sort(() => Math.random() - 0.5);
    const indexPremierJoueur = this.getIndexCouronne();

    this.regles.distribution(indexPremierJoueur, this.joueurs, this.personnages);
  }

  private phaseAction(): void {
    const personnagesJouables = this.personnages.getCartesTous();
    const personnagesTries = personnagesJouables.sort((a, b) => a.getOrdre() - b.getOrdre());

    // Appeler chaque joueur dans l'ordre de passage de leurs personnages
    personnagesTries.forEach((personnage) => {
      const joueur = personnage.getJoueur();
      if (!joueur) return;
      
      if (personnage.getVivant()) {
        this.gainPassif(joueur, personnage);
        this.actionArgentOuPioche(joueur);
        this.actionPersonnage(joueur, personnage);
        this.actionConstruire(joueur);
      }
    });
  }

  private phaseFinDeTour(): void {
    this.personnages.reinitialiserCartesJouables();
  }

  /* Fonction utilitaires */
  private getIndexCouronne(): number {
    // Détermine l'index du premier joueur à jouer
    const indexAvecCouronne = this.joueurs.findIndex(joueur => joueur.getCouronne() === true);
    if (indexAvecCouronne === -1) {
      throw new Error(ERREURS.ERREUR_COURRONNE());
    }
    return indexAvecCouronne;
  }

  private gainPassif(joueur: iJoueur, personnage: iPersonnage) : void {
    
    joueur.getBatimentsPoses().map((batiment: iBatiment) => {
      if (batiment.getClan() === personnage.getClan()) {
        joueur.variationArgent(this.regles.getDebutTour().argent);
      }
    })
  }

  private actionArgentOuPioche(joueur: iJoueur): number | Array<iBatiment> {
    const action = joueur.choix(Object.values(ChoixAction))[0];

    switch (action) {
      case ChoixAction.ARGENT:
        joueur.variationArgent(this.regles.getDebutTour().argent);
        break;
      case ChoixAction.PIOCHE:
        const cartes = new Array<iBatiment>;
        for (let i=0; i < this.regles.getDebutTour().nbBatimentsPioches; i++) {
          let carte;
          carte = this.pioche.shift();
          
          if (carte) {
            cartes.push(carte);
          }
        }

        if (cartes.length > 0) {
          this.pioche.push(...joueur.choixCarteBatiment(cartes, this.regles.getDebutTour().nbBatimentGardes));
        }
    }
    return 0;
  }

  private actionPersonnage(joueur: iJoueur, personnage: iPersonnage) : void {
    personnage.action(this.personnages.getCartesTous(), this.pioche);
  }

  private actionConstruire(joueur: iJoueur) {
    joueur.construireBatiment();

    if (joueur.getBatimentsPoses().length >= 8 && !this.premierHuitBatiments) {
      this.premierHuitBatiments = joueur;
    }
  }

}

export default Partie;