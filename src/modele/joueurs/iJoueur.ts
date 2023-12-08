import Batiment from "../batiments/Batiment";
import ChoixAction from "../enum/ChoixAction";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";

interface iJoueur {
  pseudo: string;
  couronne: boolean;
  personnages: CustomArray<iPersonnage>;
  batimentsEnMain: CustomArray<Batiment>;
  batimentsPoses: CustomArray<Batiment>;
  argent: number;
  
  choixPersonnage(personnages: CustomArray<iPersonnage>, pileDestination: CustomArray<iPersonnage>): void;
  rendrePersonnage(): CustomArray<iPersonnage>;

  choixArgentPioche(): ChoixAction;
  choixCarteBatiment(cartes: CustomArray<Batiment>): CustomArray<Batiment>
  construireBatiment(): void;
}

export default iJoueur;