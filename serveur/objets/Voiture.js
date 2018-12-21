var Voiture = function ( idVoiture, eventEmiter) {

  var voiture = this;
  voiture.height = 20;
  voiture.width = 20;
  voiture.y = 0;
  voiture.x = 0;
  require('./../JEU.js');
  var enAttenteDeplacement = false;
  var delaiAffichage;
  var debutInterval;


  function initialiser() {
    delaiAffichage = 0;
    debutInterval = 0;
  }

  this.afficher = function () {
    estCharger = true;
    return voiture.repositionnerVoiture();

  }
  this.isCharger = function () {
    return estCharger;
  }

  this.mouvementVoiture = function (vitesseRoute) {
      voiture.y -= vitesseRoute * 3;

      //Si l'objet sort de la map on le repositionne
      if (voiture.y < -50 && !enAttenteDeplacement) {
        enAttenteDeplacement = true;
        //console.log("voiture out");
        //document.body.dispatchEvent(new CustomEvent("voituresortieecran", { detail: { idVoiture: voiture.getId() } }));
        eventEmiter.emit("voiture_sortie_ecran", voiture.getId());
        //setTimeout(this.repositionnerVoiture, getNombreHazard(0,10000));
      }

  }

  this.repositionnerVoiture = function () {
    //console.log("repositionnerVoiture()"+ getNombreHazard(10, content.offsetWidth) + content.offsetHeight);
    limiteXDoite = global.JEU.WIDTH * 0.6;
    limiteXGauche = global.JEU.WIDTH * 0.3;
    voiture.y = global.JEU.HEIGHT + 50 + getNombreHazard(0, 800);
    voiture.x = getNombreHazard(limiteXDoite, limiteXGauche);
    enAttenteDeplacement = false;
    ratio = {'x':voiture.x/global.JEU.WIDTH, 'y':voiture.y/global.JEU.HEIGHT }
    return ratio; // retourne des  ratio de position qui peuveut etre utiliser du coter client
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.getId = function () {
    return idVoiture;
  }

  this.isEnAttenteDeplacment = function () {
    return enAttenteDeplacement;
  }

  this.setEnAttenteDeplacement = function (attente) {
    enAttenteDeplacement = attente;
    voiture.x = -200;
  }

  this.setDelaiAffichage = function (nouveauDelaiAffichage) {
    delaiAffichage = nouveauDelaiAffichage;
  }

  this.getDelaiAffichage = function () {
    return delaiAffichage;
  }

  this.setDebutInterval= function(intervalVoiture){
    debutInterval = intervalVoiture;
  }

  this.getDebutInterval= function(){
    return debutInterval;
  }

  initialiser();
}
module.exports = Voiture;
