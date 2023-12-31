import iBatiment from "../batiments/iBatiment";
import ERREURS from "../enum/Erreurs";
import TypeChoix from "../enum/TypeChoix";
import aJoueur from "./aJoueur";

class JoueurDefaut extends aJoueur {

  public choix<T>(typeChoix: TypeChoix, liste: Array<T>, nbChoixMax: number = 1): Array<T> {
    this.getEventBus().emit("DEBUT_CHOIX", {TypeChoix: typeChoix});

    if (nbChoixMax <= 0 || nbChoixMax > liste.length) {
      throw new Error(ERREURS.ERREUR_CHOIX(liste));
    }
    const result: Array<T> = [];
    const nbChoix = Math.floor(Math.random() * nbChoixMax) + 1;

    while (result.length < nbChoix) {
      const indiceAleatoire = Math.floor(Math.random() * liste.length);
      result.push(liste.splice(indiceAleatoire, 1)[0]);
    }

    this.getEventBus().emit("FIN_CHOIX", {choix: result});
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

    this.getEventBus().emit("FIN_CHOIX", {choix: cartes});
    return cartes;
  }
}

export default JoueurDefaut;