import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Assassin extends aPersonnage {
  public constructor() {
    super("Assassin", Clan.NEUTRE, 1)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    let personnages = new CustomArray<iPersonnage>;
    joueurs.forEach(joueur => personnages.push(...joueur.personnages));

    let personnage = joueur.choixCarte(personnages);
    personnage.vivant = false;
  }
}

export default Assassin;
