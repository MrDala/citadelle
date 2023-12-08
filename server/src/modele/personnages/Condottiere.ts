import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Condottiere extends aPersonnage {
  public constructor() {
    super("Condottiere", Clan.MILITAIRE, 8)
  }

  public action(joueur: iJoueur) {
    // console.log("Le Condottière a joué !");
  }
}

export default Condottiere;
