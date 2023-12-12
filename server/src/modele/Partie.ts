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
import ChoixPioche from "./enum/ChoixPioche";
import PersonnagePossede from "./personnages/PersonnagePossede";

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
    this.initPartie();
    do {
      console.log("DEBUT DU TOUR n°" + this.nombreTour);
      console.log(this.joueurs);
      console.log(this.pioche);
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
    const personnagesChoisis = this.personnages.getCartesChoisies();
    const personnagesTries = personnagesChoisis.sort((a, b) => a.getCarte().getOrdre() - b.getCarte().getOrdre());

    // Appeler chaque joueur dans l'ordre de passage de leurs personnages
    personnagesTries.forEach((carteChoisie) => {
      if (carteChoisie.getCarte().getVivant()) {
        this.actionParPersonnage(carteChoisie);
      }
    });
  }

  private actionParPersonnage(carteChoisie: PersonnagePossede): void {
    const joueur = carteChoisie.getJoueur();
    const personnage = carteChoisie.getCarte();
    let actionsDipos = Object.values(ChoixAction);
    let choix: ChoixAction;

    do {
      // Choix de l'action réalisée par le joueur
      choix = joueur.choix(actionsDipos)[0];

      switch (choix) {
        case ChoixAction.PIOCHE:
          this.actionArgentOuPioche(joueur);
          break;
        case ChoixAction.EFFET_PERSONNAGE:
          this.actionPersonnage(joueur, personnage);
          break;
        case ChoixAction.CONSTRUIRE:
          this.actionConstruire(joueur);
          break;
      }

      //Retrait de l'action choisie
      actionsDipos = actionsDipos.filter(action => action !== choix);
    } while (choix !== ChoixAction.FIN_TOUR && actionsDipos.length > 0);
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

  private actionArgentOuPioche(joueur: iJoueur): number | Array<iBatiment> {
    const action = joueur.choix(Object.values(ChoixPioche))[0];

    switch (action) {
      // Choix de recevoir de l'argent
      case ChoixPioche.ARGENT:
        joueur.variationArgent(this.regles.getDebutTour().argent);
        break;
      // Choix de piocher des cartes batiments
      case ChoixPioche.CARTE:
        // Pioche d'un certain nombre de cartes
        const cartes = new Array<iBatiment>;

        for (let i = 0; i < this.regles.getDebutTour().nbBatimentsPioches; i++) {
          let carte;
          carte = this.pioche.shift();

          if (carte) {
            cartes.push(carte);
          }
        }

        if (cartes.length > 0) {
          // Choix de la(les) carte gardée par le joueur
          const cartesNonChoisies = joueur.choixCarteBatiment(cartes, this.regles.getDebutTour().nbBatimentGardes);
          this.pioche.push(...cartesNonChoisies);
        }
    }
    return 0;
  }

  private actionPersonnage(joueur: iJoueur, personnage: iPersonnage): void {
    this.gainPassif(joueur, personnage);
    personnage.action(joueur, this.joueurs, this.personnages.getCartesChoisies(), this.personnages.getCartesTous(), this.pioche);
  }

  private gainPassif(joueur: iJoueur, personnage: iPersonnage): void {
    joueur.getBatimentsPoses().map((batiment: iBatiment) => {
      if (batiment.getClan() === personnage.getClan()) {
        joueur.variationArgent(this.regles.getDebutTour().argent);
      }
    })
  }

  private actionConstruire(joueur: iJoueur) {
    joueur.construireBatiment();

    if (joueur.getBatimentsPoses().length >= 8 && !this.premierHuitBatiments) {
      this.premierHuitBatiments = joueur;
    }
  }

}

export default Partie;