import Clan from "../enum/Clan";

export type typeBatiment = {
  nom: string, 
  cout: number, 
  valeur: number, 
  clan: Clan, 
  effet?: string
}

class Batiment {
  nom: string;
  cout: number;
  valeur: number;
  clan: Clan;
  effet?: string;

  constructor(batiment : typeBatiment) {
    this.nom = batiment.nom;
    this.cout = batiment.cout;
    this.valeur = batiment.valeur;
    this.clan = batiment.clan;
    this.effet = batiment.effet;
  }
}

export default Batiment;