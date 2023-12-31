import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import aPersonnage from "./aPersonnage";
import ERREURS from "../enum/Erreurs";
import ChoixMagicien from "../enum/ChoixMagicien";
import iBatiment from "../batiments/iBatiment";
import iPersonnage from "./iPersonnage";
import PersonnagePossede from "./PersonnagePossede";
import { UUID } from "crypto";
import TypeChoix from "../enum/TypeChoix";
import Personnages from "../enum/Personnages";

class Magicien extends aPersonnage {
  public constructor() {
    super("Magicien", Clan.NEUTRE, 3)
  }

  public action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>, 
    personnagesAttaquables: ReadonlyArray<iPersonnage>, 
    piocheBatiment: Array<iBatiment>
  ): void {    
    this.getEventBus().emit("DEBUT_EFFET_PERSONNAGE", { personnage: Personnages.MAGICIEN });

    const actionsPossibles = Object.values(ChoixMagicien);
    const actionChoisie = piocheBatiment.length !== 0 && joueur.getBatimentsEnMain().length !== 0 ? joueur.choix(TypeChoix.CIBLE_MAGICIEN, actionsPossibles)[0] : ChoixMagicien.VOL_JOUEUR;
  
    switch (actionChoisie) {
      case ChoixMagicien.ECHANGE_PIOCHE:
        this.echangeAvecPioche(joueur, piocheBatiment);
        break;

      case ChoixMagicien.VOL_JOUEUR:
        this.echangeAvecJoueur(joueur, joueurs);
        break;
    }

    this.getEventBus().emit("FIN_EFFET_PERSONNAGE", {});
  }

  private echangeAvecPioche(joueur: iJoueur, piocheBatiment: Array<iBatiment>) {
    const nbChoixMax = Math.min(piocheBatiment.length, joueur.getBatimentsEnMain().length);
    const batimentsChoisis = joueur.choix(TypeChoix.CIBLE_MAGICIEN, joueur.getBatimentsEnMain(), nbChoixMax);
  
    // Suppression des cartes de la main
    joueur.setBatimentsEnMain(joueur.getBatimentsEnMain().filter(batiment => !batimentsChoisis.includes(batiment)));
  
    // Ajout des cartes choisies dans la pioche
    piocheBatiment.push(...batimentsChoisis);
  }
  

  private echangeAvecJoueur (joueur: iJoueur, joueurs: Array<iJoueur>) {
    // Détermination des joueurs attaquables
    let joueursAttaquables = new Array<{id: UUID, pseudo: String, nbBatimentsEnMain: Number}>

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
    const choix = joueur.choix(TypeChoix.CIBLE_MAGICIEN, joueursAttaquables)[0];
    const joueurChoisi = joueurs.find(j => j.getId() === choix.id);
    if (!joueurChoisi) {
      throw new Error(ERREURS.ERREUR_CHOIX())
    }

    // Echange des cartes
    const tempBatimentsEnMain = joueur.getBatimentsEnMain();
    joueur.setBatimentsEnMain(joueurChoisi.getBatimentsEnMain());
    joueurChoisi.setBatimentsEnMain(tempBatimentsEnMain);
  }
}

export default Magicien;
