enum Erreurs {
  // Nombre de joueurs
  ERREUR_NOMBRE_JOUEURS = "[ERREUR]: Aucune règle prévue pour ce nombre de joueur.",
  ERREUR_TROP_JOUEURS = "[ERREUR]: Trop de joueurs dans la partie.",
  ERREUR_MANQUE_JOUEURS = "[ERREUR]: Pas assez de joueurs dans la partie.",

  // Batiment
  ERREUR_BAT_ATTRIBUT= "[ERREUR]: Attribut incorrect",

  // Distribution des cartes
  ERREUR_CARTE_MANQUANTE = "[ERREUR]: Pioche/distribution impossible.",
  ERREUR_DISTRIBUTION = "[ERREUR]: Le nombre de carte distribuées ne correspond pas au nombre de joueurs.",

  // Gameplay
  ERREUR_COURRONNE = "[ERREUR]: Impossible de trouver un joueur avec une couronne."
}

export default Erreurs;