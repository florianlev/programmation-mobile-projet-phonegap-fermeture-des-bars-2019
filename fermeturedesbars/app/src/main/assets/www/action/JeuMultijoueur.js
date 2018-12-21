var JeuMultijoueur = function (listeJoueur, connexionNode) {

  var vueJeuMultijoueur;
  var partieTerminer;

  function initialiser() {

    vueJeuMultijoueur = new VueJeuMultijoueur(listeJoueur);

    document.body.addEventListener("fondecranpret", chargerJoueurEtObjet);
  }

  function chargerJoueurEtObjet(){
    vueJeuMultijoueur.chargerJoueurEtObjet(joueur);

  }


  this.demarrerJeu = function(){
    partieTerminer = false;

  }


  initialiser();
}