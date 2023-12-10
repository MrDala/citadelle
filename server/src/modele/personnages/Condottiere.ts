import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import Eveque from "./Eveque";
import aPersonnage from "./aPersonnage";

class Condottiere extends aPersonnage {
  public constructor() {
    super("Condottiere", Clan.MILITAIRE, 8)
  }

  public action(
    joueur: iJoueur, 
    joueurs: CustomArray<iJoueur>, 
    piocheBatiment: CustomArray<Batiment>
  ) {
    // Liste des joueurs attaquables (sauf le joueur avec le personnage Évêque)
    let joueursAttaquables = joueurs.filter(j => !j.getPersonnages().some(p => p instanceof Eveque) && j.getBatimentsPoses().length < 8);
  
    // Liste des bâtiments attaquables (condition : joueur.argent >= batiment.cout - 1)
    let batimentsAttaquables = joueursAttaquables.flatMap(j => j.getBatimentsPoses().filter(b => joueur.getArgent() >= b.getCout() - 1)) as CustomArray<Batiment>;
    
    let batimentChoisi : Batiment | null = null;

    if (batimentsAttaquables.length > 0){
      batimentChoisi = joueur.choix(batimentsAttaquables)[0];
    }
  
    if (batimentChoisi) {
      let joueurAttaque = joueursAttaquables.find(j => j.getBatimentsPoses().includes(batimentChoisi!));
      joueurAttaque?.getBatimentsPoses().transfer(piocheBatiment, batimentChoisi);
      
      joueur.variationArgent(-batimentChoisi.getCout());
    }
  }
  

}

export default Condottiere;
