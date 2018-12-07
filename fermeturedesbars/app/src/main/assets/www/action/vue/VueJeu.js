var VueJeu = function(){
  var vueJeu = this;
  var contenuPage;
  var canvas;
  var content;
  var scene;
  var route;
  var hammer;
  var joueur;
  var obstacleEstCharger = false;

  function initialiser(){
    //Affichage de la vue jeu
    contenuPage = document.getElementById("jeu").innerHTML;
  }

  this.afficher = function(){
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

  function rafraichirJeu(evenement){
    route.raffraichirMatrice();
    if(obstacleEstCharger){
      console.log(obstacleEstCharger);
      obstacle.mouvementObstacle();
    }
    scene.update(evenement);
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
  function deplacement(evenement){
    //console.log(evenement.center.x);
    //console.log(evenement.center.y);
    joueur.setPosition(evenement.center.x,evenement.center.y);
  }

  function chargementObjets(evenement){
    joueur = new Joueur(scene);
    hammer.on('pan', deplacement);
    niveauAlcool =new NiveauAlcool(scene);
    bouteille = new Bouteille(scene);
    obstacle = new Obstacle(scene,recupererObstacleCharger);
  }

  function recupererObstacleCharger(){
    obstacleEstCharger = true;
  }

  initialiser();
}
