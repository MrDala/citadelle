import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";

export type Init = {
  readonly argent: number;
  readonly batimentsMain: number;
};

export type CartesEcartees = {
  readonly masqueesAvantDistribution: number;
  readonly masqueesApresDistribution: number;
  readonly visibles: number;
};

export type DebutTour = {
  readonly argent: number;
  readonly argentParBatiment: number,
  readonly nbBatimentsPioches: number;
  readonly nbBatimentGardes: number;
};

interface iRegles {
  distribution (
    indexPremierJoueur: number, 
    joueurs: CustomArray<iJoueur>, 
    personnages: CustomArray<iPersonnage>, 
    cartesVisibles: CustomArray<iPersonnage>, 
    cartesMasquees: CustomArray<iPersonnage>
  ) : void;
  
  getInit(): Init;
  getCartesEcartees() : CartesEcartees;
  getDebutTour(): DebutTour;

  isPartieTerminee (joueurs: CustomArray<iJoueur>) : boolean;
  calculScore(joueur: iJoueur, premierHuitBatiments: iJoueur) : number;
}

export default iRegles;