var VueJeu = function(){
  var contenuPage;
  var canvas;
  var scene;
  var route;

  function initialiser(){
    //Affichage de la vue jeu
    contenuPage = document.getElementById("jeu").innerHTML;

  }
  this.afficher = function(){
    //Initialisaton du canvas
    document.body.innerHTML = contenuPage;
    canvas = document.getElementById('dessin');
    contexte = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Initialisation scene createJs
    scene = new createjs.Stage(canvas);
    
    //Inistialisation du rafraichissement du jeu
    createjs.Ticker.addEventListener("tick", rafraichirJeu);
    createjs.Ticker.setInterval(25);
    createjs.Ticker.setFPS(50);
    
    //Initilialisation de la route
    route = new Route(scene);
    
  }

  function rafraichirJeu(evenement){
    scene.update(evenement);
  }

  initialiser();
}
