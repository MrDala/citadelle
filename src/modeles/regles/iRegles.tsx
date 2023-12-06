import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";

interface iRegles {
  initArgent: number,
  initPioche: number,

  nbrCartesMasqueesAvantDistribution: number,
  nbrCartesMasqueesApresDistribution: number,
  nbrCartesVisibles: number,

  distribution: (indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: Array<iPersonnage>, cartesVisibles: Array<iPersonnage>, cartesMasquees: Array<iPersonnage>) => void;
}

export default iRegles;