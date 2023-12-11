import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";

class Voleur extends aPersonnage {
  public constructor() {
    super("Voleur", Clan.NEUTRE, 2)
  }

  public action(joueur: iJoueur, joueurs: Array<iJoueur>, piocheBatiment: Array<Batiment>) {

  }
}

export default Voleur;
