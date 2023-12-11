import iBatiment from "../batiments/iBatiments";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "./iPersonnage";

abstract class aPersonnage implements iPersonnage {
  private readonly nom: string;
  private readonly clan: Clan;
  private readonly ordre: number;
  private vivant: boolean;
  private joueur: iJoueur | null;

  protected constructor(nom: string, clan: Clan, ordre: number) {
    this.nom = nom;
    this.clan = clan;
    this.ordre = ordre;
    this.vivant = true;
    this.joueur = null;
  }
  
  abstract action(personnages: Array<iPersonnage>, piocheBatiment: Array<iBatiment>): void;

  // getter
  public getNom(): string {
    return this.nom;
  }
  public getClan(): Clan {
    return this.clan;
  }
  public getOrdre(): number {
    return this.ordre;
  }
  public getVivant(): boolean {
    return this.vivant;
  }
  public getJoueur(): iJoueur | null {
    return this.joueur;
  }

  // setter
  public setVivant(vivant: boolean): void {
    this.vivant = vivant;
  }
  public setJoueur(joueur : iJoueur | null): void {
    this.joueur = joueur;
  }
}

export default aPersonnage;