import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";
import iBatiment from "../batiments/iBatiments";
import iPersonnage from "./iPersonnage";

class Architecte extends aPersonnage {
  public constructor() {
    super("Architecte", Clan.NEUTRE, 7)
  }

  public action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>) {
    const joueur = this.getJoueur();
    if (!joueur) return;

    const nbCartesPiochees = 2;

    for (let i=0; i< nbCartesPiochees; i++) {
      if(piocheBatiment.length > 0) {
        const batimentPioche = piocheBatiment.shift();
        joueur.addBatimentsEnMain(batimentPioche!);
      }
    }
  }
}

export default Architecte;