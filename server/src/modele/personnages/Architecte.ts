import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";
import iBatiment from "../batiments/iBatiment";
import PersonnagePossede from "./PersonnagePossede";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "./iPersonnage";
import Personnages from "../enum/Personnages";

class Architecte extends aPersonnage {
  public constructor() {
    super("Architecte", Clan.NEUTRE, 7)
  }

  public action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>, 
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void {
    this.getEventBus().emit("DEBUT_EFFET_PERSONNAGE", {personnage: Personnages.ARCHITECTE})

    const nbCartesPiochees = 2;

    for (let i=0; i< nbCartesPiochees; i++) {
      if(piocheBatiment.length > 0) {
        const batimentPioche = piocheBatiment.shift();
        
        joueur.addBatimentsEnMain(batimentPioche!);
      }
    }

    this.getEventBus().emit("FIN_EFFET_PERSONNAGE")
  }
}

export default Architecte;