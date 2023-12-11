import { UUID, randomUUID } from "crypto";
import iPersonnage from "../personnages/iPersonnage";
import iJoueur from "./iJoueur";
import iBatiment from "../batiments/iBatiments";

abstract class aJoueur implements iJoueur {
  private readonly id: UUID;
  private readonly pseudo: string;
  private couronne: boolean;
  private personnages: Array<iPersonnage>;
  private batimentsEnMain: Array<iBatiment>;
  private batimentsPoses: Array<iBatiment>;
  private argent: number;

  constructor(pseudo: string) {
    this.id = randomUUID()    ;
    this.pseudo = pseudo;
    this.couronne = false;
    this.personnages = new Array<iPersonnage>();
    this.batimentsEnMain = new Array<iBatiment>();
    this.batimentsPoses = new Array<iBatiment>();
    this.argent = 0;
  }
  
  /* Fonction à implémenter dans les classes enfants */
  abstract choixCarteBatiment(cartes: Array<iBatiment>, nbBatimentsGardes: number): Array<iBatiment>;
  abstract construireBatiment(): iBatiment | null;
  abstract choix<T>(liste: Array<T>, nbChoixMax?: number): Array<T>;

  /* Getter */
  public getId(): UUID {
    return this.id;
  }
  public getPseudo(): string {
    return this.pseudo;
  }
  public getCouronne(): boolean {
    return this.couronne;
  }
  public getBatimentsEnMain(): Array<iBatiment> {
    return this.batimentsEnMain;
  }
  public getBatimentsPoses(): Array<iBatiment> {
    return this.batimentsPoses;
  }
  public getArgent(): number {
    return this.argent;
  }

  /* Setter */
  public setCouronne(bool: boolean): void {
    this.couronne = bool ;
  }
  public setBatimentsEnMain(batiments: Array<iBatiment>): void {
    this.batimentsEnMain = batiments;
  }
  public setBatimentsPoses(batiments: Array<iBatiment>): void {
    this.batimentsPoses = batiments;
  }

  /* Interractions */
  public addBatimentsEnMain(batiments: iBatiment | Array<iBatiment>): void {
    if (batiments instanceof Array) {
      this.batimentsEnMain.push(...batiments);
    } else {
      this.batimentsEnMain.push(batiments);
    }
  }

  public variationArgent(montant: number) {
    this.argent += montant;
  }
}

export default aJoueur;