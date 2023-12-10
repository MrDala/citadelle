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
    
  choixCarte<T extends iPersonnage | Batiment>(listeCartes: CustomArray<T>): T;
  rendrePersonnage(): CustomArray<iPersonnage>;
  choixArgentPioche(): ChoixAction;
  choixCarteBatiment(cartes: CustomArray<Batiment>, nbBatimentsGardes: number): CustomArray<Batiment>
  construireBatiment(): Batiment | null;
}

export default iJoueur;