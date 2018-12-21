var GestionnaireObjets = function (eventEmiter) {
  Bouteille = require('./Bouteille.js');
  Obstacle = require('./Obstacle.js');
  Voiture = require('./Voiture.js');
  require('./../JEU.js');
  var bouteilles = new Array();
  var voitures = new Array();
  var obstacles = new Array();

  var iterateurVerification = 0;
  //vitesse du jeu

  function initialiser() {//initialise les objets un par un avec un delais entre chaqun pour ne pas qu'ils arrive tous en meme temps

    isListeBouteilleCharger = false;
    disperseurObstacle = 1;

    for (iObstacles = 0; iObstacles < global.JEU.NOMBRE_OBSTACLE; iObstacles++) {
      obstacles.push(new Obstacle(iObstacles, eventEmiter));
      obstacles[iObstacles].setDelaiAffichage(getNombreHazard(1000,3000));
      obstacles[iObstacles].setDebutInterval(Date.now());
    }

    for (iBouteilles = 0; iBouteilles < global.JEU.NOMBRE_BOUTEILLE; iBouteilles++) {
      bouteilles.push(new Bouteille(iBouteilles, eventEmiter));
      bouteilles[iBouteilles].setDelaiAffichage(getNombreHazard(1000,3000));
      bouteilles[iBouteilles].setDebutInterval(Date.now());
    }

    for (iVoitures = 0; iVoitures < global.JEU.NOMBRE_VOITURE; iVoitures++) {
      voitures.push(new Voiture(iVoitures, eventEmiter));
      voitures[iVoitures].setDelaiAffichage(getNombreHazard(1000,3000));
      voitures[iVoitures].setDebutInterval(Date.now());

    }
  }

  this.deplacerLesObjets = function (vitesse) {
    deplacerObjets(bouteilles, vitesse);
    deplacerObjets(obstacles, vitesse);
    deplacerVoiture(voitures, vitesse);
  }

  //deplace les objets contenu dans l'array(bouteille et obstacles)
  function deplacerObjets(objets, vitesse) {
    for (iObjets = 0; iObjets < objets.length; iObjets++) {
      objets[iObjets].mouvement(vitesse);
    }
  }
  function deplacerVoiture(vehicule, vitesse) {
    for (iVehicule = 0; iVehicule < vehicule.length; iVehicule++) {
      vehicule[iVehicule].mouvementVoiture(vitesse * global.JEU.VITESSE_VOITURE);
    }
  }

  function repositionnerBouteille(idBouteille) {
    position = bouteilles[idBouteille].repositionnerBouteille();
    eventEmiter.emit('repositionner_objet','bouteille', idBouteille, position);
  }

  function repositionnerObstacle (idObstacle) {
    //console.log("repositionnerObstacle : " + idObstacle);
    position = obstacles[idObstacle].repositionnerObstacle();
    eventEmiter.emit('repositionner_objet','obstacle', idObstacle, position);
  }

  function repositionnerVoiture(idVoiture) {
    //console.log("repositionnerObstacle : " + idVoiture);
    position = voitures[idVoiture].repositionnerVoiture();
    eventEmiter.emit('repositionner_objet','voiture', idVoiture, position);
  }

  this.repositionnerObjets = function(classe,nouvelInterval){

    switch (classe.name){
      case Bouteille.name:
        listeObjets = bouteilles;
        action = repositionnerBouteille;
        break;
      case Obstacle.name:
        action = repositionnerObstacle;
        listeObjets = obstacles;
        break;
      case Voiture.name:
        action = repositionnerVoiture;
        listeObjets = voitures;
        break;
    }

    for (indiceListeObjets = 0; indiceListeObjets < listeObjets.length; indiceListeObjets++) {
      var delaiAffichage = listeObjets[indiceListeObjets].getDelaiAffichage();
      if (delaiAffichage) {
        if (nouvelInterval - listeObjets[indiceListeObjets].getDebutInterval() >= delaiAffichage) {
          action(indiceListeObjets);
          //console.log('repositionnemment ' + classe.name)
          listeObjets[indiceListeObjets].setDelaiAffichage(0);
          listeObjets[indiceListeObjets].setDebutInterval(0);
        }
      }
    }
  }


  this.afficherBouteilleDansLeTemps = function (idBouteille, delai) {
    bouteilles[idBouteille].setDelaiAffichage(delai);
    bouteilles[idBouteille].setDebutInterval(Date.now());
  }

  this.afficherObstacleDansLeTemps = function (idObstacle, delai) {
    //console.log("afficherObstacleDansLeTemps" + idObstacle);
    obstacles[idObstacle].setDelaiAffichage(delai);
    obstacles[idObstacle].setDebutInterval(Date.now());
  }

  this.afficherVoitureDansLeTemps = function (idVoiture, delai) {
    //console.log("afficherObstacleDansLeTemps" + idVoiture);
    voitures[idVoiture].setDelaiAffichage(delai);
    voitures[idVoiture].setDebutInterval(Date.now());
  }

  this.getListeBouteilles = function () {
    return bouteilles;
  }

  this.getListeObstacles = function () {
    return obstacles;
  }

  this.getListeVoiture = function () {
    return voitures;
  }

  this.detruire = function()
{
  for (iObstacles = 0; iObstacles < obstacles.length; iObstacles++) {
    obstacles[iObstacles] = null;

  }
  for (iBouteilles = 0; iBouteilles < global.JEU.NOMBRE_BOUTEILLE; iBouteilles++) {
    bouteilles[iBouteilles] = null;
  }

  for (iVoitures = 0; iVoitures < global.JEU.NOMBRE_VOITURE; iVoitures++) {
    voitures[iVoitures] = null;
  }
}
function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
}
  initialiser();
}
module.exports = GestionnaireObjets;
