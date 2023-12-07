import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import aRegles from "./aRegles";

class ReglesTroisJoueurs extends aRegles {
  constructor() {
    super(undefined, undefined, 1, 1, 0);
  }

  distribution(indexPremierJoueur: number, joueurs: CustomArray<iJoueur>, personnages: CustomArray<iPersonnage>, cartesVisibles: CustomArray<iPersonnage>, cartesMasquees: CustomArray<iPersonnage>) {
    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error("[ERROR]: Impossible de retirer une carte de la pile");
    }

    joueurs.customForEach(indexPremierJoueur, joueur => {
      joueur.choixPersonnage(personnages, joueur.personnages) // Choix du personnage
    }, 2)

    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error("[ERROR]: Impossible de retirer une carte de la pile");
    }

    // Contrôle de la bonne distribution
    if (personnages.length !== 0) {
      throw new Error("[ERROR]: Erreur de distribution des cartes");
    }
  }
}

export default ReglesTroisJoueurs;