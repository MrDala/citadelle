import Clan from "../enum/Clan";
import ERREURS from "../enum/Erreurs";
import Roi from "../personnages/Roi";
import iBatiment from "../batiments/iBatiments";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";
import iRegles, { CartesEcartees, DebutTour, Init } from "./iRegles";
import PilePersonnage from "../personnages/PilePersonnage";

abstract class aRegles implements iRegles {
  private init: Init;
  private cartesEcartees: CartesEcartees;
  private debutTour: DebutTour;

  protected constructor({
    init = {
      argent: 2,
      batimentsMain: 4
    },

    cartesEcartees = {
      masqueesAvantDistribution: 0,
      masqueesApresDistribution: 0,
      visibles: 0
    },

    debutTour = {
      argent: 2,
      argentParBatiment: 1,
      nbBatimentsPioches: 2,
      nbBatimentGardes: 1
    },
  }) {
    this.init = init;
    this.cartesEcartees = cartesEcartees;
    this.debutTour = debutTour;
  }

  getInit(): Init {
    return this.init;
  }

  getCartesEcartees(): CartesEcartees {
    return this.cartesEcartees;
  }

  getDebutTour(): DebutTour {
    return this.debutTour;
  }

  public distribution(indexPremierJoueur: number, joueurs: Array<iJoueur>, personnages: PilePersonnage) {
    let cartesJouables = personnages.getCartesChoisissables();

    // Retrait des cartes VISIBLES
    for (let i = 0; i < this.cartesEcartees.visibles; i++) {
      let carte: iPersonnage | null = null;

      while (!carte || carte instanceof Roi) {
        try {
          carte = cartesJouables[Math.floor(Math.random() * cartesJouables.length)];
          if (carte !instanceof Roi) { // Remise dans la pile si le ROI est la carte masquée 
            personnages.setCarteVisible(carte);
          }
        } catch (error) {
          throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
        }
      }
    }

    cartesJouables = personnages.getCartesChoisissables();

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.cartesEcartees.masqueesAvantDistribution; i++) {
      if (cartesJouables.length > 0) {
        personnages.setCarteMasquee(cartesJouables[i]);
      } else {
        throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
      }
    }

    // Choix des personnages
    for (let i = 0; i < joueurs.length; i++) {
      // Création d'une liste des personnages non attribués
      cartesJouables = personnages.getCartesChoisissables();

      // Récupération du joueur devant choisir
      const currentIndex = (indexPremierJoueur + i) % joueurs.length;
      const joueur = joueurs[currentIndex];

      // Choix du personnage
      const personnageChoisi = joueur.choix(cartesJouables)[0];
      personnageChoisi.setJoueur(joueur);
    }

    cartesJouables = personnages.getCartesChoisissables();

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.cartesEcartees.masqueesApresDistribution; i++) {
      if (cartesJouables.length > 0) {
        personnages.setCarteMasquee(cartesJouables[i]);
      } else {
        throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
      }
    }

    cartesJouables = personnages.getCartesChoisissables();

    // Contrôle de la bonne distribution
    if (cartesJouables.length !== 0) {
      throw new Error(ERREURS.ERREUR_DISTRIBUTION());
    }
  }

  public isPartieTerminee(joueurs: Array<iJoueur>): boolean {
    return joueurs.some(joueur => joueur.getBatimentsPoses().length >= 8);
  }

  calculScore(joueur: iJoueur, premierHuitBatiments: iJoueur): number {
    let score = 0;
  
    joueur.getBatimentsPoses().forEach((batiment: iBatiment) => {
      score += batiment.getValeur();
    });
  
    const clansPossedes = new Set(joueur.getBatimentsPoses().map((batiment: iBatiment) => batiment.getClan()));
    const clansRequis: Array<Clan> = [Clan.NOBLE, Clan.COMMERCANT, Clan.RELIGIEUX, Clan.MILITAIRE, Clan.MERVEILLE];
  
    if (clansRequis.every(clan => clansPossedes.has(clan))) {
      score += 3;
    }
  
    if (joueur === premierHuitBatiments) {
      score += 4;
    } else if (joueur.getBatimentsPoses().length >= 8) {
      score += 2;
    }
  
    return score;
  }
  
}

export default aRegles;