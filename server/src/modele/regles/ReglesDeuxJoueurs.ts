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
    let personnageChoisi : iPersonnage;

    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    // JOUEUR 1
    personnageChoisi = joueurUn.choixCarte(personnages); // Choix du personnage
    joueurUn.personnages.push(personnageChoisi);   

    // JOUEUR 2
    personnageChoisi = joueurDeux.choixCarte(personnages); // Choix du personnage
    joueurDeux.personnages.push(personnageChoisi);

    personnageChoisi = joueurDeux.choixCarte(personnages); // Retrait d'un personnage
    cartesMasquees.push(personnageChoisi);      

    // JOUEUR 1
    personnageChoisi = joueurUn.choixCarte(personnages); // Choix du personnage
    joueurUn.personnages.push(personnageChoisi);

    personnageChoisi = joueurUn.choixCarte(personnages); // Retrait d'un personnage
    cartesMasquees.push(personnageChoisi);      

    // JOUEUR 2
    personnageChoisi = joueurDeux.choixCarte(personnages); // Choix du personnage
    joueurDeux.personnages.push(personnageChoisi);

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