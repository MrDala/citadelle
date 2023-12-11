import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Voleur extends aPersonnage {
  public constructor() {
    super("Voleur", Clan.NEUTRE, 2)
  }

  public action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>) {

  }
}

export default Voleur;
