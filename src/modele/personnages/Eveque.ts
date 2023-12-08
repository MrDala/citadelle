import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Eveque extends aPersonnage {
  public constructor() {
    super("Évêque", Clan.RELIGIEUX, 5)
  }

  public action(joueur: iJoueur) {
    // console.log("L'Évêque a joué !");
  }
}

export default Eveque;
