import iBatiment from "../batiments/iBatiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import PersonnagePossede from "./PersonnagePossede";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Marchand extends aPersonnage {
  public constructor() {
    super("Marchand", Clan.COMMERCANT, 6)
  }

  public action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>, 
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void {
    joueur.variationArgent(1);
  }
}

export default Marchand;
