import iBatiment from "../batiments/iBatiment";
import Clan from "../enum/Clan";
import Personnages from "../enum/Personnages";
import iJoueur from "../joueurs/iJoueur";
import PersonnagePossede from "./PersonnagePossede";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Voleur extends aPersonnage {
  public constructor() {
    super("Voleur", Clan.NEUTRE, 2)
  }

  public action(
    joueur: iJoueur,
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>, 
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void {
    this.getEventBus().emit("DEBUT_EFFET_PERSONNAGE", { personnage: Personnages.VOLEUR });

    this.getEventBus().emit("FIN_EFFET_PERSONNAGE", {});
  }
}

export default Voleur;
