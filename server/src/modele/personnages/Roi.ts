import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";

class Roi extends aPersonnage {
  public constructor() {
    super("Roi", Clan.NOBLE, 4)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    let joueurCouronne = joueurs.find(j => j.getCouronne());
    if (joueurCouronne){
      joueurCouronne.setCouronne(false);
    }
    joueur.setCouronne(true);
  }
  
}

export default Roi;
