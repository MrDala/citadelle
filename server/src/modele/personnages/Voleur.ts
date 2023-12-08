import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Voleur extends aPersonnage {
  public constructor() {
    super("Voleur", Clan.NEUTRE, 2)
  }

  public action(joueur: iJoueur) {
    // console.log("Le Voleur a joué !");
  }
}

export default Voleur;
