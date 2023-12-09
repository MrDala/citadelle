import Batiment, { typeBatiment } from '../Batiment';
import Clan from '../../enum/Clan';
import { Effets } from '../Effets';

const batimentSimple : typeBatiment = {
  nom: 'Tour de guet',
  cout: 5,
  valeur: 3,
  clan: Clan.RELIGIEUX
};  

const batimentEffet : typeBatiment = {
  nom: "Donjon",
  cout: 2,
  valeur: 2,
  clan: Clan.MERVEILLE,
  effet: Effets["DONJON"],
}; 

const batimentProprieteManquante = {
  nom: 'Chateau',
  cout: 10,
  clan: Clan.MILITAIRE
} as any

const batimentErreurType = {
  nom: 'Chateau',
  cout: 'incorrectType',
  valeur: 5,
  clan: Clan.MILITAIRE,
}as any

const batimentClanInconnu= {
  nom: 'Tour de guet',
  cout: 5,
  valeur: 3,
  clan: 'UNKNOWN_CLAN',
} as any

const batimentEffetInconnu = {
  nom: 'Donjon Obscur',
  cout: 3,
  valeur: 4,
  clan: Clan.MERVEILLE,
  effet: 'UNKNOWN_EFFECT',
} as any

describe('Batiment', () => {
  test('should create an instance of Batiment with an undefined effect', () => {
    const batiment = new Batiment(batimentSimple);

    expect(batiment.nom).toBe(batimentSimple.nom);
    expect(batiment.cout).toBe(batimentSimple.cout);
    expect(batiment.valeur).toBe(batimentSimple.valeur);
    expect(batiment.clan).toBe(batimentSimple.clan);
    expect(batiment.effet).toBeUndefined();
  });

  test('should create an instance of Batiment with the provided effect', () => {
    const batiment = new Batiment(batimentEffet);

    expect(batiment.nom).toBe(batimentEffet.nom);
    expect(batiment.cout).toBe(batimentEffet.cout);
    expect(batiment.valeur).toBe(batimentEffet.valeur);
    expect(batiment.clan).toBe(batimentEffet.clan);
    expect(batiment.effet).toBe(Effets["DONJON"]);
  });

  test('should throw an error for missing  properties', () => {
    expect(() => new Batiment(batimentProprieteManquante)).toThrow();
  });

  test('should throw an error for incorrect properties', () => {
    expect(() => new Batiment(batimentErreurType)).toThrow();
  });

  test('should throw an error for an unknown clan', () => {
    expect(() => new Batiment(batimentClanInconnu)).toThrow();
  });

  test('should throw an error for an unknown effect', () => {
    expect(() => new Batiment(batimentEffetInconnu)).toThrow();
  });
});
