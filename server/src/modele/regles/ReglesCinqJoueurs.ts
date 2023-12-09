import aRegles from "./aRegles";

class ReglesCinqJoueurs extends aRegles {
  public constructor() {
    super({ 
      cartesEcartees: { 
        masqueesAvantDistribution: 1, 
        masqueesApresDistribution: 1, 
        visibles: 1, 
      }
    })
  }
}

export default ReglesCinqJoueurs;