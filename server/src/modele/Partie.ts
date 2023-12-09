import json from "./data/data.json";
import Batiment from "./batiments/Batiment";
import FabriqueBatiments from "./batiments/FabriqueBatiments";
import ChoixAction from "./enum/ChoixAction";
import Erreurs from "./enum/Erreurs";
import iJoueur from "./joueurs/iJoueur";
import FabriquePersonnages from "./personnages/FabriquePersonnage";
import iPersonnage from "./personnages/iPersonnage";
import FabriqueRegles from "./regles/FabriqueRegles";
import iRegles from "./regles/iRegles";
import CustomArray from "./tools/CustomArray";

class Partie {
  private NOMBRE_JOUEUR_MIN = 2;
  private NOMBRE_JOUEUR_MAX = 7;

  private regles: iRegles;
  private joueurs: CustomArray<iJoueur>;
  private pioche: CustomArray<Batiment>;
  private personnages: CustomArray<iPersonnage>;
  private cartesVisibles: CustomArray<iPersonnage>;
  private cartesMasquees: CustomArray<iPersonnage>;
  private nombreTour: number;

  constructor(joueurs: CustomArray<iJoueur>) {
    if (joueurs.length < this.NOMBRE_JOUEUR_MIN) {
      throw Error(Erreurs.ERREUR_MANQUE_JOUEURS);
    } else if (joueurs.length > this.NOMBRE_JOUEUR_MAX) {
      throw Error(Erreurs.ERREUR_TROP_JOUEURS);
    }

    this.joueurs = joueurs;
    this.regles = FabriqueRegles.getRegles(this.joueurs.length);
    this.pioche = new CustomArray<Batiment>(...FabriqueBatiments.init(json.batiments));
    this.pioche.melanger();
    this.personnages = FabriquePersonnages.initAll();
    this.cartesVisibles = new CustomArray<iPersonnage>();
    this.cartesMasquees = new CustomArray<iPersonnage>();
    this.nombreTour = 1;
  }

  public debutPartie() {
    this.joueurs.forEach(joueur => {
      for (let i = 0; i < this.regles.initPioche; i++) {
        let carte = this.pioche.shift();
        if (carte) {
          joueur.batimentsEnMain.push(carte);
        }
      }
      joueur.argent += this.regles.initArgent;
    });

    var indexCouronne = Math.floor(Math.random() * this.joueurs.length);
    this.joueurs[indexCouronne].couronne = true;
  }

  public tourDeJeu() {
    this.phaseChoixDuRole();
    this.phaseAction();
    this.phaseFinDeTour();
  }

  /* Phase d'un tour de jeu */
  private phaseChoixDuRole() {
    this.personnages.melanger();
    const indexPremierJoueur = this.getIndexCouronne();
    this.regles.distribution(indexPremierJoueur, this.joueurs, this.personnages, this.cartesVisibles, this.cartesMasquees);
  }

  private phaseAction() {
    const personnagesTries = this.getPersonnagesTries();

    // Appeler chaque joueur dans l'ordre de passage de leurs personnages
    personnagesTries.forEach((role) => {
      this.gainPassif(role.joueur, role.personnage);
      this.actionArgentOuPioche(role.joueur);
      this.actionPersonnage(role.joueur, role.personnage);
      this.actionConstruire(role.joueur);
    });
  }

  private phaseFinDeTour() {
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
      throw new Error(Erreurs.ERREUR_COURRONNE);
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
        joueur.argent += 1;
      }
    })
  }

  private actionArgentOuPioche(joueur: iJoueur): number | CustomArray<Batiment> {
    const action = joueur.choixArgentPioche();

    switch (action) {
      case ChoixAction.ARGENT:
        joueur.argent += 2;
        break;
      case ChoixAction.PIOCHE:
        const cartes = new CustomArray<Batiment>;
        for (let i=0; i< 2; i++) {
          let carte;
          carte = this.pioche.shift();
          
          if (carte) {
            cartes.push(carte);
          }
        }

        if (cartes.length > 0) {
          this.pioche.push(...joueur.choixCarteBatiment(cartes));
        }
    }
    return 0;
  }

  private actionPersonnage(joueur: iJoueur, personnage: iPersonnage) : void {
    personnage.action(joueur);
  }

  private actionConstruire(joueur: iJoueur) {
    joueur.construireBatiment();
  }

}

export default Partie;