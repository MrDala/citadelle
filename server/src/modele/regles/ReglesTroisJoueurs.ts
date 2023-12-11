import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
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

  public distribution(indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: Array<iPersonnage>, cartesVisibles: Array<iPersonnage>, cartesMasquees: Array<iPersonnage>) {
    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    for (let i = 0; i < joueurs.length * 2; i++) {
      const currentIndex = (indexPremierJoueur + i) % joueurs.length;
      const joueur = joueurs[currentIndex];
      const personnageChoisi = joueur.choix(personnages)[0];
      joueur.prendrePersonnages(personnageChoisi);
    }
    

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