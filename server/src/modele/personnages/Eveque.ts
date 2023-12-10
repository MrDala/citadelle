import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Eveque extends aPersonnage {
  public constructor() {
    super("Évêque", Clan.RELIGIEUX, 5)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    // console.log("L'Évêque a joué !");
  }
}

export default Eveque;
