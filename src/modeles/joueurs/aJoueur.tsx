import Batiment from "../batiments/Batiment";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import iJoueur from "./iJoueur";

abstract class aJoueur implements iJoueur {
  pseudo: string;
  couronne: boolean;
  personnages: CustomArray<iPersonnage>;
  cartesEnMain: CustomArray<Batiment>;
  cartesPosees: CustomArray<Batiment>;
  argent: number;

  constructor(pseudo: string) {
    this.pseudo = pseudo;
    this.couronne = false;
    this.personnages = new CustomArray<iPersonnage>();
    this.cartesEnMain = new CustomArray<Batiment>();
    this.cartesPosees = new CustomArray<Batiment>();
    this.argent = 0;
  }

  piocheBatiment(batiment: Batiment | undefined): void {
    if(batiment) {
      this.cartesEnMain.push(batiment);
    };
  }

  choixPersonnage(personnages: CustomArray<iPersonnage>): void {
    try {
      this.personnages.push(personnages.shift()!);
    } catch (error) {
      new Error("[ERROR]: Impossible de choisir un personnage.")
    }
  }

  rendrePersonnage(): CustomArray<iPersonnage> {
    var personnageRendu = new CustomArray<iPersonnage>();

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