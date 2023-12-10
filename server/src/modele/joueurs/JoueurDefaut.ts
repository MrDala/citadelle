import Batiment from "../batiments/Batiment";
import ChoixAction from "../enum/ChoixAction";
import ERREURS from "../enum/Erreurs";
import CustomArray from "../tools/CustomArray";
import aJoueur from "./aJoueur";

class JoueurDefaut extends aJoueur {

  choix<T>(liste: Array<T>, nbChoixMax: number = 1): Array<T> {
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

  choixCarteBatiment(cartes: Array<Batiment>, nbBatimentsGardes = 1): Array<Batiment> {
    if (cartes.length === 0) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }

    for (let i = 0; (i < nbBatimentsGardes) && (cartes.length !== 0); i++) {
      const randomIndex = Math.floor(Math.random() * cartes.length);

      const carteChoisie = cartes.splice(randomIndex, 1)[0];
      this.batimentsEnMain.push(carteChoisie);
    }

    return cartes;
  }

  construireBatiment(): Batiment | null {
    const batimentsConstructibles = new Array<Batiment>;

    this.batimentsEnMain.forEach(batiment => {
      if (this.argent >= batiment.cout) {
        batimentsConstructibles.push(batiment);
      }
    })

    let batimentChoisi = null;
    if (batimentsConstructibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * batimentsConstructibles.length);
      batimentChoisi = batimentsConstructibles.splice(randomIndex, 1)[0];

      this.batimentsEnMain.transfer(this.batimentsPoses, batimentChoisi);

      this.argent -= batimentChoisi.cout;
    }

    return batimentChoisi;
  }

}

export default JoueurDefaut;