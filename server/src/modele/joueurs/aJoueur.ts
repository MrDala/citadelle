import Batiment from "../batiments/Batiment";
import ChoixAction from "../enum/ChoixAction";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import iJoueur from "./iJoueur";

abstract class aJoueur implements iJoueur {
  pseudo: string;
  couronne: boolean;
  personnages: CustomArray<iPersonnage>;
  batimentsEnMain: CustomArray<Batiment>;
  batimentsPoses: CustomArray<Batiment>;
  argent: number;

  constructor(pseudo: string) {
    this.pseudo = pseudo;
    this.couronne = false;
    this.personnages = new CustomArray<iPersonnage>();
    this.batimentsEnMain = new CustomArray<Batiment>();
    this.batimentsPoses = new CustomArray<Batiment>();
    this.argent = 0;
  }

  /* Fonction à implémenter dans les classes enfants */
  abstract choixCarteBatiment(cartes: CustomArray<Batiment>, nbBatimentsGardes: number): CustomArray<Batiment>;
  abstract choixArgentPioche(): ChoixAction;
  abstract construireBatiment(): Batiment | null;

  choixCarte<T extends iPersonnage | Batiment>(listeCartes: CustomArray<T>): T {
    try {
      const indiceAleatoire = Math.floor(Math.random() * listeCartes.length);
      return listeCartes.splice(indiceAleatoire, 1)[0];
    } catch (error) {
      throw new Error("[ERROR]: Impossible de choisir une carte.");
    }
  }

  rendrePersonnage(): CustomArray<iPersonnage> {
    var personnagesRendus = new CustomArray<iPersonnage>();

    this.personnages.transferAll(personnagesRendus);

    return personnagesRendus;
  }
}

export default aJoueur;