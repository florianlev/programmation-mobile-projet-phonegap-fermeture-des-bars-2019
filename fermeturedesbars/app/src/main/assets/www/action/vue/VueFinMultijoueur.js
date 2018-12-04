var VueFinMultijoueur = function () {
  var contenuPage;

  function initialiser(){
    contenuPage = document.getElementById("fin-multijoueur").innerHTML;
  }

  this.afficher = function (local, autre) {
    document.body.innerHTML = contenuPage;
    daoStatistique = new DaoStatistique();
    //ajoute au table des score le resultat de la partie
    daoStatistique.ajouterPartie(local);
    //ajoute le score des deux joueur a l'ecan
    tagScorePartie = document.getElementById("score-joueurs");
    htmlScorePartie = "";
    htmlScorePartie += "<span><p>" + local.nom + "</p><p>" + local.score + "</p></span>";
    htmlScorePartie += "<span><p>" + autre.nom + "</p><p>" + autre.score + "</p></span>";

    tagScorePartie.innerHTML = htmlScorePartie;


  }
  initialiser();
}
