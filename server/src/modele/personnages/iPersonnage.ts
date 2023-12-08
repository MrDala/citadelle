import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";

interface iPersonnage {
  nom: string;
  clan: Clan;
  ordre: number;
  
  action(joueur: iJoueur): void;}

export default iPersonnage;