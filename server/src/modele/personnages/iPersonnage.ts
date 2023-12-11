import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";

interface iPersonnage {
  action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>): void;
  
  getNom(): string;
  getClan(): Clan;
  getOrdre(): number;
  getVivant(): boolean;
  getJoueur(): iJoueur | null;

  setVivant(vivant: boolean): void;
  setJoueur(joueur : iJoueur | null): void;
}

export default iPersonnage;