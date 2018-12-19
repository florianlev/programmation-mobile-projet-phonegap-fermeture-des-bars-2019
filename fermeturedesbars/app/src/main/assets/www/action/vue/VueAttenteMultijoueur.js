var VueAttenteMultijoueur = (function () {

  var contenuPage = document.getElementById("attente-multijoueur").innerHTML;;

  return function (){

    this.afficher = function () {

      document.getElementsByTagName("body")[0].innerHTML  = contenuPage;
    }

    this.afficherListeJoueur = function (){

    }



  }
  

})();
