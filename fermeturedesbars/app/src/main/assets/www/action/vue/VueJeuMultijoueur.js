var VueJeuMultijoueur = (function () {

    var contenuPage = document.getElementById("jeu-multijoueur").innerHTML;
    return function () {
        var vueJeuMultijoueur = this;
        var canvas;
        var content;
        var scene;
        var route;
        var hammer;
        var listeJoueur = [];

        function initialiser(){
            console.log("vueJeuMultijoueurInitialiser");

        }

        this.afficher = function(){
            console.log('vueJeuAfficher()');
            hammer = new hammer(document.body);

            document.body.innerHTML = contenuPage;
            canvas = document.getElementById("dessin");
            arrangerCanvas();

        }

        function arrangerCanvas() {
            console.log("vueJeuArrangerCanvas");
            content = document.getElementById("content");
            scaleVitesse = content.offsetWidth / 1920;
            vitesseRoute = MONDE.VITESSE_JEU * scaleVitesse;
      
            if (canvas.width < content.offsetWidth) {
      
              canvas.width = content.offsetWidth;
            }
      
            if (canvas.height < content.offsetHeight) {
              canvas.height = content.offsetHeight;
            }
          }
      
    }
})();