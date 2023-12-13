import iBatiment from "../batiments/iBatiment";
import Clan from "../enum/Clan";
import Personnages from "../enum/Personnages";
import iJoueur from "../joueurs/iJoueur";
import PersonnagePossede from "./PersonnagePossede";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Eveque extends aPersonnage {
  public constructor() {
    super("Évêque", Clan.RELIGIEUX, 5)
  }

  public action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>, 
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void {
    this.getEventBus().emit("DEBUT_EFFET_PERSONNAGE", { personnage: Personnages.EVEQUE });
    // Aucun pouvoir directement. 
    //Son imunité contre le Condottière est appliquée dans la classe Condottière.
    this.getEventBus().emit("FIN_EFFET_PERSONNAGE");
  }
}

export default Eveque;
