import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Marchand extends aPersonnage {
  public constructor() {
    super("Marchand", Clan.COMMERCANT, 6)
  }

  public action(joueur: iJoueur) {
    // console.log("Le Marchand a joué !");
  }
}

export default Marchand;
