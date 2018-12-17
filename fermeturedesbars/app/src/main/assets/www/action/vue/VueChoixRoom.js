var VueChoixRoom = (function () {

  var contenuPage = document.getElementById("choix-room").innerHTML;;


  return function (envoyerCreationRoom) {

    this.afficher = function () {

      document.getElementsByTagName("body")[0].innerHTML = contenuPage;


      var formulaireRoom = document.getElementById('formChoixRoom');
      formulaireRoom.addEventListener('submit', creerRoom);
    }

    function creerRoom(evenement) {
      alert("coucou");
      evenement.preventDefault();
      var nom = document.getElementById("nom").value;
      envoyerCreationRoom(nom);
      window.location.hash = "#attente-multijoueur";
    }

  }

})();
