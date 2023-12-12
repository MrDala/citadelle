import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "./iPersonnage";

class PersonnagePossede {
  private carte: iPersonnage;
  private joueur: iJoueur;

  constructor(carte: iPersonnage, joueur: iJoueur) {
    this.carte = carte;
    this.joueur = joueur;
  }

  public getCarte() {
    return this.carte;
  }
  public getJoueur() {
    return this.joueur;
  }
}

export default PersonnagePossede;