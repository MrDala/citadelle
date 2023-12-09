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
  abstract construireBatiment(): void;

  choixPersonnage(personnages: CustomArray<iPersonnage>): void {
    try {
      this.personnages.push(personnages.shift()!);
    } catch (error) {
      new Error("[ERROR]: Impossible de choisir un personnage.")
    }
  }

  rendrePersonnage(): CustomArray<iPersonnage> {
    var personnagesRendus = new CustomArray<iPersonnage>();

    this.personnages.transferAll(personnagesRendus);

    return personnagesRendus;
  }
}

export default aJoueur;