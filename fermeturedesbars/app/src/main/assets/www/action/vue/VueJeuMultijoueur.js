var VueJeuMultijoueur = function () {
  
  var contenuPage;

  function initialiser() {
    contenuPage = document.getElementById("jeu-multijoueur").innerHTML;
  }

  this.afficher = function () {
    document.body.innerHTML = contenuPage;
  }

  initialiser();

}
