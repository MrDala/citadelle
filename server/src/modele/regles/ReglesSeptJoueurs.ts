import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
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

  public distribution(indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: Array<iPersonnage>, cartesVisibles: Array<iPersonnage>, cartesMasquees: Array<iPersonnage>) {
    // Retrait d'une carte MASQUEE
    if (personnages.length === 0) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }
    cartesMasquees.push(personnages.shift()!);

    for(let i=0; i < joueurs.length - 1; i++){
      let currentIndex = (indexPremierJoueur + i) % joueurs.length;
      const joueur = joueurs[currentIndex];

      let personnageChoisi = joueur.choix(personnages)[0];
      joueur.prendrePersonnages(personnageChoisi);
    }

    // Ajout de la carte masquée dans la liste des cartes à personnages
    personnages.push(cartesMasquees.shift()!);

    // Choix du personnage par le dernier joueur parmi 2 cartes restantes
    var indexDernierJoueur = (indexPremierJoueur - 1 >= 0) ? (indexPremierJoueur - 1) % joueurs.length : indexPremierJoueur - 1 + joueurs.length;
    const dernierJoueur = joueurs[indexDernierJoueur];
    let personnageChoisi = dernierJoueur.choix(personnages)[0]; // Choix du personnage
    dernierJoueur.prendrePersonnages(personnageChoisi);

    // Retrait des carte MASQUEES
    if (personnages.length === 0) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }
    cartesMasquees.push(personnages.shift()!);

    // Contrôle de la bonne distribution
    if (personnages.length !== 0) {
      throw new Error(ERREURS.ERREUR_DISTRIBUTION());
    }
  }
}


export default ReglesSeptJoueurs;