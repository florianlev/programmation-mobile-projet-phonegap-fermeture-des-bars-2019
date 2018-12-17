var VueChoixRoom = (function () {

  var contenuPage = document.getElementById("choix-room").innerHTML;;


  return function (envoyerCreationRoom) {

    this.afficher = function () {

      document.getElementsByTagName("body")[0].innerHTML = contenuPage;
      var formulaireRoom = document.getElementById('formChoixRoom');
      formulaireRoom.addEventListener('submit', creerRoom);
    }

    this.afficherListeRoom = function (listeRoom) {
      for (i = 0; i < listeRoom.length; i++) {
        document.getElementById('listeRoom').innerHTML += "<a href='#'>"+ listeRoom[i].nom+"</a>";
      }
    }

    function creerRoom(evenement) {
      alert("coucou");
      evenement.preventDefault();
      var nom = document.getElementById("nom").value;
      window.location.hash = "#attente-multijoueur";
      envoyerCreationRoom(nom);
    }

  }

})();
