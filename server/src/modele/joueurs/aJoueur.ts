import { UUID, randomUUID } from "crypto";
import Batiment from "../batiments/Batiment";
import ChoixAction from "../enum/ChoixAction";
import ERREURS from "../enum/Erreurs";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import iJoueur from "./iJoueur";

abstract class aJoueur implements iJoueur {
  id: UUID;
  pseudo: string;
  couronne: boolean;
  personnages: CustomArray<iPersonnage>;
  batimentsEnMain: CustomArray<Batiment>;
  batimentsPoses: CustomArray<Batiment>;
  argent: number;

  constructor(pseudo: string) {
    this.id = randomUUID()    ;
    this.pseudo = pseudo;
    this.couronne = false;
    this.personnages = new CustomArray<iPersonnage>();
    this.batimentsEnMain = new CustomArray<Batiment>();
    this.batimentsPoses = new CustomArray<Batiment>();
    this.argent = 0;
  }

  /* Fonction à implémenter dans les classes enfants */
  abstract choixCarteBatiment(cartes: Array<Batiment>, nbBatimentsGardes: number): Array<Batiment>;
  abstract construireBatiment(): Batiment | null;
  abstract choix<T>(liste: Array<T>, nbChoixMax?: number): Array<T>;

  rendrePersonnage(): Array<iPersonnage> {
    var personnagesRendus = new Array<iPersonnage>();

    this.personnages.transferAll(personnagesRendus);

    return personnagesRendus;
  }
}

export default aJoueur;