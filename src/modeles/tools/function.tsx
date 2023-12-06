export function melangerListe(liste: Array<any>): Array<any> {
  const listeMelangee = [...liste];

  for (let i = listeMelangee.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [listeMelangee[i], listeMelangee[j]] = [listeMelangee[j], listeMelangee[i]];
  }

  return listeMelangee;
}