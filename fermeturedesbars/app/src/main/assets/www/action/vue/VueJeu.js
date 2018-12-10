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
  var niveauAlcool
  var score;
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
    createjs.Ticker.setInterval(1000/60);
    createjs.Ticker.setFPS(60);

    //Initilialisation de la route
    document.body.addEventListener("ROUTE_CHARGER", chargementObjets);
    document.body.addEventListener("PARTIE_TERMINER", fin);
    route = new Route(scene,content);
  }

  //Boucle de jeu
  function rafraichirJeu(evenement) {// tout mettre ce qui necesite un untervale ice et augmenter sa vitesse tout les x secondes avec n autre objets
    route.raffraichirMatrice(vitesseRoute);

    if (obstacleEstCharger) {
      obstacle.mouvementObstacle(vitesseObjetRoute);
    }
    if (bouteilleEstCharger) {
      bouteille.mouvementBouteille(vitesseObjetRoute);
      verificationCollisionnementJoueurBouteille();
    }
    niveauAlcool.diminution();
    scene.update(evenement);
  }

  function verificationCollisionnementJoueurBouteille(){
    if (joueur.rectangleCollisionJoueur().intersects(bouteille.rectangleCollisionBouteille())) {
        console.log("COLLISIONNEMENT ! ");
        bouteille.repositionnerBouteille();
        score.augmenterScore(10);
        niveauAlcool.ajouterNiveau(10);
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

  function chargementObjets(evenement) {//PROBLEME DE DUPICATION POUR TOUT CES ITEM SUR PC.... SEULEMENT SUR PC
    joueur = new Joueur(scene);
    hammer.on('pan', deplacement);
    //niveauAlcool =new NiveauAlcool(scene);
    bouteille = new Bouteille(scene, content, verifierBouteilleCharger);
    obstacle = new Obstacle(scene, content, verifierObstacleCharger);
    score = new Score(scene);
    niveauAlcool = new NiveauAlcool(scene);//LORSEQUE LA BARRE DU HAUT EST VIDE FIN DE PARTIE; ACOSE DE LA DUPLICATION
  }

  //CallBack pour verifier si l'obstacle est charger
  function verifierObstacleCharger() {
    obstacleEstCharger = true;
  }

  //CallBack pour verifier si la bouteille est charger
  function verifierBouteilleCharger() {
    bouteilleEstCharger = true;
  }
  this.getScore = function(){
    return score.getScore();
  }
  function fin(){
    window.location.hash = "fin-solo";
  }
  initialiser();
}
