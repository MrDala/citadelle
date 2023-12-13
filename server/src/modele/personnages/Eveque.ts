import iBatiment from "../batiments/iBatiment";
import Clan from "../enum/Clan";
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
    // Aucun pouvoir directement. 
    //Son imunité contre le Condottière est appliquée dans la classe Condottière.
  }
}

export default Eveque;
