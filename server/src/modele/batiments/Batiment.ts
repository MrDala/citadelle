import Clan from "../enum/Clan";
import Erreurs from "../enum/Erreurs";
import { Effets, effet } from "./Effets";

export type typeBatiment = {
  nom: string, 
  cout: number, 
  valeur: number, 
  clan: Clan, 
  effet?: effet
}

class Batiment {
  nom: string;
  cout: number;
  valeur: number;
  clan: Clan;
  effet?: effet;

  public constructor(batiment : typeBatiment) {
    this.checkFields(batiment);

    this.nom = batiment.nom;
    this.cout = batiment.cout;
    this.valeur = batiment.valeur;
    this.clan = batiment.clan;
    this.effet = batiment.effet;
  }

  private checkFields(batiment: typeBatiment): void {

    if (typeof batiment.nom !== 'string') {
      throw new Error(Erreurs.ERREUR_BAT_ATTRIBUT + batiment.nom);
    }

    if (typeof batiment.cout !== 'number' || batiment.cout <= 0) {
      throw new Error(Erreurs.ERREUR_BAT_ATTRIBUT + batiment.cout);
    }

    if (typeof batiment.valeur !== 'number' || batiment.valeur <= 0) {
      throw new Error(Erreurs.ERREUR_BAT_ATTRIBUT + batiment.valeur);
    }

    if (
      !(batiment.clan in Clan) ||
      (
        batiment.clan !== Clan.NOBLE &&
        batiment.clan !== Clan.COMMERCANT &&
        batiment.clan !== Clan.RELIGIEUX &&
        batiment.clan !== Clan.MILITAIRE &&
        batiment.clan !== Clan.MERVEILLE
      )
    ) {
      throw new Error(Erreurs.ERREUR_BAT_ATTRIBUT + batiment.clan);
    }

    if (
      typeof batiment.effet !== 'undefined' && 
      (
        typeof batiment.effet !== typeof Effets ||
        batiment.clan !== Clan.MERVEILLE
      )
    ) {
      throw new Error(Erreurs.ERREUR_BAT_ATTRIBUT + batiment.effet);
    }
  }
}

export default Batiment;