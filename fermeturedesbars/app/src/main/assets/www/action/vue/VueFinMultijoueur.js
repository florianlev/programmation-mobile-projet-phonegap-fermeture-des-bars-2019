var VueFinMultijoueur = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("fin-multijoueur").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
