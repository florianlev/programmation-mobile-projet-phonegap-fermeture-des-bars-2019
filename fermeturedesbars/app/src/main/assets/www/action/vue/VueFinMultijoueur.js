var VueFinMultijoueur = function () {
  var contenuPage;

  function initialiser(){
    contenuPage = document.getElementById("fin-multijoueur").innerHTML;
  }

  this.afficher = function (/*pseudoLocal, scoreLocal, pseudoAutre, scoreAutre*/) {
    document.body.innerHTML = contenuPage;
    daoStatistique = new DaoStatistique();
    //ajoute au table des score le resultat de la partie
    daoStatistique.ajouterPartie(scoreLocal, pseudoLocal);
    //daoStatistique.ajouterPartie(pseudoAutre, scoreAutre);
    //ajoute le score des deux joueur a l'ecan
    tagScorePartie = document.getElementById("score-joueurs");
    htmlScorePartie = "";
    htmlScorePartie += "<p>" + localStorage['pseudo'] + "</p>"/*"<p>" + local.score + "</p></span>"*/;
    //htmlScorePartie += "<span><p>" + autre.pseudo + "</p><p>" + autre.score + "</p></span>";

    tagScorePartie.innerHTML = htmlScorePartie;


  }
  initialiser();
}
