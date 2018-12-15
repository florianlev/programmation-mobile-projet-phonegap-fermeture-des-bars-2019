var VueJeu = (function () {

  var contenuPage = document.getElementById("jeu").innerHTML;

  console.log("vueJeuInclude");

  return function (terminerJeu,
    gererCollisionAvecBouteille,
    gererBouteilleSortieEcran,
    gererBouteilleVerteChargee) {
    var vueJeu = this;
    var canvas;
    var content;
    var scene;
    var route;
    var hammer;
    var joueur;
    var gestionnaireObjets;
    var niveauAlcool
    var score;
    var accelerationJeu;
    var vitesseRoute;
    var etatCourantJoueur;
    var boucleJeuRepeteur;
    var debutInterval;
    var delaiNouvelleBouteille;
    var debutIntervalBouteille;

    function initialiser() {
      console.log("vueJeuInitialiser");
      vitesseRoute = MONDE.VITESSE_JEU;

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
      document.body.addEventListener("fondecranpret", chargerJoueurEtObjet);
      document.body.addEventListener("collisionavecobjet", terminerJeu);
      document.body.addEventListener("collisionavecbouteille", gererCollisionAvecBouteille);
      document.body.addEventListener("bouteillesortieecran", gererBouteilleSortieEcran);
      document.body.addEventListener("bouteillevertechargee", gererBouteilleVerteChargee);
      document.body.addEventListener("listebouteillechargee", gererListeBouteillesChargee);




      //Initilialisation de la route et des variables
      route = new Route(scene, content, canvas);
      accelerationJeu = 0;


      debutInterval = 0;
      delaiNouvelleBouteille = [];
      debutIntervalBouteille = [];
    }

    //Boucle de jeu
    function rafraichirJeu(evenement) {

      var nouvelInterval = Date.now();



      //SI au premier instant du jeu on initialise le debut de l'interval a quelque chose
      if (!debutInterval) {
        debutInterval = Date.now();
      }

      var listeBouteilles = gestionnaireObjets.getListeBouteilles();
      for (indiceListeBouteilles = 0; indiceListeBouteilles < listeBouteilles.length; indiceListeBouteilles++) {
        var delaiAffichage = listeBouteilles[indiceListeBouteilles].getDelaiAffichage();
        if (delaiAffichage) {
          if (nouvelInterval - listeBouteilles[indiceListeBouteilles].getDebutInterval() >= delaiAffichage) {
            gestionnaireObjets.repositionnerBouteille(indiceListeBouteilles);
            listeBouteilles[indiceListeBouteilles].setDelaiAffichage(0);
            listeBouteilles[indiceListeBouteilles].setDebutInterval(0);
          }
        }
      }

      //On prend la mesure du temps maintenant

      //Si le nouveau temps est plus grand que l'accelaration souhaiter par rapport au début de l'interval
      if (nouvelInterval - debutInterval >= 20) {
        vitesseRoute += 0.005;

        debutInterval = nouvelInterval;
      }/*else{
        accelerationJeu += 1;
        if(accelerationJeu >= 20){
          accelerationJeu = 0;
        }
      } */
      //Appliquer les déplacements
      gestionnaireObjets.deplacerLesObjets(vitesseRoute);
      gestionnaireObjets.testerCollision();
      niveauAlcool.demarrerDiminution();

      route.derouler(vitesseRoute);
      scene.update(evenement);
    }

    function arrangerCanvas() {
      console.log("vueJeuArrangerCanvas");
      content = document.getElementById("content");

      if (canvas.width < content.offsetWidth) {

        canvas.width = content.offsetWidth;
      }

      if (canvas.height < content.offsetHeight) {
        canvas.height = content.offsetHeight;
      }
    }

    function deplacerJoueur(evenement) {
      joueur.setPosition(evenement.center.x, evenement.center.y);
    }

    function chargerJoueurEtObjet(evenement) {//PROBLEME DE DUPICATION POUR TOUT CES ITEM SUR PC.... SEULEMENT SUR PC
      joueur = new Joueur(scene, content);
      hammer.on('pan', deplacerJoueur);
      //niveauAlcool =new NiveauAlcool(scene);

      //TO DO  : POUR TOUT CES OBSTACLES ESSAYER DE VOIR POOUR UN SYSTEME DAPPARITION RANDOM de 1 OU PLUSIEURS FOIS LE MEME OBSTACLE
      score = new Score(scene);
      niveauAlcool = new NiveauAlcool(scene, joueur);//LORSEQUE LA BARRE DU HAUT EST VIDE FIN DE PARTIE; ACOSE DE LA DUPLICATION
      gestionnaireObjets = new GestionnaireObjets(scene, content, joueur, niveauAlcool, score);
      //setTimeout(boucleJeu, 60 * accelerationJeu);
      createjs.Ticker.addEventListener("tick", rafraichirJeu);
      /* bouclerJeu(); */
    }


    //Stopper le ticker de la boucle de jeu
    this.stopperJeu = function (finaliserJeu) {
      setTimeout(function () {
        createjs.Ticker.off("tick", rafraichirJeu);
        scene.clear();
        finaliserJeu();
      }, 5000);

    }


    this.setScore = function (nouveauScore) {
      score.setScore(nouveauScore);
    }

    this.ajouterBouteille = function (idBouteille, delai) {
      gestionnaireObjets.afficherBouteilleDansLeTemps(idBouteille, delai);

    }


    this.setNiveauAlcool = function (nouveauNiveauAlcool) {
      niveauAlcool.modifierNiveauAlcool(nouveauNiveauAlcool);
    }

    this.detruire = function () {
      console.log("fin");
      clearTimeout(boucleJeuRepeteur);

    }

    function gererListeBouteillesChargee() {
      gestionnaireObjets.setIsListeBouteilleCharger(true);
    }

    this.setDebutIntervalJeu = function (debutIntervalJeu) {
      debutIntervalJeu
    }

    initialiser();

  }
})();
