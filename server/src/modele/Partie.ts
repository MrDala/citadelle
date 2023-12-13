import json from "./data/data.json";
import ChoixAction from "./enum/ChoixAction";
import ERREURS from "./enum/Erreurs";
import FabriqueBatiments from "./batiments/FabriqueBatiments";
import FabriquePersonnages from "./personnages/FabriquePersonnage";
import FabriqueRegles from "./regles/FabriqueRegles";
import iJoueur from "./joueurs/iJoueur";
import iPersonnage from "./personnages/iPersonnage";
import iRegles from "./regles/iRegles";
import iBatiment from "./batiments/iBatiment";
import PilePersonnage from "./personnages/PilePersonnage";
import ChoixPioche from "./enum/ChoixPioche";
import PersonnagePossede from "./personnages/PersonnagePossede";
import EventBus from "./evenements/EventBus";

class Partie {
  private eventBus: EventBus;
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

    this.eventBus = EventBus.getInstance();
    this.joueurs = joueurs;
    this.regles = FabriqueRegles.getRegles(this.joueurs.length);
    this.pioche = new Array<iBatiment>(...FabriqueBatiments.init(json.batiments));
    this.pioche.sort(() => Math.random() - 0.5);
    this.personnages = new PilePersonnage(FabriquePersonnages.initAll());
    this.nombreTour = 0;
    this.premierHuitBatiments = null;
  }

  public jouer(): void {
    this.eventBus.emit("DEBUT_PARTIE");
    this.initPartie();
    do {
      this.tourDeJeu();
    } while (!this.regles.isPartieTerminee(this.joueurs));

    let classement = this.getClassement();
    this.eventBus.emit("FIN_PARTIE", { nombreTour: this.nombreTour, classement: classement });
  }

  private initPartie(): void {
    this.eventBus.emit("DEBUT_INITIALISATION");

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

    this.eventBus.emit("FIN_INITIALISATION");
  }

  private tourDeJeu(): void {
    this.eventBus.emit("DEBUT_TOUR", {nbTour : this.nombreTour});

    this.nombreTour++;
    this.phaseChoixDuRole();
    this.phaseAction();
    this.phaseFinDeTour();

    this.eventBus.emit("FIN_TOUR");
  }

  /* Phase d'un tour de jeu */
  private phaseChoixDuRole(): void {
    this.eventBus.emit("DEBUT_PHASE_DISTRIBUTION");

    this.personnages.getCartesChoisissables().sort(() => Math.random() - 0.5);
    const indexPremierJoueur = this.getIndexCouronne();
    this.regles.distribution(indexPremierJoueur, this.joueurs, this.personnages);

    this.eventBus.emit("FIN_PHASE_DISTRIBUTION");
  }

  private phaseAction(): void {
    this.eventBus.emit("DEBUT_PHASE_ACTION");

    const personnagesChoisis = this.personnages.getCartesChoisies();
    const personnagesTries = personnagesChoisis.sort((a, b) => a.getCarte().getOrdre() - b.getCarte().getOrdre());

    // Appeler chaque joueur dans l'ordre de passage de leurs personnages
    personnagesTries.forEach((carteChoisie) => {
      if (carteChoisie.getCarte().getVivant()) {
        this.actionParPersonnage(carteChoisie);
      }
    });

    this.eventBus.emit("FIN_PHASE_ACTION");
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

  private actionConstruire(joueur: iJoueur) {
    joueur.construireBatiment();

    if (joueur.getBatimentsPoses().length >= 8 && !this.premierHuitBatiments) {
      this.premierHuitBatiments = joueur;
    }
  }

  private gainPassif(joueur: iJoueur, personnage: iPersonnage): void {
    joueur.getBatimentsPoses().map((batiment: iBatiment) => {
      if (batiment.getClan() === personnage.getClan()) {
        joueur.variationArgent(this.regles.getDebutTour().argent);
      }
    })
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

}

export default Partie;