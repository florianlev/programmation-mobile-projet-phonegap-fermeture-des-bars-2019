var VueFinMultijoueur = function(){
  var contenuPage;
  innitialiser = function(){
    contenuPage = document.getElementById("fin-multijoueur").innerHTML;
  }
  this.afficher = function(local, autre){
    document.body.innerHTML = contenuPage;

    tagScorePartie = document.getElementById("score-joueurs");
    htmlScorePartie = "";
    htmlScorePartie += "<span><p>"+local.nom+"</p><p>"+local.score+"</p></span>";
    htmlScorePartie += "<span><p>"+autre.nom+"</p><p>"+autre.score+"</p></span>";

    tagScorePartie.innerHTML = htmlScorePartie;
  }
  innitialiser();
}
