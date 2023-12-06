import Batiment from "../batiments/Batiment";
import iPersonnage from "../personnages/iPersonnage";

interface iJoueur {
  pseudo: string;
  couronne: boolean;
  personnages: Array<iPersonnage>;
  cartesEnMain: Array<Batiment>;
  cartesPosees: Array<Batiment>;
  argent: number;

  piocheBatiment(batiment: Batiment | undefined): void;
  
  choixPersonnage(personnages: Array<iPersonnage>, pileDestination: Array<iPersonnage>): void;
  rendrePersonnage(): Array<iPersonnage>;

  setCouronne(bool: boolean): void;
  variationArgent(variation: number): void
}

export default iJoueur;