import Batiment from '../Batiment';
import Clan from '../../enum/Clan';

describe('Batiment', () => {
  const sampleBatiment = {
    nom: 'Tour de guet',
    cout: 5,
    valeur: 3,
    clan: Clan.RELIGIEUX
  };  

  test('Les priopriétés du Batiment créé correspondent à celles fournies', () => {
    const batiment = new Batiment(sampleBatiment);

    expect(batiment.nom).toBe(sampleBatiment.nom);
    expect(batiment.cout).toBe(sampleBatiment.cout);
    expect(batiment.valeur).toBe(sampleBatiment.valeur);
    expect(batiment.clan).toBe(sampleBatiment.clan);
    expect(batiment.effet).toBeUndefined();
  });
});
