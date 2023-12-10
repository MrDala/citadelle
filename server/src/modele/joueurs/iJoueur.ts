import { UUID } from "crypto";
import iPersonnage from "../personnages/iPersonnage";
import iBatiment from "../batiments/iBatiments";
import CustomArray from "../tools/CustomArray";

interface iJoueur {
  // Getter
  getId(): UUID;
  getPseudo(): string;
  getCouronne(): boolean;
  getPersonnages(): Array<iPersonnage>;
  getBatimentsEnMain(): CustomArray<iBatiment>;
  getBatimentsPoses(): CustomArray<iBatiment>;
  getArgent(): number;

  // Setter
  setCouronne(bool: Boolean): void;
  addBatimentsEnMain(batiments: iBatiment | Array<iBatiment>): void;
  variationArgent(montant: number): void;

  choix<T>(liste: Array<T>, nbChoixMax?: number): Array<T>;
  prendrePersonnages(personnages: iPersonnage |Array<iPersonnage>): void
  rendrePersonnages(): Array<iPersonnage>;
  choixCarteBatiment(cartes: Array<iBatiment>, nbBatimentsGardes: number): Array<iBatiment>
  construireBatiment(): iBatiment | null;
}

export default iJoueur;