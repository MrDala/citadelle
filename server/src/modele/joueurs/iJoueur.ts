import { UUID } from "crypto";
import Batiment from "../batiments/Batiment";
import ChoixAction from "../enum/ChoixAction";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import ERREURS from "../enum/Erreurs";

interface iJoueur {
  id: UUID;
  pseudo: string;
  couronne: boolean;
  personnages: CustomArray<iPersonnage>;
  batimentsEnMain: CustomArray<Batiment>;
  batimentsPoses: CustomArray<Batiment>;
  argent: number;
    
  choix<T>(liste: Array<T>, nbChoixMax?: number): Array<T>;
  rendrePersonnage(): Array<iPersonnage>;
  choixCarteBatiment(cartes: Array<Batiment>, nbBatimentsGardes: number): Array<Batiment>
  construireBatiment(): Batiment | null;
}

export default iJoueur;