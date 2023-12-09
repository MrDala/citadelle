import json from "./data/data.json";
import Batiment from "./batiments/Batiment";
import FabriqueBatiments from "./batiments/FabriqueBatiments";
import ChoixAction from "./enum/ChoixAction";
import ERREURS from "./enum/Erreurs";
import iJoueur from "./joueurs/iJoueur";
import FabriquePersonnages from "./personnages/FabriquePersonnage";
import iPersonnage from "./personnages/iPersonnage";
import FabriqueRegles from "./regles/FabriqueRegles";
import iRegles from "./regles/iRegles";
import CustomArray from "./tools/CustomArray";

class Partie {
  private regles: iRegles;
  private joueurs: CustomArray<iJoueur>;
  private pioche: CustomArray<Batiment>;
  private personnages: CustomArray<iPersonnage>;
  private cartesVisibles: CustomArray<iPersonnage>;
  private cartesMasquees: CustomArray<iPersonnage>;
  private nombreTour: number;
  private premierHuitBatiments: iJoueur | null;

  constructor(joueurs: CustomArray<iJoueur>) {
    if (joueurs.length < FabriqueRegles.JOUEURS_MIN) {
      throw Error(ERREURS.ERREUR_MANQUE_JOUEURS());
    } else if (joueurs.length > FabriqueRegles.JOUEURS_MAX) {
      throw Error(ERREURS.ERREUR_TROP_JOUEURS());
    }

    this.joueurs = joueurs;
    this.regles = FabriqueRegles.getRegles(this.joueurs.length);
    this.pioche = new CustomArray<Batiment>(...FabriqueBatiments.init(json.batiments));
    this.pioche.melanger();
    this.personnages = FabriquePersonnages.initAll();
    this.cartesVisibles = new CustomArray<iPersonnage>();
    this.cartesMasquees = new CustomArray<iPersonnage>();
    this.nombreTour = 1;
    this.premierHuitBatiments = null;
  }

  public jouer(): void {
    console.log("DEBUT DE LA PARTIE");

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
      for (let i = 0; i < this.regles.init.batimentsMain; i++) {
        let carte = this.pioche.shift();
        if (carte) {
          joueur.batimentsEnMain.push(carte);
        }
      }
      joueur.argent += this.regles.init.argent;
    });

    var indexCouronne = Math.floor(Math.random() * this.joueurs.length);
    this.joueurs[indexCouronne].couronne = true;
  }

  private tourDeJeu(): void {
    this.phaseChoixDuRole();
    this.phaseAction();
    this.phaseFinDeTour();
  }

  private getClassement(): Array<{ pseudo: string; score: number }> {
    let classement: Array<{ pseudo: string; score: number }> = [];
  
    this.joueurs.forEach(joueur => {
      let score = this.regles.calculScore(joueur, this.premierHuitBatiments!);
      classement.push({ pseudo: joueur.pseudo, score });
    });
  
    // Trier le classement selon les scores (en ordre décroissant)
    classement.sort((a, b) => b.score - a.score);
  
    return classement;
  }

  /* Phase d'un tour de jeu */
  private phaseChoixDuRole(): void {
    this.personnages.melanger();
    const indexPremierJoueur = this.getIndexCouronne();
    this.regles.distribution(indexPremierJoueur, this.joueurs, this.personnages, this.cartesVisibles, this.cartesMasquees);
  }

  private phaseAction(): void {
    const personnagesTries = this.getPersonnagesTries();

    // Appeler chaque joueur dans l'ordre de passage de leurs personnages
    personnagesTries.forEach((role) => {
      this.gainPassif(role.joueur, role.personnage);
      this.actionArgentOuPioche(role.joueur);
      this.actionPersonnage(role.joueur, role.personnage);
      this.actionConstruire(role.joueur);
    });
  }

  private phaseFinDeTour(): void {
    this.joueurs.forEach(joueur => {
      const personnagesRendus = joueur.rendrePersonnage();
      this.personnages.push(...personnagesRendus);
    });

    this.cartesVisibles.transferAll(this.personnages);
    this.cartesMasquees.transferAll(this.personnages);

    this.nombreTour++
  }

  /* Fonction utilitaires */
  private getIndexCouronne(): number {
    // Détermine l'index du premier joueur à jouer
    const indexAvecCouronne = this.joueurs.findIndex(joueur => joueur.couronne === true);
    if (indexAvecCouronne === -1) {
      throw new Error(ERREURS.ERREUR_COURRONNE());
    }
    return indexAvecCouronne;
  }

  private getPersonnagesTries(): CustomArray<{ joueur: iJoueur, personnage: iPersonnage }> {
    // Créer une liste de tous les personnages avec une référence à leur joueur
    const personnagesAvecJoueur = new CustomArray<{ joueur: iJoueur, personnage: iPersonnage }>();

    this.joueurs.forEach(joueur => {
      joueur.personnages.forEach(personnage => {
        personnagesAvecJoueur.push({ joueur, personnage });
      });
    });
  
    return personnagesAvecJoueur.sort((a, b) => a.personnage.ordre - b.personnage.ordre); // Trier les personnages par leur ordre de passage
  }

  private gainPassif(joueur: iJoueur, personnage: iPersonnage) : void {
    joueur.batimentsPoses.forEach(batiment => {
      if (batiment.clan === personnage.clan) {
        joueur.argent += this.regles.debutTour.argent;
      }
    })
  }

  private actionArgentOuPioche(joueur: iJoueur): number | CustomArray<Batiment> {
    const action = joueur.choixArgentPioche();

    switch (action) {
      case ChoixAction.ARGENT:
        joueur.argent += this.regles.debutTour.argent;
        break;
      case ChoixAction.PIOCHE:
        const cartes = new CustomArray<Batiment>;
        for (let i=0; i < this.regles.debutTour.nbBatimentsPioches; i++) {
          let carte;
          carte = this.pioche.shift();
          
          if (carte) {
            cartes.push(carte);
          }
        }

        if (cartes.length > 0) {
          this.pioche.push(...joueur.choixCarteBatiment(cartes, this.regles.debutTour.nbBatimentGardes));
        }
    }
    return 0;
  }

  private actionPersonnage(joueur: iJoueur, personnage: iPersonnage) : void {
    personnage.action(joueur);
  }

  private actionConstruire(joueur: iJoueur) {
    joueur.construireBatiment();

    if (joueur.batimentsPoses.length >= 8 && !this.premierHuitBatiments) {
      this.premierHuitBatiments = joueur;
    }
  }

}

export default Partie;