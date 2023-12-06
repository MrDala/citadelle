import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Roi extends aPersonnage {
  constructor() {
    super("Roi", Clan.NOBLE)
  }

  action() {}
}

export default Roi;
