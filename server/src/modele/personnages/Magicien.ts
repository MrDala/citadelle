import { UUID } from "crypto";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import aPersonnage from "./aPersonnage";
import ERREURS from "../enum/Erreurs";
import ChoixMagicien from "../enum/ChoixMagicien";
import iBatiment from "../batiments/iBatiments";

class Magicien extends aPersonnage {
  public constructor() {
    super("Magicien", Clan.NEUTRE, 3)
  }

  public action(joueur: iJoueur, joueurs: Array<iJoueur>, piocheBatiment: Array<iBatiment>) {
    const actionsPossibles = Object.values(ChoixMagicien);
    const actionChoisie = piocheBatiment.length !== 0 && joueur.getBatimentsEnMain().length !== 0 ? joueur.choix(actionsPossibles)[0] : ChoixMagicien.VOL_JOUEUR;

    switch (actionChoisie) {
      case ChoixMagicien.ECHANGE_PIOCHE:
        this.echangeAvecPioche(joueur, piocheBatiment);
        break;

      case ChoixMagicien.VOL_JOUEUR:
        this.echangeAvecJoueur(joueur, joueurs);
        break;
    }
  }

  private echangeAvecPioche(joueur: iJoueur, piocheBatiment: Array<iBatiment>) {
    const nbChoixMax = piocheBatiment.length < joueur.getBatimentsEnMain().length ? piocheBatiment.length : joueur.getBatimentsEnMain().length;
    const batimentChoisi = joueur.choix(joueur.getBatimentsEnMain(), nbChoixMax);
    joueur.getBatimentsEnMain().transfer(piocheBatiment, batimentChoisi);
  }

  private echangeAvecJoueur (joueur: iJoueur, joueurs: Array<iJoueur>) {
    // Détermination des joueurs attaquables
    let joueursAttaquables = new CustomArray<{id: UUID, pseudo: String, nbBatimentsEnMain: Number}>

    joueurs.forEach(j => {
      if(j !== joueur) {
        joueursAttaquables.push({
          id: j.getId(),
          pseudo: j.getPseudo(),
          nbBatimentsEnMain: j.getBatimentsEnMain().length,
        })
      }
    })

    // Choix du joueur attaqué
    const choix = joueur.choix(joueursAttaquables)[0];
    const joueurChoisi = joueurs.find(j => j.getId() === choix.id);
    if (!joueurChoisi) {
      throw new Error(ERREURS.ERREUR_CHOIX())
    }

    // Echange des cartes
    const tempBatimentsEnMain = joueur.getBatimentsEnMain();
    joueurChoisi.getBatimentsEnMain().transfer(joueur.getBatimentsEnMain(), joueurChoisi.getBatimentsEnMain());
    tempBatimentsEnMain.transfer(joueurChoisi.getBatimentsEnMain(), tempBatimentsEnMain);
  }
}

export default Magicien;
