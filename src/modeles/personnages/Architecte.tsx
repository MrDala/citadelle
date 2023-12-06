import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Architecte extends aPersonnage {
  constructor() {
    super("Architecte", Clan.NEUTRE)
  }

  action() {}
}

export default Architecte;
