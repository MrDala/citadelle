import Clan from "../enum/Clan";

abstract class aPersonnage {
  nom: string;
  clan: Clan;
  ordre: number;
  vivant: boolean;
  
  protected constructor(nom: string, clan: Clan, ordre: number) {
    this.nom = nom;
    this.clan = clan;
    this.ordre = ordre;
    this.vivant = true;
  }
}

export default aPersonnage;