import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";

interface iRegles {
  init: {
    argent: number;
    batimentsMain: number;
  };
  cartesEcartees: {
    masqueesAvantDistribution: number;
    masqueesApresDistribution: number;
    visibles: number;
  };
  debutTour: {
    argent: number;
    argentParBatiment: number,
    nbBatimentsPioches: number;
    nbBatimentGardes: number;
  };

  distribution (
    indexPremierJoueur: number, 
    joueurs: CustomArray<iJoueur>, 
    personnages: CustomArray<iPersonnage>, 
    cartesVisibles: CustomArray<iPersonnage>, 
    cartesMasquees: CustomArray<iPersonnage>
  ) : void;
  
  isPartieTerminee (joueurs: CustomArray<iJoueur>) : boolean;
  calculScore(joueur: iJoueur, premierHuitBatiments: iJoueur) : number;
}

export default iRegles;