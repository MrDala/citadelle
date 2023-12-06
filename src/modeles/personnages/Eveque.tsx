import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Eveque extends aPersonnage {
  constructor() {
    super("Eveque", Clan.RELIGIEUX)
  }

  action() {}
}

export default Eveque;
