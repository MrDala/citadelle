import Clan from "../enum/Clan";

interface iPersonnage {
  nom: string;
  clan: Clan;
  action(): void;}

export default iPersonnage;