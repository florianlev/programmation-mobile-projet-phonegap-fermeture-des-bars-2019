var VueChoisirPseudo = function () {
  var contenuPage;

  function initialiser() {
    contenuPage = document.getElementById("choisir-pseudo").innerHTML;
  }

  this.afficher = function () {
    document.body.innerHTML = contenuPage;
    document.getElementById("formPseudo").addEventListener("submit", enregistrer);
  }

  var enregistrer = function (evenement) {
    evenement.preventDefault();
    nom = document.getElementById("inputPseudo");
    localStorage['pseudo'] = nom.value;
    window.location.hash = '#menu-principale'
  }

  initialiser();

}
