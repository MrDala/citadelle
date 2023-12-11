import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
import PilePersonnage from "../personnages/PilePersonnage";
import iPersonnage from "../personnages/iPersonnage";
import aRegles from "./aRegles";

class ReglesDeuxJoueurs extends aRegles {
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
    const joueurUn = joueurs[indexPremierJoueur];
    const joueurDeux = joueurs[(indexPremierJoueur + 1) % 2];
    let carteChoisie : iPersonnage;
    let cartes = personnages.getCartesChoisissables();

    // Retrait d'un personnage
    try {
      personnages.setCarteMasquee(cartes[Math.floor(Math.random() * cartes.length)]);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    // JOUEUR 1
    cartes = personnages.getCartesChoisissables(); // Actualisation des cartes jouables

    carteChoisie = joueurUn.choix(cartes)[0]; // Choix du personnage
    carteChoisie.setJoueur(joueurUn);

    for(let i = 1; i >= 0; i--) {
      cartes = personnages.getCartesChoisissables(); // Actualisation des cartes jouables

      carteChoisie = joueurs[i].choix(cartes)[0]; // Choix du personnage
      carteChoisie.setJoueur(joueurs[i]);
  
      cartes = personnages.getCartesChoisissables(); // Actualisation des cartes jouables
  
      carteChoisie = joueurs[i].choix(cartes)[0]; // Retrait d'un personnage
      personnages.setCarteMasquee(carteChoisie);
    }

    // JOUEUR 2
    cartes = personnages.getCartesChoisissables(); // Actualisation des cartes jouables

    carteChoisie = joueurDeux.choix(cartes)[0]; // Choix du personnage
    carteChoisie.setJoueur(joueurDeux);


    // Retrait d'un personnage
    cartes = personnages.getCartesChoisissables(); // Actualisation des cartes jouables

    try {
      personnages.setCarteMasquee(cartes[0]);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    cartes = personnages.getCartesChoisissables(); // Actualisation des cartes jouables

    // Contrôle de la bonne distribution
    if (cartes.length !== 0) {
      throw new Error(ERREURS.ERREUR_DISTRIBUTION());
    }
  }
}

export default ReglesDeuxJoueurs;