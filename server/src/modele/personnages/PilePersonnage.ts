import iPersonnage from "./iPersonnage";

class PilePersonnage {
  private cartesJouables: Array<iPersonnage>;
  private cartesVisibles: Array<iPersonnage>;
  private cartesMasquees: Array<iPersonnage>;

  constructor(cartesJouees: Array<iPersonnage>) {
    this.cartesJouables = cartesJouees;
    this.cartesVisibles = new Array();
    this.cartesMasquees = new Array();
  }

  // Getter
  public getCartesTous(): Array<iPersonnage> {
    return this.cartesJouables.concat(this.cartesVisibles, this.cartesMasquees);
  }
  public getCartesVisibles(): Array<iPersonnage> {
    return this.cartesVisibles;
  }
  public getCartesMasquees(): Array<iPersonnage> {
    return this.cartesMasquees;
  }
  public getCartesChoisissables(): Array<iPersonnage> {
    return this.cartesJouables.filter(carte => !carte.getJoueur())
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

  public reinitialiserCartesJouables(): void {
    // Réinitialisation des joueurs sur les cartes jouables
    this.cartesJouables.forEach((carte) => carte.setJoueur(null));
  
  
    // Création d'une nouvelle instance de tableau avec les cartes visibles et masquées
    this.cartesJouables.concat(this.cartesMasquees.concat(this.cartesVisibles));
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