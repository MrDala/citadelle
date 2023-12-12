import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import PersonnagePossede from "./PersonnagePossede";

interface iPersonnage {
  action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>,
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void;

  getNom(): string;
  getClan(): Clan;
  getOrdre(): number;
  getVivant(): boolean;

  setVivant(vivant: boolean): void;
}

export default iPersonnage;