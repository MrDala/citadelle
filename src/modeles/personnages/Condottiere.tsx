import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Condottiere extends aPersonnage {
  constructor() {
    super("Condottiere", Clan.MILITAIRE)
  }

  action() {}
}

export default Condottiere;
