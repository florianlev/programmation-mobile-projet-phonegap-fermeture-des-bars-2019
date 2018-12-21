var VueJeuMultijoueur = (function () {

    var contenuPage = document.getElementById("jeu-multijoueur").innerHTML;
    return function (listeJoueur) {
        var vueJeuMultijoueur = this;
        var canvas;
        var content;
        var scene;
        var route;
        var hammer;
        var joueurActuel; 

        function initialiser() {
            console.log("vueJeuMultijoueurInitialiser");

        }

        this.afficher = function () {
            console.log('vueJeuAfficher()');
            hammer = new hammer(document.body);

            document.body.innerHTML = contenuPage;
            canvas = document.getElementById("dessin");
            arrangerCanvas();

            //Initialisation scene createJs
            scene = new createjs.Stage(canvas);

            //Inistialisation du rafraichissement du jeu
            //createjs.Ticker.addEventListener("tick", rafraichirJeu);
            createjs.Ticker.setInterval(1000 / 60);
            createjs.Ticker.setFPS(60);

            //Initilialisation de la route et des variables
            route = new Route(scene, content, canvas);
        }

        this.chargerJoueurEtObjet = function(){

            for(indiceListeJoueur = 0; indiceListeJoueur<listeJoueur.length; indiceListeJoueur++){
                listeJoueur[indiceListeJoueur].setContent(content);
                listeJoueur[indiceListeJoueur].setScene(scene);
                listeJoueur[indiceListeJoueur].afficher();

            }

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

        initialiser();

    }
})();