var VueJeu = (function () {

  var contenuPage = document.getElementById("jeu").innerHTML;

  console.log("vueJeuInclude");

  return function () {

    var vueJeu = this;
    var canvas;
    var content;
    var scene;
    var route;
    var hammer;
    var joueur;
    var gestionnaireObjets;
    var niveauAlcool;
    var score;
    var accelerationJeu;
    var vitesseRoute;
    var etatCourantJoueur;
    var boucleJeuRepeteur;
    var debutInterval;
    var isJeuStopper;

    function initialiser() {
      console.log("vueJeuInitialiser");
      isJeuStopper = false;
    }

    this.afficher = function () {
      console.log("vueJeuAfficher()");
      hammer = new Hammer(document.body);

      //Initialisaton du canvas
      document.body.innerHTML = contenuPage;
      canvas = document.getElementById("dessin");
      arrangerCanvas();

      //Initialisation scene createJs
      scene = new createjs.Stage(canvas);

      //Inistialisation du rafraichissement du jeu
      //createjs.Ticker.addEventListener("tick", rafraichirJeu);
      createjs.Ticker.setInterval(1000 / 60);
      createjs.Ticker.setFPS(60);

      //Event PartieTerminer et RouteCharger

      //Initilialisation de la route et des variables
      route = new Route(scene, content, canvas);
      accelerationJeu = 0;


      debutInterval = 0;
    }

    //Boucle de jeu
    function rafraichirJeu(evenement) {

      var nouvelInterval = Date.now();



      //SI au premier instant du jeu on initialise le debut de l'interval a quelque chose
      if (!debutInterval) {
        debutInterval = Date.now();
      }

      gestionnaireObjets.repositionnerObjets(Bouteille, nouvelInterval);
      gestionnaireObjets.repositionnerObjets(Obstacle, nouvelInterval);
      gestionnaireObjets.repositionnerObjets(Voiture, nouvelInterval);


      //Si le nouveau temps est plus grand que l'accelaration souhaiter par rapport au début de l'interval
      if (nouvelInterval - debutInterval >= 20) {
        vitesseRoute += 0.005;

        debutInterval = nouvelInterval;
      }

      //Appliquer les déplacements
      gestionnaireObjets.deplacerLesObjets(vitesseRoute);
      gestionnaireObjets.testerCollision();
      niveauAlcool.demarrerDiminution();

      route.derouler(vitesseRoute);
      scene.update(evenement);
      if (isJeuStopper) {
        joueur.monterEnY(vitesseRoute);
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

    function deplacerJoueur(evenement) {
      if (joueur && !isJeuStopper) {
        joueur.setPosition(evenement.center.x, evenement.center.y);

      }
    }

    this.chargerJoueurEtObjet = function (nouveauJoueur) {
      //joueur = new Joueur(scene, content);
      joueur = nouveauJoueur;
      joueur.setContent(content);
      joueur.setScene(scene);
      joueur.setIsJoueurActuel(true);
      joueur.afficher();
      hammer.on('pan', deplacerJoueur);
      //niveauAlcool =new NiveauAlcool(scene);

      //TO DO  : POUR TOUT CES OBSTACLES ESSAYER DE VOIR POOUR UN SYSTEME DAPPARITION RANDOM de 1 OU PLUSIEURS FOIS LE MEME OBSTACLE
      score = new Score(scene);
      couleur ="#9CCA30";
      niveauAlcool = new NiveauAlcool(scene, joueur, 0, "#0077CC"); //LORSEQUE LA BARRE DU HAUT EST VIDE FIN DE PARTIE; ACOSE DE LA DUPLICATION
      niveauAlcool.afficher();
      document.body.dispatchEvent(new CustomEvent("niveaualcoolestcharger"));
      gestionnaireObjets = new GestionnaireObjets(scene, content);
      gestionnaireObjets.setJoueur(joueur);
      createjs.Ticker.addEventListener("tick", rafraichirJeu);
    }


    //Stopper le ticker de la boucle de jeu
    this.stopperJeu = function (finaliserJeu) {
      //TO DO : Probleme si on clique rapidment sur recommencer la partie sinon ça fonctionne
      if (!isJeuStopper) {
        vitesseRoute = MONDE.VITESSE_JEU * scaleVitesse;
        test = setTimeout(function () {
          gestionnaireObjets.detruire();
          createjs.Ticker.off("tick", rafraichirJeu);
          canvas = null;
          content = null;
          scene = null;
          route = null;
          hammer = null;
          joueur = null;
          gestionnaireObjets = null;
          niveauAlcool = null;
          score = null;
          accelerationJeu = null;
          vitesseRoute = null;
          etatCourantJoueur = null;
          boucleJeuRepeteur = null;
          debutInterval = null;
          finaliserJeu();

        }, 2000);
      }

      isJeuStopper = true;


    }

    this.getNiveauAlcool = function () {
      return niveauAlcool.getNivauAlcool();
    }


    this.setScore = function (nouveauScore) {
      score.setScore(nouveauScore);
    }

    this.ajouterBouteille = function (idBouteille, delai) {
      gestionnaireObjets.afficherBouteilleDansLeTemps(idBouteille, delai);

    }

    this.ajouterObstacle = function (idObstacle, delai) {
      console.log("ajouterObstacle" + idObstacle);
      gestionnaireObjets.afficherObstacleDansLeTemps(idObstacle, delai);
    }

    this.ajouterVoiture = function (idVoiture, delai) {
      gestionnaireObjets.afficherVoitureDansLeTemps(idVoiture, delai);
    }


    this.setNiveauAlcool = function (nouveauNiveauAlcool) {
      niveauAlcool.modifierNiveauAlcool(nouveauNiveauAlcool);
    }

    this.detruire = function () {
      console.log("fin");
      clearTimeout(boucleJeuRepeteur);

    }


    this.setDebutIntervalJeu = function (debutIntervalJeu) {
      debutIntervalJeu
    }

    initialiser();

  }
})();
