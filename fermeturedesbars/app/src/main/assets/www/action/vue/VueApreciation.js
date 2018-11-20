var VueApreciation = function(){
  var contenuPage;
  constructeur = function(){
    contenuPage = document.getElementById("apreciation").innerHTML;
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
  }
  constructeur();
}
