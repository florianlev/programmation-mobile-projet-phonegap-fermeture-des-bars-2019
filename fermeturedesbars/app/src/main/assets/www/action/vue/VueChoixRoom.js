var VueChoixRoom = function () {

    var contenuPage;
  
    function initialiser() {
      
      contenuPage = document.getElementById("choix-room").innerHTML;

    }
  
    this.afficher = function () {
  
      document.body.innerHTML = contenuPage;
      connexionNode = new ConnexionNode();
    }
  
    initialiser();
  }
  