import Clan from "../enum/Clan";

abstract class aPersonnage {
  nom: string;
  clan: Clan;
  ordre: number;
  
  protected constructor(nom: string, clan: Clan, ordre: number) {
    this.nom = nom;
    this.clan = clan;
    this.ordre = ordre;
  }
}

export default aPersonnage;