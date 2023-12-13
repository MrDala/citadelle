import ERREURS from "../enum/Erreurs";
import TypeChoix from "../enum/TypeChoix";
import iJoueur from "../joueurs/iJoueur";
import PilePersonnage from "../personnages/PilePersonnage";
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

  public distribution(indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: PilePersonnage) {
    let cartes = personnages.getCartesChoisissables();
    
    // Retrait d'un personnage
    try {
      personnages.setCarteMasquee(cartes[Math.floor(Math.random() * cartes.length)]);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }


    for (let i = 0; i < joueurs.length * 2; i++) {
      // Actualisation de la liste de cartes choisissables
      cartes = personnages.getCartesChoisissables();

      // Identification du joueur courant
      const currentIndex = (indexPremierJoueur + i) % joueurs.length;
      const joueur = joueurs[currentIndex];

      // Choix du personnage
      const personnageChoisi = joueur.choix(TypeChoix.PERSONNAGE, cartes)[0];
      personnages.choisirPersonnage(personnageChoisi, joueur);
    }
    

    // Retrait d'un personnage
    cartes = personnages.getCartesChoisissables();
    try {
      personnages.setCarteMasquee(cartes[Math.floor(Math.random() * cartes.length)]);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    // Contrôle de la bonne distribution
    cartes = personnages.getCartesChoisissables();
    if (cartes.length !== 0) {
      throw new Error(ERREURS.ERREUR_DISTRIBUTION());
    }
  }
}

export default ReglesTroisJoueurs;