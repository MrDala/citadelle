import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
import PilePersonnage from "../personnages/PilePersonnage";
import iPersonnage from "../personnages/iPersonnage";
import aRegles from "./aRegles";

class ReglesSeptJoueurs extends aRegles {
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
    let carteMasquee: iPersonnage;

    // Retrait d'une carte MASQUEE
    try {
      carteMasquee = cartes[Math.floor(Math.random() * cartes.length)];
      personnages.setCarteMasquee(carteMasquee);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    // Choix des personnages pour les 7 premier joueurs
    for(let i=0; i < joueurs.length - 1; i++){
      const currentIndex = (indexPremierJoueur + i) % joueurs.length;
      const joueur = joueurs[currentIndex];
      cartes = personnages.getCartesChoisissables();

      const personnageChoisi = joueur.choix(cartes)[0];
      personnages.choisirPersonnage(personnageChoisi, joueur);
    }

    // Ajout de la carte masquée dans la liste des cartes à personnages
    try {
      personnages.setCarteJouable(carteMasquee);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    // Identification du dernier joueur
    const indexDernierJoueur = (indexPremierJoueur - 1 + joueurs.length) % joueurs.length;
    const dernierJoueur = joueurs[indexDernierJoueur];

    
    // Choix du personnage
    cartes = personnages.getCartesChoisissables();
    const personnageChoisi = dernierJoueur.choix(cartes)[0]; // Choix du personnage
    personnages.choisirPersonnage(personnageChoisi, dernierJoueur);
  }
}


export default ReglesSeptJoueurs;