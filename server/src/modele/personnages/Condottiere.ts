import Batiment from "../batiments/Batiment";
import Clan from "../enum/Clan";
import iJoueur from "../joueurs/iJoueur";
import CustomArray from "../tools/CustomArray";
import Eveque from "./Eveque";
import aPersonnage from "./aPersonnage";
import iPersonnage from "./iPersonnage";

class Condottiere extends aPersonnage {
  public constructor() {
    super("Condottiere", Clan.MILITAIRE, 8)
  }

  public action(joueur: iJoueur, joueurs: CustomArray<iJoueur>, piocheBatiment: CustomArray<Batiment>) {
    // Liste des joueurs attaquables (sauf le joueur avec le personnage Évêque)
    let joueursAttaquables = joueurs.filter(j => !j.personnages.some(p => p instanceof Eveque));
  
    // Liste des bâtiments attaquables (condition : joueur.argent >= batiment.cout - 1)
    let batimentsAttaquables : CustomArray<Batiment> = joueursAttaquables.flatMap(j => j.batimentsPoses.filter(b => joueur.argent >= b.cout - 1)) as CustomArray<Batiment>;
    
    let batimentChoisi : Batiment | null = null;

    if (batimentsAttaquables.length > 0){
      batimentChoisi = joueur.choixCarte(batimentsAttaquables);
    }
  
    if (batimentChoisi) {
      let joueurAttaque = joueursAttaquables.find(j => j.batimentsPoses.includes(batimentChoisi!));
      joueurAttaque?.batimentsPoses.transfer(piocheBatiment, batimentChoisi);
      
      joueur.argent -= batimentChoisi.cout;
    }
  }
  

}

export default Condottiere;
