import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";

class Voleur extends aPersonnage {
  public constructor() {
    super("Voleur", Clan.NEUTRE, 2)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    // console.log("Le Voleur a joué !");
  }
}

export default Voleur;
