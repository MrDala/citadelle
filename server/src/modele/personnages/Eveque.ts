import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Eveque extends aPersonnage {
  public constructor() {
    super("Évêque", Clan.RELIGIEUX, 5)
  }

  public action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>) {
    // Aucun pouvoir directement. 
    //Son imunité contre le Condottière est appliquée dans la classe Condottière.
  }
}

export default Eveque;
