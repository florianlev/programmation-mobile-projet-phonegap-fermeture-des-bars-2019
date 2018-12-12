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

  this.mouvementObstacle = function(vitesseRoute){
    if(bitmapObstacle){
      bitmapObstacle.y -= 1;

      //Si l'objet sort de la map on le repositionne
      if(bitmapObstacle.y == -200 && !enAttenteDeplacement){
        enAttenteDeplacement = true;
        setTimeout(repositionnerObstacle, getNombreHazard(0,3000));

      }
    }
  }

  function repositionnerObstacle(){
    limiteXDoite = content.offsetWidth * 0.7;
    limiteXGauche = content.offsetWidth * 0.2;
    bitmapObstacle.y = content.offsetHeight+50;
    bitmapObstacle.x = getNombreHazard(limiteXGauche,limiteXDoite);
    enAttenteDeplacement = false;
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }
  this.getCollision = function () {
    bitmapObstacle.setBounds(bitmapObstacle.x, bitmapObstacle.y, obstacle.width, obstacle.height);
    return bitmapObstacle.getBounds();
  }
  this.isEnAttenteDeplacment = function(){
    return enAttenteDeplacement;
  }
  initialiser();

}
