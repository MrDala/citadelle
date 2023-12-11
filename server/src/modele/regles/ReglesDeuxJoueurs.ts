import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
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

  public distribution(indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: Array<iPersonnage>, cartesVisibles: Array<iPersonnage>, cartesMasquees: Array<iPersonnage>) {
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
    personnageChoisi = joueurUn.choix(personnages)[0]; // Choix du personnage
    joueurUn.prendrePersonnages(personnageChoisi);   

    // JOUEUR 2
    personnageChoisi = joueurDeux.choix(personnages)[0]; // Choix du personnage
    joueurDeux.prendrePersonnages(personnageChoisi);

    personnageChoisi = joueurDeux.choix(personnages)[0]; // Retrait d'un personnage
    cartesMasquees.push(personnageChoisi);      

    // JOUEUR 1
    personnageChoisi = joueurUn.choix(personnages)[0]; // Choix du personnage
    joueurUn.prendrePersonnages(personnageChoisi);

    personnageChoisi = joueurUn.choix(personnages)[0]; // Retrait d'un personnage
    cartesMasquees.push(personnageChoisi);      

    // JOUEUR 2
    personnageChoisi = joueurDeux.choix(personnages)[0]; // Choix du personnage
    joueurDeux.prendrePersonnages(personnageChoisi);

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