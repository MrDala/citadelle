import iJoueur from "../joueurs/iJoueur";
import PersonnagePossede from "./PersonnagePossede";
import iPersonnage from "./iPersonnage";

class PilePersonnage {
  private cartesJouables: Array<iPersonnage>;
  private cartesChoisies: Array<PersonnagePossede>;
  private cartesVisibles: Array<iPersonnage>;
  private cartesMasquees: Array<iPersonnage>;

  constructor(cartes: Array<iPersonnage>) {
    this.cartesJouables = cartes;
    this.cartesChoisies = new Array();
    this.cartesVisibles = new Array();
    this.cartesMasquees = new Array();
  }

  // Getter
  public getCartesTous(): ReadonlyArray<iPersonnage> {
    const personnagesChoisis = this.cartesChoisies.map(carteChoisie => carteChoisie.getCarte())
    return [...this.cartesJouables, ...this.cartesVisibles, ...this.cartesMasquees, ...personnagesChoisis];
  }
  public getCartesChoisissables(): Array<iPersonnage> {
    return this.cartesJouables;
  }
  public getCartesChoisies(): Array<PersonnagePossede> {
    return this.cartesChoisies;
  }
  public getCartesVisibles(): Array<iPersonnage> {
    return this.cartesVisibles;
  }
  public getCartesMasquees(): Array<iPersonnage> {
    return this.cartesMasquees;
  }


  // Interraction
  public setCarteVisible(carte: iPersonnage): void {
    this.transfertCarte(carte, this.cartesJouables, this.cartesVisibles);
  }
  public setCarteMasquee(carte: iPersonnage): void {
    this.transfertCarte(carte, this.cartesJouables, this.cartesMasquees);
  }
  public setCarteJouable(carte: iPersonnage): void {
    this.transfertCarte(carte, this.cartesMasquees, this.cartesJouables);
  }

  public choisirPersonnage(carte: iPersonnage, joueur: iJoueur) {
    this.cartesChoisies.push(new PersonnagePossede(carte, joueur));
    this.cartesJouables = this.cartesJouables.filter(c => c !== carte);
  }

  public reinitialiserCartesJouables(): void {
    // Récupération des cartes jouées
    const cartesJouees = this.cartesChoisies.map((e) => e.getCarte());
  
    // Ajout des cartes
    this.cartesJouables = [...this.cartesMasquees, ...this.cartesVisibles, ...cartesJouees];
    
    // Réinitialisation des autres piles
    this.cartesChoisies.length = 0;
    this.cartesVisibles.length = 0;
    this.cartesMasquees.length = 0;
  }
  
  // Private
  private transfertCarte(carte: iPersonnage, pileOrigine: Array<iPersonnage>, pileDestination: Array<iPersonnage>) {
    // Transfert d'une carte personne d'une pile vers une autre
    const indexCarte = pileOrigine.indexOf(carte);
    if (indexCarte !== -1) {
      const carteChoisie = pileOrigine.splice(indexCarte, 1)[0]; // Retire la carte de la pile d'origine
      pileDestination.push(carteChoisie); // Ajoute la carte à la pile de destination
    }
  }

}

export default PilePersonnage;