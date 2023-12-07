import Batiment from "./batiments/Batiment";
import FabriqueBatiments from "./batiments/FabriqueBatiments";
import Erreurs from "./enum/Erreurs";
import iJoueur from "./joueurs/iJoueur";
import FabriquePersonnages from "./personnages/FabriquePersonnage";
import iPersonnage from "./personnages/iPersonnage";
import FabriqueRegles from "./regles/FabriqueRegles";
import iRegles from "./regles/iRegles";
import CustomArray from "./tools/CustomArray";

class Partie {
  NOMBRE_JOUEUR_MIN = 2;
  NOMBRE_JOUEUR_MAX = 7;

  regles: iRegles;
  joueurs: CustomArray<iJoueur>;
  pioche: CustomArray<Batiment>;
  personnages: CustomArray<iPersonnage>;
  cartesVisibles: CustomArray<iPersonnage>;
  cartesMasquees: CustomArray<iPersonnage>;

  constructor(joueurs: CustomArray<iJoueur>) {
    if (joueurs.length < this.NOMBRE_JOUEUR_MIN) {
      throw Error(Erreurs.ERREUR_MANQUE_JOUEURS);
    } else if (joueurs.length > this.NOMBRE_JOUEUR_MAX) {
      throw Error(Erreurs.ERREUR_TROP_JOUEURS);
    }

    this.joueurs = joueurs;
    this.regles = FabriqueRegles.getRegles(this.joueurs.length);
    this.pioche = FabriqueBatiments.init();
    this.pioche.melanger();
    this.personnages = FabriquePersonnages.initAll();
    this.cartesVisibles = new CustomArray<iPersonnage>();
    this.cartesMasquees = new CustomArray<iPersonnage>();
  }

  debutPartie() {
    this.joueurs.forEach(joueur => {
      for (let i = 0; i < this.regles.initPioche; i++) {
        let carte = this.pioche.shift();
        joueur.piocheBatiment(carte);
      }
      joueur.variationArgent(this.regles.initArgent);
    });

    var indexCouronne = Math.floor(Math.random() * this.joueurs.length);
    this.joueurs[indexCouronne].setCouronne(true);
  }

  tourDeJeu() {
    this.phaseChoixDuRole();
    this.phaseFinDeTour();
  }

  statusPartie() {
    console.log("Liste des joueurs");
    console.log(this.joueurs);
    console.log("Liste des cartes visibles");
    console.log(this.cartesVisibles);
    console.log("Liste des cartes masquées");
    console.log(this.cartesMasquees);
  }

  /* Phase d'un tour de jeu */
  private phaseChoixDuRole() {
    this.personnages.melanger();
    const indexPremierJoueur = this.getIndexCouronne();
    this.regles.distribution(indexPremierJoueur, this.joueurs, this.personnages, this.cartesVisibles, this.cartesMasquees);
  }


  private phaseFinDeTour() {
    this.joueurs.forEach(joueur => {
      this.personnages.concat(joueur.rendrePersonnage());
    });
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
}

export default Partie;