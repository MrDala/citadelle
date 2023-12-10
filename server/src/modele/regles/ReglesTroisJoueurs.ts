import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import aRegles from "./aRegles";

class ReglesTroisJoueurs extends aRegles {
  public constructor() {
    super({
      cartesEcartees: { 
        masqueesAvantDistribution: 1, 
        masqueesApresDistribution: 1, 
        visibles: 0, 
      }
    })
  }

  public distribution(indexPremierJoueur: number, joueurs: CustomArray<iJoueur>, personnages: CustomArray<iPersonnage>, cartesVisibles: CustomArray<iPersonnage>, cartesMasquees: CustomArray<iPersonnage>) {
    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    joueurs.customForEach(indexPremierJoueur, joueur => {
      let personnageChoisi = joueur.choix(personnages)[0]; // Choix du personnage
      joueur.prendrePersonnages(personnageChoisi);
    }, 2)

    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    // Contrôle de la bonne distribution
    if (personnages.length !== 0) {
      throw new Error(ERREURS.ERREUR_DISTRIBUTION());
    }
  }
}

export default ReglesTroisJoueurs;