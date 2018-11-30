var VueApreciation = function () {

  var contenuPage;

  function initialiser() {
    contenuPage = document.getElementById("apreciation").innerHTML;
  }

  this.afficher = function () {
    document.body.innerHTML = contenuPage;
  }

  initialiser();

}
