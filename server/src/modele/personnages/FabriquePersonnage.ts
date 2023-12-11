import Architecte from "./Architecte";
import Assassin from "./Assassin";
import Condottiere from "./Condottiere";
import Eveque from "./Eveque";
import Magicien from "./Magicien";
import Marchand from "./Marchand";
import Roi from "./Roi";
import Voleur from "./Voleur";
import iPersonnage from "./iPersonnage";

class FabriquePersonnages {
  public static init = {
    ASSASSIN: new Assassin(),
    VOLEUR: new Voleur(),
    ROI: new Roi(),
    ARCHITECTE: new Architecte(),
    MAGICIEN: new Magicien(),
    EVEQUE: new Eveque(),
    MARCHAND: new Marchand(),
    CONDOTTIERE: new Condottiere(),
  } as const;

  public static initAll(): Array<iPersonnage> {
    return new Array<iPersonnage>(...Object.values(FabriquePersonnages.init));
  }
}


export default FabriquePersonnages;