import iJoueur from "../joueurs/iJoueur";
import PilePersonnage from "../personnages/PilePersonnage";

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
  distribution (indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: PilePersonnage ) : void;
  
  getInit(): Init;
  getCartesEcartees() : CartesEcartees;
  getDebutTour(): DebutTour;

  isPartieTerminee (joueurs: Array<iJoueur>) : boolean;
  calculScore(joueur: iJoueur, premierHuitBatiments: iJoueur) : number;
}

export default iRegles;