import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
import Roi from "../personnages/Roi";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import iRegles from "./iRegles";

abstract class aRegles implements iRegles{
  initArgent: number;
  initPioche: number;
  nbrCartesMasqueesAvantDistribution: number;
  nbrCartesMasqueesApresDistribution: number;
  nbrCartesVisibles: number;

  protected constructor(initArgent: number = 2, initPioche: number = 4, nbrCartesMasqueesAvantDistribution: number, nbrCartesMasqueesApresDistribution: number, nbrCartesVisibles: number) {
    this.initArgent = initArgent;
    this.initPioche = initPioche;
    this.nbrCartesMasqueesAvantDistribution = nbrCartesMasqueesAvantDistribution;
    this.nbrCartesMasqueesApresDistribution = nbrCartesMasqueesApresDistribution;
    this.nbrCartesVisibles = nbrCartesVisibles;
  }
  
  public distribution(indexPremierJoueur: number, joueurs: CustomArray<iJoueur>, personnages: CustomArray<iPersonnage>, cartesVisibles: CustomArray<iPersonnage>, cartesMasquees: CustomArray<iPersonnage>) {
    // Retrait des cartes VISIBLES
    for (let i = 0; i < this.nbrCartesVisibles; i++) {
      let carte: iPersonnage | null = null;
    
      while (!carte || carte instanceof Roi) {
        try {
          carte = personnages.shift()!;
          if (carte instanceof Roi) {   // Remise dans la pile si le ROI est la carte masquée 
            personnages.push(carte);
          } else {                      // Retrait de la carte
            cartesMasquees.push(carte);
          }
        } catch (error) {
          throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
        }
      }
    }

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.nbrCartesMasqueesAvantDistribution; i++) {
      if (personnages.length > 0) {
        cartesVisibles.push(personnages.shift()!);
      } else {
        throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
      }
    }
    
    // Choix du rôle par les joueurs
    joueurs.customForEach(indexPremierJoueur, joueur => {
      joueur.choixPersonnage(personnages, joueur.personnages);
    });

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.nbrCartesMasqueesApresDistribution; i++) {
      if (personnages.length > 0) {
        cartesMasquees.push(personnages.shift()!);
      } else {
        throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
      }
    }

    // Contrôle de la bonne distribution
    if (personnages.length !== 0) {
      throw new Error(ERREURS.ERREUR_DISTRIBUTION());
    }
  }
}

export default aRegles;