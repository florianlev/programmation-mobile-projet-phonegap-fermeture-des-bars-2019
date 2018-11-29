var VueFinSolo = function(){
  var contenuPage;
  innitialiser = function(){
    contenuPage = document.getElementById("fin-solo").innerHTML;
  }
  this.afficher = function(pointage){
    document.body.innerHTML = contenuPage;
    tagScorePartie = document.getElementsByName('h1')[0];
    tagScorePartie.innerHTML += ": " + pointage.score;
  }
  innitialiser();
}
