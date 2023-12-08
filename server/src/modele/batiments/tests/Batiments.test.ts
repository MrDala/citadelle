import Batiment, { typeBatiment } from '../Batiment';
import Clan from '../../enum/Clan';
import { effet } from '../Effets';

describe('Batiment', () => {
  const sampleBatiment: typeBatiment = {
    nom: 'Tour de guet',
    cout: 5,
    valeur: 3,
    clan: Clan.RELIGIEUX
  };  

  it('devrait créer une instance de Batiment avec les propriétés fournies', () => {
    const batiment = new Batiment(sampleBatiment);

    expect(batiment.nom).toBe(sampleBatiment.nom);
    expect(batiment.cout).toBe(sampleBatiment.cout);
    expect(batiment.valeur).toBe(sampleBatiment.valeur);
    expect(batiment.clan).toBe(sampleBatiment.clan);
    expect(batiment.effet).toBe(sampleBatiment.effet);
  });

  it('devrait créer une instance de Batiment sans effet si aucun n\'est fourni', () => {
    const batimentSansEffet = new Batiment({
      nom: 'Autre bâtiment',
      cout: 7,
      valeur: 4,
      clan: Clan.MERVEILLE,
    });

    expect(batimentSansEffet.effet).toBeUndefined();
  });
});
