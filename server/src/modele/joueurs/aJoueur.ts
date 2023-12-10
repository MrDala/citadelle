import { UUID, randomUUID } from "crypto";
import Batiment from "../batiments/Batiment";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import iJoueur from "./iJoueur";
import iBatiment from "../batiments/iBatiments";

abstract class aJoueur implements iJoueur {
  private readonly id: UUID;
  private readonly pseudo: string;
  private couronne: boolean;
  private personnages: CustomArray<iPersonnage>;
  private batimentsEnMain: CustomArray<iBatiment>;
  private batimentsPoses: CustomArray<iBatiment>;
  private argent: number;

  constructor(pseudo: string) {
    this.id = randomUUID()    ;
    this.pseudo = pseudo;
    this.couronne = false;
    this.personnages = new CustomArray<iPersonnage>();
    this.batimentsEnMain = new CustomArray<iBatiment>();
    this.batimentsPoses = new CustomArray<iBatiment>();
    this.argent = 0;
  }
  
  /* Fonction à implémenter dans les classes enfants */
  abstract choixCarteBatiment(cartes: Array<iBatiment>, nbBatimentsGardes: number): Array<iBatiment>;
  abstract construireBatiment(): iBatiment | null;
  abstract choix<T>(liste: Array<T>, nbChoixMax?: number): Array<T>;

  /* Getter */
  getId(): UUID {
    return this.id;
  }
  getPseudo(): string {
    return this.pseudo;
  }
  getCouronne(): boolean {
    return this.couronne;
  }
  getPersonnages(): CustomArray<iPersonnage> {
    return this.personnages;
  }
  getBatimentsEnMain(): CustomArray<iBatiment> {
    return this.batimentsEnMain;
  }
  getBatimentsPoses(): CustomArray<iBatiment> {
    return this.batimentsPoses;
  }
  getArgent(): number {
    return this.argent;
  }

  /* Setter */
  setCouronne(bool: boolean): void {
    this.couronne = bool ;
  }

  /* Interractions */
  addBatimentsEnMain(batiments: iBatiment | CustomArray<iBatiment>): void {
    if (batiments instanceof CustomArray) {
      this.batimentsEnMain.push(...batiments);
    } else {
      this.batimentsEnMain.push(batiments);
    }
  }

  variationArgent(montant: number) {
    this.argent += montant;
  }

  prendrePersonnages(personnages: iPersonnage | CustomArray<iPersonnage>): void {
    if (personnages instanceof CustomArray) {
      this.personnages.push(...personnages);
    } else {
      this.personnages.push(personnages);
    }
  }

  rendrePersonnages(): Array<iPersonnage> {
    var personnagesRendus = new Array<iPersonnage>();
    this.personnages.transferAll(personnagesRendus);

    return personnagesRendus;
  }
}

export default aJoueur;