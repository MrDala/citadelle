import iBatiment from "../batiments/iBatiment";
import TypeChoix from "../enum/TypeChoix";
import iJoueur from "../joueurs/iJoueur";
import iPersonnage from "../personnages/iPersonnage";

type Evenements =
  // Logique basique d'une partie
  {
    type: "DEBUT_PARTIE";
  }
  | {
    type: "FIN_PARTIE";
    score: {
      pseudo: string;
      score: number
    }[]
  }
  | {
    type: "DEBUT_INITIALISATION";
  }
  | {
    type: "FIN_INITIALISATION";
  }
  | {
    type: "DEBUT_TOUR";
    nbTour: number
  }
  | {
    type: "FIN_TOUR"
  }
  // Logique des différentes phases de la partie
  | {
    type: "DEBUT_PHASE_DISTRIBUTION";
  }
  | {
    type: "FIN_PHASE_DISTRIBUTION";
  }
  | {
    type: "DEBUT_PHASE_ACTION";
  }
  | {
    type: "FIN_PHASE_ACTION";
  }
  // Logique de distribution des personnages
  | {
    type: "RETRAIT_CARTES_VISIBLES";
    choix: iPersonnage[];
  }
  | {
    type: "RETRAIT_CARTES_MASQUEES";
    choix: iPersonnage[];
  }
  // Pioche
  | {
    type: "RETRAIT_CARTES_VISIBLES";
    choix: iPersonnage[];
  }
  // Logique d'action des personnages
  | {
    type: "DEBUT_EFFET_PERSONNAGE";
    personnage: iPersonnage;
  }
  | {
    type: "FIN_EFFET_PERSONNAGE";
  }
  // Divers
  | {
    type: "DEBUT_CHOIX";
    choix: TypeChoix;
  }
  | {
    type: "FIN_CHOIX";
    choix: iPersonnage[] | iBatiment[] | iJoueur[];
  }

export default Evenements;