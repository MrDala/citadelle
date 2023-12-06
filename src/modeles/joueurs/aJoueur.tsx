import Batiment from "../batiments/Batiment";
import iPersonnage from "../personnages/iPersonnage";
import iJoueur from "./iJoueur";

abstract class aJoueur implements iJoueur {
  pseudo: string;
  couronne: boolean;
  personnages: Array<iPersonnage>;
  cartesEnMain: Array<Batiment>;
  cartesPosees: Array<Batiment>;
  argent: number;

  constructor(pseudo: string) {
    this.pseudo = pseudo;
    this.couronne = false;
    this.personnages = new Array<iPersonnage>();
    this.cartesEnMain = new Array<Batiment>();
    this.cartesPosees = new Array<Batiment>();
    this.argent = 0;
  }

  piocheBatiment(batiment: Batiment | undefined): void {
    if(batiment) {
      this.cartesEnMain.push(batiment);
    };
  }

  choixPersonnage(personnages: Array<iPersonnage>): void {
    try {
      this.personnages.push(personnages.shift()!);
    } catch (error) {
      new Error("[ERROR]: Impossible de choisir un personnage.")
    }
  }

  rendrePersonnage(): Array<iPersonnage> {
    var personnageRendu = new Array<iPersonnage>();

    for (let i=0; i < this.personnages.length; i++) {
      personnageRendu.push(this.personnages.shift()!);
    }

    return personnageRendu;
  }

  setCouronne(bool: boolean): void {
    this.couronne = bool;
  }

  variationArgent(variation: number): void {
    this.argent += variation;
  }
}

export default aJoueur;