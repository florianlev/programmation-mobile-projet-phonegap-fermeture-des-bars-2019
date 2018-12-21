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
        var isPartieEnCours;
        var isJeuStopper;

        function initialiser() {
            console.log("vueJeuMultijoueurInitialiser");
            isPartieEnCours = false;

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
            createjs.Ticker.setInterval(1000 / 60);
            createjs.Ticker.setFPS(60);

            //Initilialisation de la route et des variables
            route = new Route(scene, content, canvas);
        }

        this.chargerJoueurEtObjet = function () {

            for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
                var joueur = listeJoueur[indiceListeJoueur];
                joueur.setContent(content);
                joueur.setScene(scene);
                joueur.afficher();

                if (joueur.getIsJoueurActuel()) {
                    hammer.on('pan', function (evenement) {
                        if (joueur && !isJeuStopper) {
                            joueur.setPosition(evenement.center.x, evenement.center.y);
                        }
                    });

                }
                niveauAlcool = new NiveauAlcool(scene, joueur); //LORSEQUE LA BARRE DU HAUT EST VIDE FIN DE PARTIE; ACOSE DE LA DUPLICATION
                document.body.dispatchEvent(new CustomEvent("niveaualcoolestcharger"));
                gestionnaireObjets = new GestionnaireObjets(scene, content, joueur, niveauAlcool, score);

                //Envoyer evenement au serveur pour demarrer le jeu
                document.body.dispatchEvent(new CustomEvent("joueurestcharger"));

            }
        }

        this.debuterPartie = function(isPartieEnCours){
            this.isPartieEnCours = isPartieEnCours;
        }

        this.setNiveauAlcool = function (nouveauNiveauAlcool) {
            niveauAlcool.modifierNiveauAlcool(nouveauNiveauAlcool);
            createjs.Ticker.addEventListener("tick", rafraichirJeu);

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