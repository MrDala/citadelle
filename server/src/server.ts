import express from 'express';
import Partie from './modele/Partie';
import CustomArray from './modele/tools/CustomArray';
import iJoueur from './modele/joueurs/iJoueur';
import JoueurDefaut from './modele/joueurs/JoueurDefaut';

const app = express();
const port = 3000;

const joueurs = new CustomArray<iJoueur>
joueurs.push(new JoueurDefaut("Alex"));
joueurs.push(new JoueurDefaut("Nico"));
joueurs.push(new JoueurDefaut("Manon"));
joueurs.push(new JoueurDefaut("Joshua"));
joueurs.push(new JoueurDefaut("JB"));
joueurs.push(new JoueurDefaut("Aurélie"));
joueurs.push(new JoueurDefaut("Clément"));

const partie = new Partie(joueurs);
partie.jouer();



// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

