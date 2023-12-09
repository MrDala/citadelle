import FabriqueBatiments, { BatimentJson } from '../FabriqueBatiments';

const jsonVide = [{}];
const jsonClefsIncorrectes = [
  {
    "nom": "Temple",
    "quantite": 3,
    "clan": "RELIGIEUX",
    "coût": 1,
    "valeurE": 1
  }
]

const jsonTypeErreur = [
  {
    "nom": 10,
    "quantite": 3,
    "clan": "RELIGIEUX",
    "cout": 1,
    "valeur": "1"
  }
]

const jsonProprieteManquante = [
  {
    "nom": 10,
    "clan": "RELIGIEUX",
    "cout": 1,
  }
]

const jsonEffetInconnu = [
  {
    "nom": "Temple",
    "quantite": 3,
    "clan": "MERVEILLE",
    "cout": 1,
    "valeur": 1,
    "effet": "INCONNU"
  }
]

const jsonClanInconnu = [
  {
    "nom": "Temple",
    "quantite": 3,
    "clan": "INCONNU",
    "cout": 1,
    "valeur": 1,
  }
]

const jsonEffetSansMerveille = [
  {
    "nom": "Temple",
    "quantite": 3,
    "clan": "NOBLE",
    "cout": 1,
    "valeur": 1,
    "effet": "DONJON",
  }
]

const jsonQuantiteNulle = [
  {
    "nom": "Temple",
    "clan": "RELIGIEUX",
    "cout": 1,
    "valeur": 1,
    "quantite": 0
  }
];

const jsonValide = [
  {
    "nom": "Temple",
    "quantite": 3,
    "clan": "RELIGIEUX",
    "cout": 1,
    "valeur": 1
  }
]


describe('FabriqueBatiments', () => {
  test('should handle empty JSON', () => {
    const batiments = FabriqueBatiments.init(jsonVide as BatimentJson[]);
    expect(batiments).toHaveLength(0);
  });

  test('should handle JSON with incorrect keys', () => {
    const batiments = FabriqueBatiments.init(jsonClefsIncorrectes as []);
    expect(batiments).toHaveLength(0);
  });

  test('should handle JSON with type errors', () => {
    const batiments = FabriqueBatiments.init(jsonTypeErreur as []);
    expect(batiments).toHaveLength(0);
  });

  test('should handle JSON with missing properties', () => {
    const batiments = FabriqueBatiments.init(jsonProprieteManquante as []);
    expect(batiments).toHaveLength(0);
  });

  test('should handle JSON with unknown effect', () => {
    const batiments = FabriqueBatiments.init(jsonEffetInconnu);
    expect(batiments).toHaveLength(0);
  });

  test('should handle JSON with unknown clan', () => {
    const batiments = FabriqueBatiments.init(jsonClanInconnu);
    expect(batiments).toHaveLength(0);
  });

  test('should handle JSON with effect without MERVEILLE clan', () => {
    const batiments = FabriqueBatiments.init(jsonEffetSansMerveille);
    expect(batiments).toHaveLength(0);
  });

  test('should handle JSON with null quantity', () => {
    const batiments = FabriqueBatiments.init(jsonQuantiteNulle);
    expect(batiments).toHaveLength(0);
  });

  test('should handle valid JSON', () => {
    const batiments = FabriqueBatiments.init(jsonValide);
    expect(batiments).toHaveLength(3);
  });  
});


