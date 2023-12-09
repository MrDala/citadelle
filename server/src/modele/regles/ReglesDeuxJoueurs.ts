import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
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

  public distribution(indexPremierJoueur: number, joueurs: CustomArray<iJoueur>, personnages: CustomArray<iPersonnage>, cartesVisibles: CustomArray<iPersonnage>, cartesMasquees: CustomArray<iPersonnage>) {
    const joueurUn = joueurs[indexPremierJoueur];
    const joueurDeux = joueurs[(indexPremierJoueur + 1) % 2];

    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    // JOUEUR 1
    joueurUn.choixPersonnage(personnages, joueurUn.personnages);    // Choix du personnage

    // JOUEUR 2
    joueurDeux.choixPersonnage(personnages, joueurUn.personnages);  // Choix du personnage
    joueurDeux.choixPersonnage(personnages, cartesMasquees);        // Retrait d'un personnage

    // JOUEUR 1
    joueurUn.choixPersonnage(personnages, joueurUn.personnages);    // Choix du personnage
    joueurUn.choixPersonnage(personnages, cartesMasquees);          // Retrait d'un personnage

    // JOUEUR 2
    joueurDeux.choixPersonnage(personnages, joueurUn.personnages);  // Choix du personnage

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

export default ReglesDeuxJoueurs;