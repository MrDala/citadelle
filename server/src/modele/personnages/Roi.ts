import Batiment from "../batiments/Batiment";
import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import PersonnagePossede from "./PersonnagePossede";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Roi extends aPersonnage {
  public constructor() {
    super("Roi", Clan.NOBLE, 4)
  }

  public action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>, 
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void {  
    joueurs.forEach(j => j.getCouronne() && j.setCouronne(false));
    joueur.setCouronne(true);
  }  
}

export default Roi;
