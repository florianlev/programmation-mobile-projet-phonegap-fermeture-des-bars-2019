var VueFinSolo = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("fin-solo").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
