var Obstacle = function(scene,content){

  var obstacle = this;
  var imgObstacle = new Image();
  var bitmapObstacle;
  obstacle.height = 20;
  obstacle.width = 20;
  var estCharger = false;
  var enAttenteDeplacement = false;
//possibiliter d'utiliser un manager d'objet pour socuper de la gestion de tout les objets
  function initialiser(){

    //TO DO : Tableau avec plusieurs images.
    imgObstacle.src = "images/cone.png"
    imgObstacle.onload = terminerChargement;

  }

  function terminerChargement()
  {
    bitmapObstacle = new createjs.Bitmap(imgObstacle);
    scale = (0.8 * content.offsetWidth) / 1920;
    bitmapObstacle.scaleX =scale;
    bitmapObstacle.scaleY =scale;
    //bitmapObstacle.scaleX = (0.8 * content.offsetWidth) / 1920;
    //bitmapObstacle.scaleY = (0.3 * content.offsetHeight) / 938;
    obstacle.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapObstacle);
    repositionnerObstacle();
    estCharger = true;

  }
  this.isCharger = function(){
    return estCharger;
  }

  this.mouvement = function(vitesseRoute){
    //console.log("bougerObstacle");
    if(bitmapObstacle  && !enAttenteDeplacement){
      bitmapObstacle.y -= vitesseRoute;
      //Si l'objet sort de la map on le repositionne
      if(bitmapObstacle.y <= -200){
        enAttenteDeplacement = true;
        console.log("timeout repositionnerObstacle");
        setTimeout(repositionnerObstacle, getNombreHazard(0,10000));

      }
    }
  }

  function repositionnerObstacle(){
    enAttenteDeplacement = false;
    limiteXDoite = content.offsetWidth * 0.7;
    limiteXGauche = content.offsetWidth * 0.2;
    bitmapObstacle.y = content.offsetHeight+50;
    bitmapObstacle.x = getNombreHazard(limiteXGauche,limiteXDoite);
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }
  this.getRectangleCollision = function () {
    if(bitmapObstacle){
      bitmapObstacle.setBounds(bitmapObstacle.x+10, bitmapObstacle.y+10, obstacle.width-20, obstacle.height-20);
      return bitmapObstacle.getBounds();
    }else{
      return null;
    }
  }
  this.isEnAttenteDeplacment = function(){
    return enAttenteDeplacement;
  }
  initialiser();

}
