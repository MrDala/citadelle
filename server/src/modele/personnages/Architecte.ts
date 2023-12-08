import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Architecte extends aPersonnage {
  public constructor() {
    super("Architecte", Clan.NEUTRE, 7)
  }

  public action(joueur: iJoueur) {
    // console.log("Le Architecte a joué !");
  }
}

export default Architecte;