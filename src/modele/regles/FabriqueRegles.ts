import Erreurs from "../enum/Erreurs";
import ReglesCinqJoueurs from "./ReglesCinqJoueurs";
import ReglesDeuxJoueurs from "./ReglesDeuxJoueurs";
import ReglesQuatreJoueurs from "./ReglesQuatreJoueurs";
import ReglesSeptJoueurs from "./ReglesSeptJoueurs";
import ReglesSixJoueurs from "./ReglesSixJoueurs";
import ReglesTroisJoueurs from "./ReglesTroisJoueurs";
import iRegles from "./iRegles";


class FabriqueRegles {
  public static getRegles(nombreJoueurs: number): iRegles {
    switch (nombreJoueurs) {
      case 2:
        return new ReglesDeuxJoueurs();
      case 3:
        return new ReglesTroisJoueurs();
      case 4:
        return new ReglesQuatreJoueurs();
      case 5:
        return new ReglesCinqJoueurs();
      case 6:
        return new ReglesSixJoueurs();
      case 7:
        return new ReglesSeptJoueurs();
      default:
        throw new Error(Erreurs.ERREUR_NOMBRE_JOUEURS)
    }
  }
}

export default FabriqueRegles;