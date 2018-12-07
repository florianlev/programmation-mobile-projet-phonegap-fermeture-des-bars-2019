var Obstacle = function(scene,content,envoyerObstacleCharger){

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
    bitmapObstacle.x = 400
    bitmapObstacle.y = content.offsetHeight;
    envoyerObstacleCharger();
  }

  this.mouvementObstacle = function(){
    bitmapObstacle.y -= 1;

    //Si l'objet sort de la map on le repositionne
    if(bitmapObstacle.y == -200){
      repositionnerObstacle();
    }
  }

  function repositionnerObstacle(){
    bitmapObstacle.y = content.offsetHeight;
  }


  initialiser();

}
