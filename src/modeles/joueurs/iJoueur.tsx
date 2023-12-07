import Batiment from "../batiments/Batiment";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";

interface iJoueur {
  pseudo: string;
  couronne: boolean;
  personnages: CustomArray<iPersonnage>;
  cartesEnMain: CustomArray<Batiment>;
  cartesPosees: CustomArray<Batiment>;
  argent: number;

  piocheBatiment(batiment: Batiment | undefined): void;
  
  choixPersonnage(personnages: CustomArray<iPersonnage>, pileDestination: CustomArray<iPersonnage>): void;
  rendrePersonnage(): CustomArray<iPersonnage>;

  setCouronne(bool: boolean): void;
  variationArgent(variation: number): void
}

export default iJoueur;