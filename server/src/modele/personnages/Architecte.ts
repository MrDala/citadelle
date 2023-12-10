import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";

class Architecte extends aPersonnage {
  public constructor() {
    super("Architecte", Clan.NEUTRE, 7)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    const nbCartesPiochees = 2;
    for (let i=0; i< nbCartesPiochees; i++) {
      if(piocheBatiment.length > 0) {
        const batimentPioche = piocheBatiment.shift();
        joueur.batimentsEnMain.push(batimentPioche!);
      }
    }
  }
}

export default Architecte;