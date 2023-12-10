import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Magicien extends aPersonnage {
  public constructor() {
    super("Magicien", Clan.NEUTRE, 3)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    // console.log("Le Magicien a joué !");
  }
}

export default Magicien;
