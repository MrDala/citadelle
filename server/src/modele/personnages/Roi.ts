import Batiment from "../batiments/Batiment";
import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Roi extends aPersonnage {
  public constructor() {
    super("Roi", Clan.NOBLE, 4)
  }

  public action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>) {
    const joueur = this.getJoueur();
    if (!joueur) return;
  
    const joueurs = personnages
      .map(personnage => personnage.getJoueur())
      .filter((joueur): joueur is iJoueur => joueur !== null);
  
    joueurs.forEach(j => j.getCouronne() && j.setCouronne(false));
    joueur.setCouronne(true);
  }  
}

export default Roi;
