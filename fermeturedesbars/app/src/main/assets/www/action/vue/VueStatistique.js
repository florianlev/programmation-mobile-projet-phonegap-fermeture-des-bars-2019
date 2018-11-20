var VueStatistique = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("statistique").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
