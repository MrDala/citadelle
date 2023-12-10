import Batiment from "../batiments/Batiment";
import iBatiment from "../batiments/iBatiments";
import ERREURS from "../enum/Erreurs";
import aJoueur from "./aJoueur";

class JoueurDefaut extends aJoueur {

  public choix<T>(liste: Array<T>, nbChoixMax: number = 1): Array<T> {
    if (nbChoixMax <= 0 || nbChoixMax > liste.length) {
      throw new Error(ERREURS.ERREUR_CHOIX(liste));
    }

    const result: Array<T> = [];

    const nbChoix = Math.floor(Math.random() * nbChoixMax) + 1;

    while (result.length < nbChoix) {
      const indiceAleatoire = Math.floor(Math.random() * liste.length);
      result.push(liste.splice(indiceAleatoire, 1)[0]);
    }

    return result;
  }

  public choixCarteBatiment(cartes: Array<iBatiment>, nbBatimentsGardes = 1): Array<iBatiment> {
    if (cartes.length === 0) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    for (let i = 0; (i < nbBatimentsGardes) && (cartes.length !== 0); i++) {
      const randomIndex = Math.floor(Math.random() * cartes.length);

      const carteChoisie = cartes.splice(randomIndex, 1)[0];
      this.addBatimentsEnMain(carteChoisie);
    }

    return cartes;
  }

  public construireBatiment(): iBatiment | null {
    const batimentsConstructibles = new Array<iBatiment>;

    this.getBatimentsEnMain().forEach(batiment => {
      if (this.getArgent() >= batiment.getCout()) {
        batimentsConstructibles.push(batiment);
      }
    })

    let batimentChoisi = null;
    if (batimentsConstructibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * batimentsConstructibles.length);
      batimentChoisi = batimentsConstructibles.splice(randomIndex, 1)[0];

      this.getBatimentsEnMain().transfer(this.getBatimentsPoses(), batimentChoisi);

      this.variationArgent(-batimentChoisi.getCout());
    }

    return batimentChoisi;
  }

}

export default JoueurDefaut;