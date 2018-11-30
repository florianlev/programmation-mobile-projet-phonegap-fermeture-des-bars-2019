var VueAttenteMultijoueur = function () {

  var contenuPage;

  function initialiser() {
    
    contenuPage = document.getElementById("attente-multijoueur").innerHTML;

  }

  this.afficher = function () {

    document.body.innerHTML = contenuPage;
  }

  initialiser();
}
