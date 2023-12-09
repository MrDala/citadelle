import Clan from "../enum/Clan";
import CustomArray from "../tools/CustomArray";
import Batiment, { typeBatiment } from "./Batiment";
import { Effets } from "./Effets";

export interface BatimentJson {
  nom: string;
  cout: number;
  valeur: number;
  clan: string;
  effet?: string;
  quantite: number;
}

class FabriqueBatiments {
  public static init(json: Array<BatimentJson>): CustomArray<Batiment> {
    const batiments: CustomArray<Batiment> = new CustomArray<Batiment>();

    json.forEach((batiment) => {
      if (this.areRequiredFieldsInitialized(batiment)) {
        const bat: typeBatiment = {
          nom: batiment.nom,
          cout: batiment.cout,
          valeur: batiment.valeur,
          clan: Clan[batiment.clan as keyof typeof Clan],
          effet: Effets[batiment.effet!] ?? undefined
        }

        for (let i = 0; i < batiment.quantite; i++) {
          batiments.push(new Batiment(bat));
        }
      }

    });

    return batiments;
  }

  private static areRequiredFieldsInitialized(batiment: BatimentJson): boolean {
    // Vérifiez que tous les champs obligatoires sont initialisés
    return (
      typeof batiment.nom === 'string' &&
      typeof batiment.cout === 'number' && batiment.cout > 0 &&
      typeof batiment.valeur === 'number' && batiment.quantite > 0 &&
      typeof batiment.clan === 'string' && (
        batiment.clan === Clan.NOBLE ||
        batiment.clan === Clan.COMMERCANT ||
        batiment.clan === Clan.RELIGIEUX ||
        batiment.clan === Clan.MILITAIRE ||
        batiment.clan === Clan.MERVEILLE
      ) &&
      typeof batiment.quantite === 'number' && batiment.quantite > 0 &&
      ( 
        typeof batiment.effet === 'undefined' || (
          typeof batiment.effet === 'string' &&
          batiment.effet in Effets &&
          batiment.clan === Clan.MERVEILLE
        )
      )
    );
  }
}

export default FabriqueBatiments;
