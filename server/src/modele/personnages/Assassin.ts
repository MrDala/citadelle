import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Assassin extends aPersonnage {
  public constructor() {
    super("Assassin", Clan.NEUTRE, 1)
  }

  public action(joueur: iJoueur, joueurs: Array<iJoueur>, piocheBatiment: Array<Batiment>) {
    let personnages = new Array<iPersonnage>;
    joueurs.forEach(joueur => personnages.push(...joueur.getPersonnages()));

    let personnage = joueur.choix(personnages)[0];
    personnage.setVivant(false);
  }
}

export default Assassin;
