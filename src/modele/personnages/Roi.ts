import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Roi extends aPersonnage {
  public constructor() {
    super("Roi", Clan.NOBLE, 4)
  }

  public action(joueur: iJoueur) {
    // console.log("Le Roi a joué !");
  }
}

export default Roi;
