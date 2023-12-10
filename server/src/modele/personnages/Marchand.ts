import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Marchand extends aPersonnage {
  public constructor() {
    super("Marchand", Clan.COMMERCANT, 6)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    // console.log("Le Marchand a joué !");
  }
}

export default Marchand;
