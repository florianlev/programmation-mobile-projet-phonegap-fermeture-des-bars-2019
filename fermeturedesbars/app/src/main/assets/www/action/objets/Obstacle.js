var Obstacle = function(scene){

  var obstacle = this;
  var imgObstacle = new Image();
  var bitmapObstacle;

  function initialiser(){
    imgObstacle.src = "../images/cone.png"
    imgObstacle.onload = terminerChargement;

  }

  function terminerChargement()
  {
    bitmapObstacle = new createjs.Bitmap(imgObstacle);
    bitmapObstacle.scaleX = 0.05;
    bitmapObstacle.scaleY = 0.05;
    obstacle.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapBouteille);
    bitmapBouteille.x = 400;
    bitmapBouteille.y = 300;
  }


  initialiser();
}
