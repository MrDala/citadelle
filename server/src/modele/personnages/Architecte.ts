import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Architecte extends aPersonnage {
  public constructor() {
    super("Architecte", Clan.NEUTRE, 7)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    
  }
}

export default Architecte;