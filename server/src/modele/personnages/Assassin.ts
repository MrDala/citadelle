import Clan from "../enum/Clan";
import iBatiment from "../batiments/iBatiment";
import aPersonnage from "./aPersonnage";
import PersonnagePossede from "./PersonnagePossede";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "./iPersonnage";
import TypeChoix from "../enum/TypeChoix";
import Personnages from "../enum/Personnages";


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
    this.getEventBus().emit("DEBUT_EFFET_PERSONNAGE", {personnage: Personnages.ASSASSIN})

    let personnage = joueur.choix(TypeChoix.CIBLE_ASSASSIN, personnagesAttaquables)[0];
    personnage.setVivant(false);

    this.getEventBus().emit("FIN_EFFET_PERSONNAGE", {})
  }
}

export default Assassin;
