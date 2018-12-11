var Bouteille = function (scene, content) {
  var bouteille = this;
  var imgBouteille = new Image();
  var bitmapBouteille;
  var estCharger = false;
  bouteille.height = 20;
  bouteille.width = 20;

  function initialiser() {

    imgBouteille.src = "images/beer.png";
    imgBouteille.onload = terminerChargement;
  }

  function terminerChargement() {
    bitmapBouteille = new createjs.Bitmap(imgBouteille);
    scale = (0.2 * content.offsetWidth) / 1920;
    bitmapBouteille.scaleX = scale;
    bitmapBouteille.scaleY = scale;
    //bitmapBouteille.scaleX = (0.2 * content.offsetWidth) / 1920;
    //bitmapBouteille.scaleY = (0.05 * content.offsetHeight) / 938;
    console.log("scaleX: " + bitmapBouteille.scaleX + " scaleY: " + bitmapBouteille.scaleY);
    bouteille.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapBouteille);
    bouteille.repositionnerBouteille();
    estCharger = true;

  }
  this.isCharger = function(){
    return estCharger;
  }
  this.mouvementBouteille = function (vitesseRoute) {
    bitmapBouteille.y -= vitesseRoute;

    //Si l'objet sort de la map on le repositionne
    if (bitmapBouteille.y == -200) {
      setTimeout(this.repositionnerBouteille, getNombreHazard(0,3));
    }
  }

  this.repositionnerBouteille = function () {
    bitmapBouteille.y = content.offsetHeight;
    bitmapBouteille.x = getNombreHazard(10, content.offsetWidth);
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.getCollision = function () {
    bitmapBouteille.setBounds(bitmapBouteille.x, bitmapBouteille.y, bouteille.width, bouteille.height);
    return bitmapBouteille.getBounds();
  }


  initialiser();
}
