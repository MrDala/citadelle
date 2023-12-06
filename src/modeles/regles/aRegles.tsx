import iJoueur from "../joueurs/iJoueur";
import Roi from "../personnages/Roi";
import iPersonnage from "../personnages/iPersonnage";
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
  
  distribution(indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: Array<iPersonnage>, cartesVisibles: Array<iPersonnage>, cartesMasquees: Array<iPersonnage>) {
    // Trie de la liste des joueurs
    const partie1 = joueurs.slice(indexPremierJoueur); // De l'index avec couronne à la fin
    const partie2 = joueurs.slice(0, indexPremierJoueur); // Du début à l'index avec couronne (non inclus)
    const joueursTries = partie1.concat(partie2);
      
    // Retrait des cartes VISIBLES
    for (let i = 0; i < this.nbrCartesVisibles; i++) {
      if (personnages.length > 0) {
        cartesVisibles.push(personnages.shift()!);
      } else {
        throw new Error("[ERROR] Carte personnage manquante");
      }
    }

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.nbrCartesMasqueesAvantDistribution; i++) {
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
          throw new Error("[ERROR] Carte personnage manquante");
        }
      }
    }
    
    // Choix du rôle par les joueurs
    joueursTries.forEach(joueur => {
      joueur.choixPersonnage(personnages, joueur.personnages);
    });

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.nbrCartesMasqueesApresDistribution; i++) {
      if (personnages.length > 0) {
        cartesMasquees.push(personnages.shift()!);
      } else {
        throw new Error("[ERROR] Carte personnage manquante");
      }
    }

    if (personnages.length !== 0) {
      throw new Error("[ERROR]: Erreur de distribution des cartes");
    }
  }
}

export default aRegles;