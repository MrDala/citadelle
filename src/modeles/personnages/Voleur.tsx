import Clan from "../enum/Clan";
import aPersonnage from "./aPersonnage";

class Voleur extends aPersonnage {
  constructor() {
    super("Voleur", Clan.NEUTRE)
  }

  action() {}
}

export default Voleur;
