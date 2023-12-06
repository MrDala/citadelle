import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Assassin extends aPersonnage {
  constructor() {
    super("Assassin", Clan.NEUTRE)
  }

  action() {}
}

export default Assassin;
