import Clan from "../enum/Clan";
import ERREURS from "../enum/Erreurs";
import { Effets, Effet } from "./Effets";
import iBatiment from "./iBatiment";

export type typeBatiment = {
  nom: string, 
  cout: number, 
  valeur: number, 
  clan: Clan, 
  effet?: Effet
}

class Batiment implements iBatiment{
  private readonly nom: string;
  private readonly cout: number;
  private readonly valeur: number;
  private readonly clan: Clan;
  private readonly effet: Effet | null;

  public constructor(batiment : typeBatiment) {
    this.checkFields(batiment);

    this.nom = batiment.nom;
    this.cout = batiment.cout;
    this.valeur = batiment.valeur;
    this.clan = batiment.clan;
    this.effet = batiment.effet ?? null;
  }

  public getNom(): string {
    return this.nom;
  }
  public getCout(): number {
    return this.cout;
  }
  public getValeur(): number {
    return this.valeur;
  }
  public getClan(): Clan {
    return this.clan;
  }
  public getEffet(): Effet | null {
    return this.effet;
  }

  private checkFields(batiment: typeBatiment): void {

    if (typeof batiment.nom !== 'string') {
      throw new Error(ERREURS.ERREUR_BAT_ATTRIBUT("batiment.nom", batiment.nom));
    }

    if (typeof batiment.cout !== 'number' || batiment.cout <= 0) {
      throw new Error(ERREURS.ERREUR_BAT_ATTRIBUT("batiment.cout", batiment.cout));
    }

    if (typeof batiment.valeur !== 'number' || batiment.valeur <= 0) {
      throw new Error(ERREURS.ERREUR_BAT_ATTRIBUT("batiment.valeur", batiment.valeur));
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
      throw new Error(ERREURS.ERREUR_BAT_ATTRIBUT("batiment.clan", batiment.clan));
    }

    if (
      typeof batiment.effet !== 'undefined' && 
      (
        typeof batiment.effet !== typeof Effets ||
        batiment.clan !== Clan.MERVEILLE
      )
    ) {
      throw new Error(ERREURS.ERREUR_BAT_ATTRIBUT("batiment.effet", batiment.effet));
    }
  }
}

export default Batiment;