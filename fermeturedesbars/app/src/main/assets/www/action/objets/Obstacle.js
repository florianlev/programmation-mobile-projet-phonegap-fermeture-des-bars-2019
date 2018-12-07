var Obstacle = function(scene, recupererObstacleCharger){

  var obstacle = this;
  var imgObstacle = new Image();
  var bitmapObstacle;

  this.estCharger = false;

  function initialiser(){
    imgObstacle.src = "images/cone.png"
    imgObstacle.onload = terminerChargement;

  }

  function terminerChargement()
  {
    bitmapObstacle = new createjs.Bitmap(imgObstacle);
    bitmapObstacle.scaleX = 0.5;
    bitmapObstacle.scaleY = 0.5;
    obstacle.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapObstacle);
    bitmapObstacle.x = 400;
    bitmapObstacle.y = 300;
    recupererObstacleCharger();
  }

  this.mouvementObstacle = function(){
    bitmapObstacle.y -= 1;
  }


  initialiser();

}
