import Clan from "../enum/Clan";
import iPersonnage from "./iPersonnage";
import iBatiment from "../batiments/iBatiments";
import aPersonnage from "./aPersonnage";


class Assassin extends aPersonnage {
  public constructor() {
    super("Assassin", Clan.NEUTRE, 1)
  }

  public action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>) {
    const joueur = this.getJoueur();
    if (!joueur) return;

    const personnagesAttaquables = personnages.filter(personnage => personnage.getJoueur() === this.getJoueur());
    let personnage = joueur.choix(personnagesAttaquables)[0];
    personnage.setVivant(false);
  }
}

export default Assassin;
