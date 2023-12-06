import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import aRegles from "./aRegles";

class ReglesDeuxJoueurs extends aRegles {
  constructor() {
    super(undefined, undefined, 1, 1, 0)
  }

  distribution(indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: Array<iPersonnage>, cartesVisibles: Array<iPersonnage>, cartesMasquees: Array<iPersonnage>) {
    const joueurUn = joueurs[indexPremierJoueur];
    const joueurDeux = joueurs[(indexPremierJoueur + 1) % 2];

    // Retrait d'un personnage
    try {
      cartesMasquees.push(personnages.shift()!);
    } catch (error) {
      throw new Error("[ERROR]: Impossible de retirer une carte de la pile");
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
      throw new Error("[ERROR]: Impossible de retirer une carte de la pile");
    }
  }
}

export default ReglesDeuxJoueurs;