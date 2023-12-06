import Partie from './modeles/Partie';
import JoueurDefaut from './modeles/joueurs/JoueurDefaut';
import iJoueur from './modeles/joueurs/iJoueur';

function App() {
  let joueurs = new Array<iJoueur>();
  joueurs.push(new JoueurDefaut("Alex"));
  joueurs.push(new JoueurDefaut("Nico"));
  joueurs.push(new JoueurDefaut("Manon"));
  joueurs.push(new JoueurDefaut("Joshua"));
  joueurs.push(new JoueurDefaut("JB"));
  joueurs.push(new JoueurDefaut("Aurélie"));
  
  var partie = new Partie(joueurs);

  partie.debutPartie();
  partie.tourDeJeu();

  partie.statusPartie();
  return (
    <div className="App">
    </div>
  );
}

export default App;
