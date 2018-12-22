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
        var listeNiveauAlcool = [];
        var niveauAlcoolJoueurActuel;
        var gestionnaireObjets;
        var debutInterval;
        function initialiser() {
            console.log("vueJeuMultijoueurInitialiser");
            isPartieEnCours = false;

        }

        this.afficher = function () {
            console.log('vueJeuAfficher()');
            hammer = new Hammer(document.body);

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
            console.log(listeJoueur.length);
            for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
                var joueur = listeJoueur[indiceListeJoueur];
                joueur.setContent(content);
                joueur.setScene(scene);
                joueur.afficher();

                //Chargement niveau alcool
                niveauAlcool = new NiveauAlcool(scene, joueur, joueur.id, listeJoueur[indiceListeJoueur].getCouleur());
                listeNiveauAlcool.push(niveauAlcool);
                niveauAlcool.afficher();
                document.body.dispatchEvent(new CustomEvent("niveaualcoolestcharger"));
                if (joueur.getIsJoueurActuel()) {
                    gestionnaireObjets = new GestionnaireObjets(scene, content,joueur);
                    joueurActuel = joueur;
                    hammer.on('pan', function (evenement) {
                        //if (joueur && !isJeuStopper) {
                        joueur = joueurActuel;
                        if (joueur) {
                            joueur.setPosition(evenement.center.x, evenement.center.y);
                        }
                    });
                }

            }
            for (indiceListeNiveauAlcool = 0; indiceListeNiveauAlcool < listeNiveauAlcool.length; indiceListeNiveauAlcool++) {
                if (listeNiveauAlcool[indiceListeNiveauAlcool].getId() == joueurActuel.getId()) {
                    niveauAlcoolJoueurActuel = listeNiveauAlcool[indiceListeNiveauAlcool];

                }
            }

            //Envoyer evenement au serveur pour demarrer le jeu
            document.body.dispatchEvent(new CustomEvent("joueurestcharger"));
        }

        this.debuterPartie = function (isPartieEnCours) {
            console.log('debuterPartie');
            this.isPartieEnCours = isPartieEnCours;
            createjs.Ticker.addEventListener("tick", rafraichirJeu);

        }
        this.augmenterNiveauAlcool = function(){
          niveauAlcool.modifierNiveauAlcool(niveauAlcool.getNivauAlcool()+10);
        }
        this.setNiveauAlcool = function (nouveauNiveauAlcool) {
            niveauAlcool.modifierNiveauAlcool(nouveauNiveauAlcool);

        }
        function rafraichirJeu(evenement) {
            route.derouler(vitesseRoute);
            scene.update(evenement);
            positionJoueur = joueurActuel.getPositions()
            niveauAlcoolJoueurActuel.demarrerDiminution();
            gestionnaireObjets.deplacerLesObjets(vitesseRoute);
            gestionnaireObjets.testerCollision();
            positions = {'x':positionJoueur.x/content.offsetWidth,'y':positionJoueur.y/content.offsetHeight};
            document.body.dispatchEvent(new CustomEvent('envoyerpositionsetniveaualcool', {
                detail: {
                    positions: positions,
                    niveauAlcool: niveauAlcoolJoueurActuel.getNivauAlcool(),
                    isJoueurMort: joueurActuel.isJoueurMort()
                }
            }));
            for(iJoueur = 0; iJoueur < listeJoueur.length; iJoueur++){
              if(listeJoueur[iJoueur].isJoueurMort()){
                listeJoueur[iJoueur].monterEnY(vitesseRoute);
              }
            }

            var nouvelInterval = Date.now();
            //SI au premier instant du jeu on initialise le debut de l'interval a quelque chose
            if (!debutInterval) {
              debutInterval = Date.now();
            }
            if (nouvelInterval - debutInterval >= 20) {
              vitesseRoute += 0.005;

              debutInterval = nouvelInterval;
            }
        }
        function terminerPartie(){
          console.log('terminer')
          setTimeout(function(){
            createjs.Ticker.off("tick", rafraichirJeu);
            canvas = null;
            content = null;
            scene = null;
            route = null;
            hammer = null;
            joueurActuel = null;
            isPartieEnCours = null;
            isJeuStopper = null;
            listeNiveauAlcool = null;
            niveauAlcoolJoueurActuel = null;
            gestionnaireObjets = null;
            debutInterval = null;
            document.body.dispatchEvent(new CustomEvent("partieTerminer"));
          }, 3000);
        }
        this.transmettrePositionsAdversaireNiveauAlcool = function (donnees) {
            for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
              //console.log(donnees.detail.positions.x);
              //console.log(donnees.detail.positions.x* content.offsetWidth);
              positions = {'x':donnees.detail.positions.x * content.offsetWidth,'y':donnees.detail.positions.y * content.offsetHeight};
              if (listeJoueur[indiceListeJoueur].id == donnees.detail.idJoueur && !donnees.detail.isJoueurMort){
                listeJoueur[indiceListeJoueur].setPositions(positions);
              }else if(listeJoueur[indiceListeJoueur].id == donnees.detail.idJoueur){
                //listeJoueur[indiceListeJoueur].monterEnY(vitesseRoute);
                listeJoueur[indiceListeJoueur].setEtatJoueur("estEcraser");
              }

            }
            for (indiceListeNiveauAlcool = 0; indiceListeNiveauAlcool < listeNiveauAlcool.length; indiceListeNiveauAlcool++) {
                if (listeNiveauAlcool[indiceListeNiveauAlcool].getId() == donnees.detail.idJoueur) {
                    listeNiveauAlcool[indiceListeNiveauAlcool].setNiveauAlcool(donnees.detail.niveauAlcool);
                }
            }
            if(joueurActuel.isJoueurMort() && donnees.detail.isJoueurMort) terminerPartie();
        }

        this.repositionnerUnObjet = function(id, position){
          gestionnaireObjets.repositionnerUnObjet(id, position);
        }
        this.repositionnerUneVoiture = function(id, position){
          gestionnaireObjets.repositionnerUneVoiture(id, position);
        }
        this.repositionnerUneBouteille = function(id, position){
          gestionnaireObjets.repositionnerUneBouteille(id, position);
        }
        this.setEtatJoueurEcraser = function(){
          joueurActuel.setEtatJoueur("estEcraser");
        }
        this.getScore = function(){
          //return
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
