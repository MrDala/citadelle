import Clan from "../enum/Clan";

abstract class aPersonnage {
  nom: string;
  clan: Clan;
  
  constructor(nom: string, clan: Clan) {
    this.nom = nom;
    this.clan = clan;
  }
}

export default aPersonnage;