import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import Eveque from "./Eveque";
import aPersonnage from "./aPersonnage";

class Condottiere extends aPersonnage {
  public constructor() {
    super("Condottiere", Clan.MILITAIRE, 8)
  }

  public action(
    joueur: iJoueur, 
    joueurs: Array<iJoueur>, 
    piocheBatiment: Array<Batiment>
  ) {
    // Liste des joueurs attaquables (sauf le joueur avec le personnage Évêque)
    let joueursAttaquables = joueurs.filter(j => !j.getPersonnages().some(p => p instanceof Eveque) && j.getBatimentsPoses().length < 8);
  
    // Liste des bâtiments attaquables (condition : joueur.argent >= batiment.cout - 1)
    let batimentsAttaquables = joueursAttaquables.flatMap(j => j.getBatimentsPoses().filter(b => joueur.getArgent() >= b.getCout() - 1)) as Array<Batiment>;
    
    let batimentChoisi : Batiment | null = null;

    if (batimentsAttaquables.length > 0){
      batimentChoisi = joueur.choix(batimentsAttaquables)[0];
    }
  
    if (batimentChoisi) {
      let joueurAttaque = joueursAttaquables.find(j => j.getBatimentsPoses().includes(batimentChoisi!));
      if (joueurAttaque) {
        joueurAttaque.setBatimentsPoses(joueurAttaque.getBatimentsEnMain().filter(batiment => batiment !== batimentChoisi)); // Suppression de la carte du plateau du joueur
        piocheBatiment.push(batimentChoisi); // Ajout du batiment dans la main du joueur
      }
      
      joueur.variationArgent(-batimentChoisi.getCout());
    }
  }
  

}

export default Condottiere;
