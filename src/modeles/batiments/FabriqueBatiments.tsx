import json from "../data/data.json";
import Clan from "../enum/Clan";
import Batiment, { typeBatiment } from "./Batiment";

class FabriqueBatiments {
  static init() : Array<Batiment> {
    const batiments: Array<Batiment> = new Array<Batiment>();

    json.batiments.forEach((batiment) => {
      const bat: typeBatiment = {
        nom: batiment.nom, 
        cout: batiment.cout, 
        valeur: batiment.valeur, 
        clan: Clan[batiment.clan as keyof typeof Clan], 
        effet: batiment.effet ?? undefined
      }

      for(let i = 0; i < batiment.quantite; i++) {
        batiments.push(new Batiment(bat));
      }
    });

    return batiments;
  }
}

export default FabriqueBatiments;
