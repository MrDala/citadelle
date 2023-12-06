import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Marchand extends aPersonnage {
  constructor() {
    super("Marchand", Clan.COMMERCANT)
  }

  action() {}
}

export default Marchand;
