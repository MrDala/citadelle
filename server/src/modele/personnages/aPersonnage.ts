import iBatiment from "../batiments/iBatiment";
import Clan from "../enum/Clan";
import EventBus from "../evenements/EventBus";
import iJoueur from "../joueurs/iJoueur";
import PersonnagePossede from "./PersonnagePossede";
import iPersonnage from "./iPersonnage";

abstract class aPersonnage implements iPersonnage {
  private readonly eventBus: EventBus;
  private readonly nom: string;
  private readonly clan: Clan;
  private readonly ordre: number;
  private vivant: boolean;

  protected constructor(nom: string, clan: Clan, ordre: number) {
    this.eventBus = EventBus.getInstance();
    this.nom = nom;
    this.clan = clan;
    this.ordre = ordre;
    this.vivant = true;
  }
  
  abstract action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>,
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void;

  // getter
  protected getEventBus(): EventBus {
    return this.eventBus;
  }
  
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

  // setter
  public setVivant(vivant: boolean): void {
    this.vivant = vivant;
  }
}

export default aPersonnage;