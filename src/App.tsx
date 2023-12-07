import Partie from './modeles/Partie';
import JoueurDefaut from './modeles/joueurs/JoueurDefaut';
import iJoueur from './modeles/joueurs/iJoueur';
import CustomArray from './modeles/tools/CustomArray';

function App() {
  let joueurs = new CustomArray<iJoueur>();
  joueurs.push(new JoueurDefaut("Alex"));
  joueurs.push(new JoueurDefaut("Nico"));
  joueurs.push(new JoueurDefaut("Manon"));
  joueurs.push(new JoueurDefaut("Joshua"));
  joueurs.push(new JoueurDefaut("JB"));
  joueurs.push(new JoueurDefaut("Aurélie"));
  joueurs.push(new JoueurDefaut("Clément"));
  
  var partie = new Partie(joueurs);

  partie.debutPartie();
  partie.tourDeJeu();

  // partie.statusPartie();
  return (
    <div className="App">
    </div>
  );
}

export default App;
