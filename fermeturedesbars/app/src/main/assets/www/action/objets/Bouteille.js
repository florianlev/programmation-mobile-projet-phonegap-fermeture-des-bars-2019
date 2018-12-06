var Bouteille = function(scene){
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
    bitmapBouteille.x = 200;
    bitmapBouteille.y = 100;
  }
  
  initialiser();
}
