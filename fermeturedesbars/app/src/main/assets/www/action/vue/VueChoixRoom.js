var VueChoixRoom = (function () {

  var contenuPage = document.getElementById("choix-room").innerHTML;;


  return function (envoyerCreationRoom) {

    this.afficher = function () {

      document.getElementsByTagName("body")[0].innerHTML = contenuPage;
      var formulaireRoom = document.getElementById('formChoixRoom');
      formulaireRoom.addEventListener('submit', creerRoom);
    }

    this.afficherListeRoom = function (listeRoom) {
      document.getElementById('listeRoom').innerHTML = "";
      for (i = 0; i < listeRoom.length; i++) {
        document.getElementById('listeRoom').innerHTML += "<li><a href='#'>"+ listeRoom[i].nom+"</a></li>";
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
