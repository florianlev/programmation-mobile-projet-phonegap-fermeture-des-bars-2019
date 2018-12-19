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
        //document.getElementById('listeRoom').innerHTML += '<a href="#" class="list-group-item list-group-item-action list-group-item-dark">'+listeRoom[i].nom+'</a>';
        document.getElementById('listeRoom').innerHTML += "<tr><th class='text-left'>"+i+"</th><th class='text-left'><a id='RoomElement' class='elementRoom' href='?id="+listeRoom[i].id+"'>"+listeRoom[i].nom+"</a></th></tr>";
        document.getElementById("RoomElement").addEventListener("click", naviguerVersAttenteMulti);

      
      }
    }

    function naviguerVersAttenteMulti(event){
      console.log("idRoom" + idRoom);

      var URL_string = window.location.href;
      var url = new URL(URL_string);
      var idRoom = url.searchParams("idRoom");
      window.location.hash = "#attente-multijoueur";
    }

    function creerRoom(evenement) {
      evenement.preventDefault();
      var nom = document.getElementById("nom").value;
      window.location.hash = "#attente-multijoueur";
      envoyerCreationRoom(nom);
    }

  }

})();
