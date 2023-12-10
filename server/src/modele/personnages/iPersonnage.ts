import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";

interface iPersonnage {
  action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<iBatiment>): void;
  
  getNom(): string;
  getClan(): Clan;
  getOrdre(): number;
  getVivant(): boolean;
  setVivant(vivant: boolean): void;
}

export default iPersonnage;