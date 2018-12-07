var Bouteille = function(scene,content,envoyerBouteilleCharger){
  var bouteille = this;
  var imgBouteille = new Image();
  var bitmapBouteille;
  function initialiser(){
    
    imgBouteille.src = "images/beer.png";
    imgBouteille.onload = terminerChargement;
  }

  function terminerChargement()
  {
    bitmapBouteille = new createjs.Bitmap(imgBouteille);
    bitmapBouteille.scaleX = 0.05;
    bitmapBouteille.scaleY = 0.05;
    bouteille.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapBouteille);
    repositionnerBouteille();
    envoyerBouteilleCharger();

  }

  this.mouvementBouteille = function(vitesseRoute){
    bitmapBouteille.y -= vitesseRoute;

    //Si l'objet sort de la map on le repositionne
    if(bitmapBouteille.y == -200){
      repositionnerBouteille();
    }
  }

  function repositionnerBouteille(){
    bitmapBouteille.y = content.offsetHeight;
    bitmapBouteille.x = getNombreHazard(10,content.offsetWidth);
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  initialiser();
}
