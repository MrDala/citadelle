import Clan from "../enum/Clan";
import iBatiment from "../batiments/iBatiments";
import aPersonnage from "./aPersonnage";
import PersonnagePossede from "./PersonnagePossede";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "./iPersonnage";


class Assassin extends aPersonnage {
  public constructor() {
    super("Assassin", Clan.NEUTRE, 1)
  }

  public action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>, 
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void {
    let personnage = joueur.choix(personnagesAttaquables)[0];
    personnage.setVivant(false);
  }
}

export default Assassin;
