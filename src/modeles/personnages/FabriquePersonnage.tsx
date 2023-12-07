import CustomArray from "../tools/CustomArray";
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
  static init = {
    ASSASSIN: new Assassin(),
    VOLEUR: new Voleur(),
    ROI: new Roi(),
    ARCHITECTE: new Architecte(),
    MAGICIEN: new Magicien(),
    EVEQUE: new Eveque(),
    MARCHAND: new Marchand(),
    CONDOTTIERE: new Condottiere(),
  } as const;

  static initAll(): CustomArray<iPersonnage> {
    return new CustomArray<iPersonnage>(...Object.values(FabriquePersonnages.init));
  }
}


export default FabriquePersonnages;