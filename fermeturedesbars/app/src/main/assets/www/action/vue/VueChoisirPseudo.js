var VueChoisirPseudo = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("choisir-pseudo").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
