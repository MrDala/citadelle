import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";

class Marchand extends aPersonnage {
  public constructor() {
    super("Marchand", Clan.COMMERCANT, 6)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    joueur.variationArgent(1);
  }
}

export default Marchand;
