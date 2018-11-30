var DaoStatistique = function () {

  this.recupererToutLesStatistique = function () {
    return localStorage['statistiques'];
  }

  this.ajouterPartie = function (partie) {
    if (localStorage['statistiques']) {
      donnees = localStorage['statistiques'];
      donnees['statistique'][donnees.length] = partie;
      localStorage['statistiques'] = donnees;
    } else {
      localStorage['statistiques'][0] = partie;
    }

  }

}
