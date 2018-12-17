var Obstacle = function (scene, content, idObstacle) {

  var obstacle = this;
  var imgObstacle = new Image();
  var bitmapObstacle;
  obstacle.height = 20;
  obstacle.width = 20;
  var estCharger = false;


  var enAttenteDeplacement = false;


  var delaiAffichage;
  var debutInterval;

  //possibiliter d'utiliser un manager d'objet pour socuper de la gestion de tout les objets
  function initialiser() {

    //TO DO : Tableau avec plusieurs images.
    imgObstacle.src = "images/cone.png"
    imgObstacle.onload = terminerChargement;

    delaiAffichage = 0;
    debutInterval = 0;


  }

  function terminerChargement() {
    bitmapObstacle = new createjs.Bitmap(imgObstacle);
    scale = (0.8 * content.offsetWidth) / 1920;
    bitmapObstacle.scaleX = scale;
    bitmapObstacle.scaleY = scale;
    //bitmapObstacle.scaleX = (0.8 * content.offsetWidth) / 1920;
    //bitmapObstacle.scaleY = (0.3 * content.offsetHeight) / 938;

    document.body.dispatchEvent(new CustomEvent("obstaclecharger"));
    obstacle.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapObstacle);
    obstacle.repositionnerObstacle();
    estCharger = true;

  }

  this.isCharger = function () {
    return estCharger;
  }

  this.mouvement = function (vitesseRoute) {
    //console.log("bougerObstacle");

    if (bitmapObstacle) {
      bitmapObstacle.y -= vitesseRoute;
      //Si l'objet sort de la map on le repositionne

      if (bitmapObstacle.y <= -200 && !enAttenteDeplacement) {
        enAttenteDeplacement = true;
        console.log("idObstacle" + idObstacle);
        document.body.dispatchEvent(new CustomEvent("obstaclesortieecran", { detail: { idObstacle: obstacle.getId() } }));

      }
    }
  }

  this.repositionnerObstacle = function() {
    limiteXDoite = content.offsetWidth * 0.7;
    limiteXGauche = content.offsetWidth * 0.2;
    bitmapObstacle.y = content.offsetHeight + 50  + getNombreHazard(0,800);
    bitmapObstacle.x = getNombreHazard(limiteXGauche, limiteXDoite);
    enAttenteDeplacement = false;

  }

  this.getRectangleCollision = function () {
    if (bitmapObstacle) {
      bitmapObstacle.setBounds(bitmapObstacle.x + 10, bitmapObstacle.y + 10, obstacle.width - 20, obstacle.height - 20);
      return bitmapObstacle.getBounds();
    } else {
      return null;
    }
  }

  this.getId = function () {
    return idObstacle;
  }

  this.isEnAttenteDeplacment = function () {
    return enAttenteDeplacement;
  }
  this.setEnAttenteDeplacement = function (attente) {
    enAttenteDeplacement = attente;
    bitmapObstacle.x = -200;
  }

  this.setDelaiAffichage = function (nouveauDelaiAffichage) {
    delaiAffichage = nouveauDelaiAffichage;
  }

  this.getDelaiAffichage = function () {
    return delaiAffichage;
  }

  this.setDebutInterval= function(intervalObstacle){
    debutInterval = intervalObstacle;
  }

  this.getDebutInterval= function(){
    return debutInterval;
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  initialiser();

}
