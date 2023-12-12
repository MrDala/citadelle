import aRegles from "./aRegles";

class ReglesQuatreJoueurs extends aRegles {
  public constructor() {
    super({
      cartesEcartees: { 
        masqueesAvantDistribution: 1, 
        masqueesApresDistribution: 1, 
        visibles: 2, 
      }
    })
  }
  
}

export default ReglesQuatreJoueurs;