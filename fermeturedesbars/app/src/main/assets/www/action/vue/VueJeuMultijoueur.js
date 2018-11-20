var VueJeuMultijoueur = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("jeu-multijoueur").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
