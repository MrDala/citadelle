import Batiment from "../batiments/Batiment";
import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Marchand extends aPersonnage {
  public constructor() {
    super("Marchand", Clan.COMMERCANT, 6)
  }

  public action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>) {
    const joueur = this.getJoueur();
    if (!joueur) return;
    
    joueur.variationArgent(1);
  }
}

export default Marchand;
