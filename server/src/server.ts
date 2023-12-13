import express from 'express';
import Partie from './modele/Partie';
import iJoueur from './modele/joueurs/iJoueur';
import JoueurDefaut from './modele/joueurs/JoueurDefaut';
import EventBus from './modele/evenements/EventBus';

const app = express();
const port = 3000;

const joueurs = new Array<iJoueur>
joueurs.push(new JoueurDefaut("Alex"));
joueurs.push(new JoueurDefaut("Nico"));
joueurs.push(new JoueurDefaut("Manon"));
joueurs.push(new JoueurDefaut("Joshua"));
joueurs.push(new JoueurDefaut("JB"));
joueurs.push(new JoueurDefaut("Aurélie"));
joueurs.push(new JoueurDefaut("Clément"));

for (let i=0; i<1; i++) {
  const partie = new Partie(joueurs);
  partie.jouer();
}

// Exemple d'utilisation
const eventBus = EventBus.getInstance();

type ObjectType = { [key: string]: any };

function printObjectAttributes(obj: ObjectType, indent: number = 0, parentKey?: string): void {
  const blueText = '\x1b[34m'; // Code ANSI pour la couleur bleue
  const resetText = '\x1b[0m'; // Code ANSI pour réinitialiser la couleur

  const indentation = ' '.repeat(indent * 3);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        // Récursion pour les objets imbriqués
        console.log(`${indentation}${key}: `);
        printObjectAttributes(value, indent + 1, key);
        
      } else if (value !== undefined) {
        // Afficher l'attribut
        console.log(`${indentation}${key}: ${blueText}${value}${resetText}`);
      }
    }
  }
}

printObjectAttributes(eventBus.getRegistre());
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

