var VueJeu = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("jeu").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
