var VueAttenteMultijoueur = (function () {

  var contenuPage = document.getElementById("attente-multijoueur").innerHTML;;

  return function (envoyerJoueurPret) {

    this.afficher = function () {
      document.getElementsByTagName("body")[0].innerHTML = contenuPage;
      document.getElementById('pseudo').innerHTML = "";
      //var formulaireAttenteMulti = document.getElementById('formAttenteMulti');

      document.getElementById('btn-envoi-pret').addEventListener('click', envoyerJoueurPret);
      document.body.addEventListener('afficherListe_liste_joueur', this.afficherListeJoueur);
      document.body.addEventListener('afficher_joueur_pret', this.afficherJoueurPret);
    }

    this.afficherListeJoueur = function (evenement) {
      listeJoueur = evenement.detail.listeJoueurRoom;
      document.getElementById('pseudo').innerHTML = "";

      for (i = 0; i < listeJoueur.length; i++) {
        document.getElementById('pseudo').innerHTML += "<div id='"+listeJoueur[i].id+"'><p>Joueur " + (i + 1) + " : " + listeJoueur[i].pseudo + "</p></div>";
      }
    }

    this.afficherJoueurPret = function(evenement){
      document.getElementById(evenement.detail.joueur).innerHTML += "<p>Prêt !!</p>"
    }
  }


})();
