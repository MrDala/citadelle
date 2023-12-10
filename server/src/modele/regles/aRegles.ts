import Clan from "../enum/Clan";
import ERREURS from "../enum/Erreurs";
import iJoueur from "../joueurs/iJoueur";
import Roi from "../personnages/Roi";
import iPersonnage from "../personnages/iPersonnage";
import CustomArray from "../tools/CustomArray";
import iRegles from "./iRegles";

abstract class aRegles implements iRegles {
  init: {
    argent: number;
    batimentsMain: number;
  };
  cartesEcartees: {
    masqueesAvantDistribution: number;
    masqueesApresDistribution: number;
    visibles: number;
  };
  debutTour: {
    argent: number;
    argentParBatiment: number,
    nbBatimentsPioches: number;
    nbBatimentGardes: number;
  };

  protected constructor({
    init = { 
      argent: 2, 
      batimentsMain: 4 
    },
    cartesEcartees: {
      masqueesAvantDistribution= 0,
      masqueesApresDistribution= 0,
      visibles= 0
    },
    debutTour = { 
      argent: 2,
      argentParBatiment: 1,
      nbBatimentsPioches: 2, 
      nbBatimentGardes: 1
    },
  }) {
    this.init = init;
    this.cartesEcartees = {
      masqueesAvantDistribution,
      masqueesApresDistribution,
      visibles
    };
    this.debutTour = debutTour;
  }

  public distribution(indexPremierJoueur: number, joueurs: CustomArray<iJoueur>, personnages: CustomArray<iPersonnage>, cartesVisibles: CustomArray<iPersonnage>, cartesMasquees: CustomArray<iPersonnage>) {
    // Retrait des cartes VISIBLES
    for (let i = 0; i < this.cartesEcartees.visibles; i++) {
      let carte: iPersonnage | null = null;
    
      while (!carte || carte instanceof Roi) {
        try {
          carte = personnages.shift()!;
          if (carte instanceof Roi) {   // Remise dans la pile si le ROI est la carte masquée 
            personnages.push(carte);
          } else {                      // Retrait de la carte
            cartesMasquees.push(carte);
          }
        } catch (error) {
          throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
        }
      }
    }

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.cartesEcartees.masqueesAvantDistribution; i++) {
      if (personnages.length > 0) {
        cartesVisibles.push(personnages.shift()!);
      } else {
        throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
      }
    }
    
    // Choix du rôle par les joueurs
    joueurs.customForEach(indexPremierJoueur, joueur => {
      let personnageChoisi = joueur.choixCarte(personnages);
      joueur.personnages.push(personnageChoisi);
    });

    // Retrait des carte MASQUEES
    for (let i = 0; i < this.cartesEcartees.masqueesApresDistribution; i++) {
      if (personnages.length > 0) {
        cartesMasquees.push(personnages.shift()!);
      } else {
        throw new Error(ERREURS.ERREUR_CARTE_MANQUANTE());
      }
    }

    // Contrôle de la bonne distribution
    if (personnages.length !== 0) {
      throw new Error(ERREURS.ERREUR_DISTRIBUTION());
    }
  }

  public isPartieTerminee(joueurs: CustomArray<iJoueur>): boolean {
    return joueurs.some(joueur => joueur.batimentsPoses.length >= 8);
  }

  calculScore(joueur: iJoueur, premierHuitBatiments: iJoueur): number {
      let score = 0;

      joueur.batimentsPoses.forEach(batiment => {
        score += batiment.valeur;
      });

      const clansPossedes = new Set(joueur.batimentsPoses.map(batiment => batiment.clan));
      const clansRequis = [Clan.NOBLE, Clan.COMMERCANT, Clan.RELIGIEUX, Clan.MILITAIRE, Clan.MERVEILLE];
    
      if (clansRequis.every(clan => clansPossedes.has(clan))) {
        score += 3;
      }

      if (joueur === premierHuitBatiments) {
        score += 4;
      } else if (joueur.batimentsPoses.length >= 8) {
        score += 2;
      }

      return score;
  }
}

export default aRegles;