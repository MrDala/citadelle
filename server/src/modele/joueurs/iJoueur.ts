import { UUID } from "crypto";
import iPersonnage from "../personnages/iPersonnage";
import iBatiment from "../batiments/iBatiments";

interface iJoueur {
  // Getter
  getId(): UUID;
  getPseudo(): string;
  getCouronne(): boolean;
  getBatimentsEnMain(): Array<iBatiment>;
  getBatimentsPoses(): Array<iBatiment>;
  getArgent(): number;

  // Setter
  setCouronne(bool: Boolean): void;
  setBatimentsEnMain(batiments: Array<iBatiment>): void;
  setBatimentsPoses(batiments: Array<iBatiment>): void;
  addBatimentsEnMain(batiments: iBatiment | Array<iBatiment>): void;
  variationArgent(montant: number): void;

  choix<T>(liste: ReadonlyArray<T>, nbChoixMax?: number): Array<T>;
  choixCarteBatiment(cartes: Array<iBatiment>, nbBatimentsGardes: number): Array<iBatiment>
  construireBatiment(): iBatiment | null;
}

export default iJoueur;