import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";

interface iPersonnage {
  nom: string;
  clan: Clan;
  ordre: number;
  vivant: boolean;
  
  action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>): void;
}

export default iPersonnage;