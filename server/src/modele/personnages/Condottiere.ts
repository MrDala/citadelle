import Batiment from "../batiments/Batiment";
import iBatiment from "../batiments/iBatiment";
import Clan from "../enum/Clan";
import Personnages from "../enum/Personnages";
import TypeChoix from "../enum/TypeChoix";
import iJoueur from "../joueurs/iJoueur";
import Eveque from "./Eveque";
import PersonnagePossede from "./PersonnagePossede";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Condottiere extends aPersonnage {
  public constructor() {
    super("Condottiere", Clan.MILITAIRE, 8)
  }

  public action(
    joueur: iJoueur,
    joueurs: Array<iJoueur>,
    personnagesPossedes: Array<PersonnagePossede>,
    personnagesAttaquables: ReadonlyArray<iPersonnage>,
    piocheBatiment: Array<iBatiment>
  ): void {
    this.getEventBus().emit("DEBUT_EFFET_PERSONNAGE", { personnage: Personnages.CONDOTTIERE })

    // Liste des joueurs attaquables (sauf le joueur avec le personnage Évêque ou cité terminée)
    const joueursAttaquables = joueurs
      .map(j => {
        const persoPossede = personnagesPossedes.find(persoPossede => persoPossede.getJoueur() === joueur);
        const jPersonnage = persoPossede ? persoPossede.getCarte() : null;

        if ((j && jPersonnage instanceof Eveque && jPersonnage.getVivant()) || j.getBatimentsPoses().length < 8)
          return j;
        else
          return null;
      })
      .filter((joueur) => joueur !== null);

    if (!joueursAttaquables) return;

    // Liste des bâtiments attaquables (condition : joueur.argent >= batiment.cout - 1)
    let batimentsAttaquables = joueursAttaquables.flatMap(j  => j!.getBatimentsPoses().filter(b => joueur.getArgent() >= b.getCout() - 1)) as Array<Batiment>;

    // Choix du batiment attaqué
    const batimentChoisi = batimentsAttaquables.length > 0 ? joueur.choix(TypeChoix.CIBLE_CONDOTTIERE, batimentsAttaquables)[0] : null;

    if (batimentChoisi) {
      let joueurAttaque = joueursAttaquables.find(j => j!.getBatimentsPoses().includes(batimentChoisi!))!;

      joueurAttaque.setBatimentsPoses(joueurAttaque.getBatimentsEnMain().filter(batiment => batiment !== batimentChoisi));
      piocheBatiment.push(batimentChoisi); // Ajout du batiment dans la main du joueur

      joueur.variationArgent(-batimentChoisi.getCout()); // Paie du cout de la destruction
    }
  }


}

export default Condottiere;
