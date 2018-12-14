var VueChoixRoom = function () {

  var contenuPage = document.getElementById("choix-room").innerHTML;;


  this.afficher = function (connexion) {

    document.getElementsByTagName("body")[0].innerHTML = contenuPage;


    var formulaireRoom = document.getElementById('formChoixRoom');
    formulaireRoom.addEventListener('submit', creerRoom);
    connexionNode = new ConnexionNode();
  }

  function creerRoom(evenement) {
    alert("coucou");
    evenement.preventDefault();
    var nom = document.getElementById("nom").value;

    window.location.hash = "#menu-principale";
  }
}
