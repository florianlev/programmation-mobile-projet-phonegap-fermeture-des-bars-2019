var VueAttenteMultijoueur = (function () {

  var contenuPage = document.getElementById("attente-multijoueur").innerHTML;;

  return function () {

    this.afficher = function () {
      document.getElementsByTagName("body")[0].innerHTML = contenuPage;
      document.getElementById('pseudo').innerHTML = "";

    }

    this.afficherListeJoueur = function (listeJoueur) {
      document.getElementById('pseudo').innerHTML = "";

      for (i = 0; i < listeJoueur.length; i++) {
        document.getElementById('pseudo').innerHTML += "<div><p>Joueur " + (i + 1) + " : " + listeJoueur[i].pseudo + "</p></div>";
      }
    }
  }


})();
