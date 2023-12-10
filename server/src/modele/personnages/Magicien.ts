import { UUID } from "crypto";
import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import ERREURS from "../enum/Erreurs";
import ChoixMagicien from "../enum/ChoixMagicien";

class Magicien extends aPersonnage {
  public constructor() {
    super("Magicien", Clan.NEUTRE, 3)
  }

  public action(joueur: iJoueur, joueurs: Array<iJoueur>, piocheBatiment: Array<Batiment>) {
    const actionsPossibles = Object.values(ChoixMagicien);
    const actionChoisie = piocheBatiment.length !== 0 && joueur.batimentsEnMain.length !== 0 ? joueur.choix(actionsPossibles)[0] : ChoixMagicien.VOL_JOUEUR;

    switch (actionChoisie) {
      case ChoixMagicien.ECHANGE_PIOCHE:
        this.echangeAvecPioche(joueur, piocheBatiment);
        break;

      case ChoixMagicien.VOL_JOUEUR:
        this.echangeAvecJoueur(joueur, joueurs);
        break;
    }
  }

  private echangeAvecPioche(joueur: iJoueur, piocheBatiment: Array<Batiment>) {
    const nbChoixMax = piocheBatiment.length < joueur.batimentsEnMain.length ? piocheBatiment.length : joueur.batimentsEnMain.length;
    const batimentChoisi = joueur.choix(joueur.batimentsEnMain, nbChoixMax);
    joueur.batimentsEnMain.transfer(piocheBatiment, batimentChoisi);
  }

  private echangeAvecJoueur (joueur: iJoueur, joueurs: Array<iJoueur>) {
    // Détermination des joueurs attaquables
    let joueursAttaquables = new CustomArray<{id: UUID, pseudo: String, nbBatimentsEnMain: Number}>

    joueurs.forEach(j => {
      if(j !== joueur) {
        joueursAttaquables.push({
          id: j.id,
          pseudo: j.pseudo,
          nbBatimentsEnMain: j.batimentsEnMain.length,
        })
      }
    })

    // Choix du joueur attaqué
    const choix = joueur.choix(joueursAttaquables)[0];
    const joueurChoisi = joueurs.find(j => j.id === choix.id);
    if (!joueurChoisi) {
      throw new Error(ERREURS.ERREUR_CHOIX())
    }

    // Echange des cartes
    const tempBatimentsEnMain = joueur.batimentsEnMain;
    joueur.batimentsEnMain = joueurChoisi.batimentsEnMain
    joueurChoisi.batimentsEnMain = tempBatimentsEnMain;
  }
}

export default Magicien;
