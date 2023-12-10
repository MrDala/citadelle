import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Roi extends aPersonnage {
  public constructor() {
    super("Roi", Clan.NOBLE, 4)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    let joueurCouronne = joueurs.find(j => j.couronne);
    if (joueurCouronne){
      joueurCouronne.couronne = false;
    }
    joueur.couronne = true;
  }
  
}

export default Roi;
