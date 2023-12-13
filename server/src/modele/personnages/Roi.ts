import Batiment from "../batiments/Batiment";
import iBatiment from "../batiments/iBatiment";
import Clan from "../enum/Clan";
import Personnages from "../enum/Personnages";
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
    this.getEventBus().emit("DEBUT_EFFET_PERSONNAGE", { personnage: Personnages.ROI });

    joueurs.forEach(j => j.getCouronne() && j.setCouronne(false));
    joueur.setCouronne(true);

    this.getEventBus().emit("FIN_EFFET_PERSONNAGE", {});
  }  
}

export default Roi;
