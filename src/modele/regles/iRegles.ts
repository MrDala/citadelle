import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";

interface iRegles {
  initArgent: number,
  initPioche: number,

  nbrCartesMasqueesAvantDistribution: number,
  nbrCartesMasqueesApresDistribution: number,
  nbrCartesVisibles: number,

  distribution: (indexPremierJoueur: number, joueurs: CustomArray<iJoueur>, personnages: CustomArray<iPersonnage>, cartesVisibles: CustomArray<iPersonnage>, cartesMasquees: CustomArray<iPersonnage>) => void;
}

export default iRegles;