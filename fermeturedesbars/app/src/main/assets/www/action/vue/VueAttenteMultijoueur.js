var VueAttenteMultijoueur = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("attente-multijoueur").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
