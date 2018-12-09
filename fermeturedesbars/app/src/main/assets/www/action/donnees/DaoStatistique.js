var DaoStatistique = function () {

  this.recupererToutLesStatistique = function () {
    return localStorage['statistiques'];
  }

  this.ajouterPartie = function (partie, pseudo) {//ne fonctionne pas.... ?
    if (localStorage['statistiques']) {
      donnees = localStorage['statistiques'];
      donnees[donnees.length] = [];
      donnees[donnees.length]['score'] = partie;
      donnees[donnees.length]['pseudo'] = pseudo;
      localStorage['statistiques'] = donnees;
    } else {
      statistique = [];
      statistique['score'] = partie;
      statistique['pseudo'] = pseudo;
      localStorage['statistiques'] = [statistique];
    }

  }

}
