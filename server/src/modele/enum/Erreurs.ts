type Erreur =
  | (() => string)
  | ((...args: any[]) => string);

const ERREURS: Record<string, Erreur> = {
  // Joueurs
  ERREUR_NOMBRE_JOUEURS: () => "[ERREUR]: Aucune règle prévue pour ce nombre de joueur.",
  ERREUR_TROP_JOUEURS: () => "[ERREUR]: Trop de joueurs dans la partie.",
  ERREUR_MANQUE_JOUEURS: () => "[ERREUR]: Pas assez de joueurs dans la partie.",

  // Batiments
  ERREUR_BAT_ATTRIBUT: (attribut: string, attributValue: string) =>
    `[ERREUR]: Attribut incorrect : ${attribut} = ${attributValue}`,
  
  // Distribution
  ERREUR_CARTE_MANQUANTE: () => "[ERREUR]: Pioche/distribution impossible.",
  ERREUR_DISTRIBUTION: () => "[ERREUR]: Le nombre de cartes distribuées ne correspond pas au nombre de joueurs.",

  // Ordre de jeu
  ERREUR_COURRONNE: () => "[ERREUR]: Impossible de trouver un joueur avec une couronne.",

  // Interraction avec le joueur
  ERREUR_CHOIX: (liste: Array<any>) => `[ERREUR]: Impossible de faire un choix dans la liste : ${liste}`
};

export default ERREURS;