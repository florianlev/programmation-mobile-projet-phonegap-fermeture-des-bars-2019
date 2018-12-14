var VueJeu = function () {
  var vueJeu = this;
  var contenuPage;
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
  var parteTerminer;
  var vitesseRoute;
  var etatCourantJoueur;
  var vitesseJeu;
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
    createjs.Ticker.setInterval(1000 / 60);
    createjs.Ticker.setFPS(60);

    //Event PartieTerminer et RouteCharger
    document.body.addEventListener("ROUTE_CHARGER", chargementObjets);
    document.body.addEventListener("PARTIE_TERMINER", fin);

    //Initilialisation de la route et des variables
    route = new Route(scene, content);
    vitesseJeu = 3;
    accelerationJeu = 0;
    parteTerminer = false
    vitesseRoute = vitesseJeu*-1;
  }
  function boucleJeu(){// tout mettre ce qui necesite un untervale ice et augmenter sa vitesse tout les x secondes avec n autre objets
    gestionnaireObjets.verification();
    niveauAlcool.diminution();
    route.raffraichirMatrice(vitesseRoute);
    if(!parteTerminer){
      setTimeout(boucleJeu, 20-accelerationJeu);
    }
    //console.log(accelerationJeu);
  }
  //Boucle de jeu
  function rafraichirJeu(evenement) {
    if( accelerationJeu < 21)
      accelerationJeu += 0.02;
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

  function deplacement(evenement) {
    joueur.setPosition(evenement.center.x, evenement.center.y);
  }

  function chargementObjets(evenement) {//PROBLEME DE DUPICATION POUR TOUT CES ITEM SUR PC.... SEULEMENT SUR PC
    joueur = new Joueur(scene, content);
    hammer.on('pan', deplacement);
    //niveauAlcool =new NiveauAlcool(scene);

    //TO DO  : POUR TOUT CES OBSTACLES ESSAYER DE VOIR POOUR UN SYSTEME DAPPARITION RANDOM de 1 OU PLUSIEURS FOIS LE MEME OBSTACLE
    score = new Score(scene);
    niveauAlcool = new NiveauAlcool(scene, joueur);//LORSEQUE LA BARRE DU HAUT EST VIDE FIN DE PARTIE; ACOSE DE LA DUPLICATION
    gestionnaireObjets = new GestionnaireObjets(scene, content, joueur, niveauAlcool, score, vitesseJeu);
    setTimeout(boucleJeu, 60*accelerationJeu);
  }


  //Stopper le ticker de la boucle de jeu
  function stopperJeu() {
    createjs.Ticker.off("tick", rafraichirJeu);
    scene.clear();
  }

  this.getScore = function () {
    return score.getScore();
  }

  function fin(evenement) {
    if(!parteTerminer){
      parteTerminer = true;
      console.log("fin");
      setTimeout(function() {
        stopperJeu();
        window.location.hash = "fin-solo";
    }, 5000);
    }
  }

  function attente(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  initialiser();
}
