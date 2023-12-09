import Batiment from "../batiments/Batiment";
import ChoixAction from "../enum/ChoixAction";
import ERREURS from "../enum/Erreurs";
import CustomArray from "../tools/CustomArray";
import aJoueur from "./aJoueur";

class JoueurDefaut extends aJoueur{
  choixArgentPioche(): ChoixAction {
    const random = Math.floor(Math.random() * 2);

    // Retourner le choix en fonction du nombre aléatoire
    return random === 0 ? ChoixAction.PIOCHE : ChoixAction.ARGENT;  
  };

  choixCarteBatiment(cartes: CustomArray<Batiment>, nbBatimentsGardes= 1): CustomArray<Batiment> {
    if (cartes.length === 0) {
      throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
    }
  
    for(let i=0; (i < nbBatimentsGardes) && (cartes.length !== 0); i++) {
      const randomIndex = Math.floor(Math.random() * cartes.length);
  
      const carteChoisie = cartes.splice(randomIndex, 1)[0];
      this.batimentsEnMain.push(carteChoisie);
    }
  
    return cartes;
  }

  construireBatiment(): Batiment | null {
    const batimentsConstructibles = new CustomArray<Batiment>;

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