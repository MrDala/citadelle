import Clan from "../enum/Clan";
import { Effet } from "./Effets";

interface iBatiment {
  getNom(): string;
  getCout(): number;
  getValeur(): number;
  getClan(): Clan;
  getEffet(): Effet | null;
}

export default iBatiment;