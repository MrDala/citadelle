export type Effet = {
  description : string,
  function : Function
}

export const Effets : Record<string, Effet> = {
  "COUR_MIRACLE": {
    description: "Pour le décompte final des points, la cour des miracles est considérée comme un quartier de la couleur de votre choix. Vous ne pouvez pas utiliser cette capacité si vous avez construit la cour des miracles au dernier tour de jeu.",
    function: () => {}
  },
  "DONJON": {
    description: "Le Donjon ne peut pas être détruit par le Condottière.",
    function: () => {}
  },
  "LABORATOIRE": {
    description: "Une fois par tour, vous pouvez vous défausser d'une carte quartier de votre main et recevoir deux pièces d'or en contrepartie.",
    function: () => {}
  },
  "FORGE": {
    description: "Une fois par tour, vous pouvez payer deux pièces d'or pour piocher trois cartes.",
    function: () => {}
  },
  "OBSERVATOIRE": {
    description: "Si vous choisissez de piocher des cartes au début de votre tour, vous en piochez trois, en choisissez une et défaussez les deux autres.",
    function: () => {}
  },
  "CIMETIERE": {
    description: "Lorsque le Condottière détruit un quartier, vous pouvez payer une pièce d'or pour le reprendre dans votre main. Vous ne pouvez pas faire cela si vous êtes vous-même Condottiere.",
    function: () => {}
  },
  "BIBLIOTHEQUE": {
    description: "Si vous choisissez de piocher des cartes au début de votre tour, vous en piochez deux et les conservez toutes les deux.",
    function: () => {}
  },
  "ECOLE_MAGIE": {
    description: "Pour la perception des revenus, l'école de magie est considérée comme un quartier de la couleur de votre choix, elle vous rapporte donc si vous êtes Roi, Evêque, Marchand ou Condottiere.",
    function: () => {}
  },
  "UNIVERSITE": {
    description: "Cette réalisation de prestige (nul n'a jamais compris à quoi pouvait bien servir une université) coûte six pièces d'or à bâtir mais vaut huit points dans le décompte de fin de partie.",
    function: () => {}
  },
  "DRACOPORT": {
    description: "Cette réalisation de prestige (on n'a pas vu de dragon dans le Royaume depuis bientôt mille ans) coûte six pièces d'or à bâtir mais vaut huit points dans le décompte de fin de partie.",
    function: () => {}
  }
} as const;