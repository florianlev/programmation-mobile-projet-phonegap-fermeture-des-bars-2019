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

    for (i = 0; i < donnees.lenght; i++) {
      html += "<span><p>" + donnes[i].nom + "</p><p>" + donnees[i].score + "</p></span>";
    }

    conteneur.innerHTML = html;

  }
  initialiser();
}
