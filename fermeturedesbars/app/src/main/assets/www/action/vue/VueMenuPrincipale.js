var VueMenuPrincipale = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("menu-principale").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
