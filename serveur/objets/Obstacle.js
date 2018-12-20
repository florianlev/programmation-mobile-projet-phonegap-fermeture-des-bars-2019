var Obstacle = function (idObstacle) {

  var obstacle = this;
  var imgObstacle = new Image();
  var bitmapObstacle;
  obstacle.height = 20;
  obstacle.width = 20;
  obstacle.y = 0;
  obstacle.x = 0;
  var estCharger = false;


  var enAttenteDeplacement = false;


  var delaiAffichage;
  var debutInterval;

  //possibiliter d'utiliser un manager d'objet pour socuper de la gestion de tout les objets
  function initialiser() {


  }

  this.afficher = function () {
    obstacle.repositionnerObstacle();
    estCharger = true;

  }

  this.isCharger = function () {
    return estCharger;
  }

  this.mouvement = function (vitesseRoute) {
    //console.log("bougerObstacle");

      obstacle.y -= vitesseRoute;
      //Si l'objet sort de la map on le repositionne

      if (obstacle.y <= -200 && !enAttenteDeplacement) {
        enAttenteDeplacement = true;
        //console.log("idObstacle" + idObstacle);
        //document.body.dispatchEvent(new CustomEvent("obstaclesortieecran", { detail: { idObstacle: obstacle.getId() } }));

      }

  }

  this.repositionnerObstacle = function() {
    limiteXDoite = global.JEU.WIDTH * 0.7;
    limiteXGauche = global.JEU.WIDTH * 0.2;
    obstacle.y = global.JEU.HEIGHT + 50  + getNombreHazard(0,800);
    obstacle.x = getNombreHazard(limiteXGauche, limiteXDoite);
    enAttenteDeplacement = false;
    ratio = {'x':obstacle.x/global.JEU.WIDTH, 'y':obstacle.y/global.JEU.HEIGHT }
    return ratio;
  }

  this.getId = function () {
    return idObstacle;
  }

  this.isEnAttenteDeplacment = function () {
    return enAttenteDeplacement;
  }
  this.setEnAttenteDeplacement = function (attente) {
    enAttenteDeplacement = attente;
    obstacle.x = -200;
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
