var VueJeu = function () {
  var vueJeu = this;
  var contenuPage;
  var canvas;
  var content;
  var scene;
  var route;
  var hammer;
  var joueur;
  var obstacleEstCharger = false;
  var bouteilleEstCharger = false;

  //vitesse du jeu 
  var vitesseObjetRoute = 1;
  var vitesseRoute = -1;

  function initialiser() {
    //Affichage de la vue jeu
    contenuPage = document.getElementById("jeu").innerHTML;
  }

  this.afficher = function () {
    hammer = new Hammer(document.body);
    //Initialisaton du canvas
    document.body.innerHTML = contenuPage;
    canvas = document.getElementById("dessin");
    arrangerCanvas();

    //Initialisation scene createJs
    scene = new createjs.Stage(canvas);

    //Inistialisation du rafraichissement du jeu
    createjs.Ticker.addEventListener("tick", rafraichirJeu);
    createjs.Ticker.setInterval(2);
    createjs.Ticker.setFPS(60);

    //Initilialisation de la route
    document.body.addEventListener("ROUTE_CHARGER", chargementObjets);
    route = new Route(scene);
  }

  //Boucle de jeu
  function rafraichirJeu(evenement) {
    route.raffraichirMatrice(vitesseRoute);

    if (obstacleEstCharger) {
      obstacle.mouvementObstacle(vitesseObjetRoute);
    }
    if (bouteilleEstCharger) {
      bouteille.mouvementBouteille(vitesseObjetRoute);
      verificationCollisionnementJoueurBouteille();
    }

    scene.update(evenement);
  }

  function verificationCollisionnementJoueurBouteille(){
    if (joueur.rectangleCollisionJoueur().intersects(bouteille.rectangleCollisionBouteille())) {
        console.log("COLLISIONNEMENT ! ");
        bouteille.repositionnerBouteille();
        score.augmenterScore(10);
        //RAJOUTER ICI L'AUGMENTATION DU SCORE
    }
  }

  function arrangerCanvas() {
    content = document.getElementById("content");

    if (canvas.width < content.offsetWidth) {

      canvas.width = content.offsetWidth;
    }

    if (canvas.height < content.offsetHeight) {
      canvas.height = content.offsetHeight;
    }
  }
  function deplacement(evenement) {
    joueur.setPosition(evenement.center.x, evenement.center.y);
  }

  function chargementObjets(evenement) {
    joueur = new Joueur(scene);
    hammer.on('pan', deplacement);
    //niveauAlcool =new NiveauAlcool(scene);
    bouteille = new Bouteille(scene, content, verifierBouteilleCharger);
    obstacle = new Obstacle(scene, content, verifierObstacleCharger);
    score = new Score(scene);
  }

  //CallBack pour verifier si l'obstacle est charger
  function verifierObstacleCharger() {
    obstacleEstCharger = true;
  }

  //CallBack pour verifier si la bouteille est charger
  function verifierBouteilleCharger() {
    bouteilleEstCharger = true;
  }

  initialiser();
}
