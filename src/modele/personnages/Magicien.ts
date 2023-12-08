import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Magicien extends aPersonnage {
  public constructor() {
    super("Magicien", Clan.NEUTRE, 3)
  }

  public action(joueur: iJoueur) {
    // console.log("Le Magicien a joué !");
  }
}

export default Magicien;
