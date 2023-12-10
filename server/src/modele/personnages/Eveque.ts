import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";

class Eveque extends aPersonnage {
  public constructor() {
    super("Évêque", Clan.RELIGIEUX, 5)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    // Aucun pouvoir directement. 
    //Son imunité contre le Condottière est appliquée dans la classe Condottière.
  }
}

export default Eveque;
