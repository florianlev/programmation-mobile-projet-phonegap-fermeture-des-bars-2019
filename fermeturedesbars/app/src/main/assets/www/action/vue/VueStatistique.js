var VueStatistique = function () {
  var contenuPage;

  function initialiser(){
    contenuPage = document.getElementById("statistique").innerHTML;
  }

  this.afficher = function () {

    document.body.innerHTML = contenuPage;
    conteneur = document.getElementById("statistique");
    daoStatistique = new DaoStatistique();
    donnees = daoStatistique.recupererToutLesStatistique();
    html = "";

    for (i = 0; i < donnees.length; i++) {
      html += "<div><p>" + donnees[i].pseudo + " : " + donnees[i].score + "</p></div>";
    }

    conteneur.innerHTML = html;

  }
  initialiser();
}
