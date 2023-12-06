import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Magicien extends aPersonnage {
  constructor() {
    super("Magicien", Clan.NEUTRE)
  }

  action() {}
}

export default Magicien;
