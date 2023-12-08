import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Assassin extends aPersonnage {
  public constructor() {
    super("Assassin", Clan.NEUTRE, 1)
  }

  public action(joueur: iJoueur) {
    // console.log("L'Assassin a joué !")
  }
}

export default Assassin;
