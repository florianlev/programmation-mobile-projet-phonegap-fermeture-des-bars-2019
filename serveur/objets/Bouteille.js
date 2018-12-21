var Bouteille = function (idBouteille, eventEmiter) {
  var bouteille = this;
  var estCharger = false;
  bouteille.height = 20;
  bouteille.width = 20;
  bouteille.x = 0;
  bouteille.y = 0;
  var delaiAffichage;
  var enAttenteDeplacement = false;
  var debutInterval;
  require('./../JEU.js');
  function initialiser() {

    delaiAffichage = 0;

    debutInterval = 0;
  }

  this.afficher = function () {
    estCharger = true;
    return bouteille.repositionnerBouteille();
  }


  this.isCharger = function () {
    return estCharger;
  }
  this.mouvement = function (vitesseRoute) {
    //console.log("bougerBouteille");
      bouteille.y -= vitesseRoute;

      //Si l'objet sort de la map on le repositionne


      if (bouteille.y <= -200 && !enAttenteDeplacement) {
        enAttenteDeplacement = true;
        //document.body.dispatchEvent(new CustomEvent("bouteillesortieecran", { detail : {idBouteille: bouteille.getId() } }));
        eventEmiter.emit("bouteille_sortie_ecran", bouteille.getId());
    }
  }

  this.repositionnerBouteille = function () {
    limiteXDoite = global.JEU.WIDTH * 0.7;
    limiteXGauche = global.JEU.WIDTH * 0.2;
    bouteille.y = global.JEU.HEIGHT + 50 + getNombreHazard(0,800);
    bouteille.x = getNombreHazard(limiteXGauche, limiteXDoite);
    enAttenteDeplacement = false;
    ratio = {'x':bouteille.x/global.JEU.WIDTH, 'y':bouteille.y/global.JEU.HEIGHT }
    return ratio; // retourne des  ratio de position qui peuveut etre utiliser du coter client
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.getId = function(){
    return idBouteille;
  }
  this.isEnAttenteDeplacment = function () {
    return enAttenteDeplacement;
  }
  this.setEnAttenteDeplacement = function (attente) {
    enAttenteDeplacement = attente;
    bouteille.x = -200;
  }

  this.setDelaiAffichage = function (nouveauDelaiAffichage) {
    delaiAffichage = nouveauDelaiAffichage;
  }

  this.getDelaiAffichage = function () {
    return delaiAffichage;
  }

  this.setDebutInterval= function(intervalBouteille){
    debutInterval = intervalBouteille;
  }

  this.getDebutInterval= function(){
    return debutInterval;
  }


  initialiser();
}
module.exports = Bouteille;
