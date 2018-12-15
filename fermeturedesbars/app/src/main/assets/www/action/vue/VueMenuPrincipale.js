var VueMenuPrincipale = function () {

  var contenuPage;

  function initialiser() {
    console.log("VueMenuPrincipalPseudoAfficher");

    contenuPage = document.getElementById("menu-principale").innerHTML;
  }

  this.afficher = function () {
    document.body.innerHTML = contenuPage;
  }

  initialiser();
}
