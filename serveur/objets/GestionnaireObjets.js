var GestionnaireObjets = function (eventEmiter) {
  Bouteille = require('./Bouteille.js');
  Obstacle = require('./Obstacle.js');
  Voiture = require('./Voiture.js');
  require('./../JEU.js');
  var listeBouteilles = new Array();
  var listeVoiture = new Array();
  var listeObstacle = new Array();

  var iterateurVerification = 0;
  //vitesse du jeu

  function initialiser() {//initialise les objets un par un avec un delais entre chaqun pour ne pas qu'ils arrive tous en meme temps

    isListeBouteilleCharger = false;
    disperseurObstacle = 1;

    for (iObstacles = 0; iObstacles < global.JEU.NOMBRE_OBSTACLE; iObstacles++) {
      listeObstacle.push(new Obstacle(iObstacles, eventEmiter));
      listeObstacle[iObstacles].setDelaiAffichage(getNombreHazard(1000,3000));
      listeObstacle[iObstacles].setDebutInterval(Date.now());
    }

    for (iBouteilles = 0; iBouteilles < global.JEU.NOMBRE_BOUTEILLE; iBouteilles++) {
      listeBouteilles.push(new Bouteille(iBouteilles, eventEmiter));
      listeBouteilles[iBouteilles].setDelaiAffichage(getNombreHazard(1000,3000));
      listeBouteilles[iBouteilles].setDebutInterval(Date.now());
    }

    for (iVoitures = 0; iVoitures < global.JEU.NOMBRE_VOITURE; iVoitures++) {
      listeVoiture.push(new Voiture(iVoitures, eventEmiter));
      listeVoiture[iVoitures].setDelaiAffichage(getNombreHazard(1000,3000));
      listeVoiture[iVoitures].setDebutInterval(Date.now());

    }
  }

  this.deplacerLesObjets = function (vitesse) {
    deplacerObjets(listeBouteilles, vitesse);
    deplacerObjets(listeObstacle, vitesse);
    deplacerVoiture(listeVoiture, vitesse);
  }

  //deplace les objets contenu dans l'array(bouteille et obstacles)
  function deplacerObjets(listeObjets, vitesse) {
    for (iObjets = 0; iObjets < listeObjets.length; iObjets++) {
      listeObjets[iObjets].mouvement(vitesse);
    }
  }
  function deplacerVoiture(listeVehicule, vitesse) {
    for (iVehicule = 0; iVehicule < listeVehicule.length; iVehicule++) {
      listeVehicule[iVehicule].mouvementVoiture(vitesse * global.JEU.VITESSE_VOITURE);
    }
  }

  function repositionnerBouteille(idBouteille) {
    position = listeBouteilles[idBouteille].repositionnerBouteille();
    eventEmiter.emit('repositionner_objet','bouteille', idBouteille, position);
  }

  function repositionnerObstacle (idObstacle) {
    //console.log("repositionnerObstacle : " + idObstacle);
    position = listeObstacle[idObstacle].repositionnerObstacle();
    eventEmiter.emit('repositionner_objet','obstacle', idObstacle, position);
  }

  function repositionnerVoiture(idVoiture) {
    //console.log("repositionnerObstacle : " + idVoiture);
    position = listeVoiture[idVoiture].repositionnerVoiture();
    eventEmiter.emit('repositionner_objet','voiture', idVoiture, position);
  }

  this.repositionnerObjets = function(classe,nouvelInterval){

    switch (classe.name){
      case Bouteille.name:
        listeObjets = listeBouteilles;
        action = repositionnerBouteille;
        break;
      case Obstacle.name:
        action = repositionnerObstacle;
        listeObjets = listeObstacle;
        break;
      case Voiture.name:
        action = repositionnerVoiture;
        listeObjets = listeVoiture;
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
    listeBouteilles[idBouteille].setDelaiAffichage(delai);
    listeBouteilles[idBouteille].setDebutInterval(Date.now());
  }

  this.afficherObstacleDansLeTemps = function (idObstacle, delai) {
    //console.log("afficherObstacleDansLeTemps" + idObstacle);
    listeObstacle[idObstacle].setDelaiAffichage(delai);
    listeObstacle[idObstacle].setDebutInterval(Date.now());
  }

  this.afficherVoitureDansLeTemps = function (idVoiture, delai) {
    //console.log("afficherObstacleDansLeTemps" + idVoiture);
    listeVoiture[idVoiture].setDelaiAffichage(delai);
    listeVoiture[idVoiture].setDebutInterval(Date.now());
  }

  this.getListeBouteilles = function () {
    return listeBouteilles;
  }

  this.getListeObstacles = function () {
    return listeObstacle;
  }

  this.getListeVoiture = function () {
    return listeVoiture;
  }

  this.detruire = function()
{
  for (iObstacles = 0; iObstacles < listeObstacle.length; iObstacles++) {
    listeObstacle[iObstacles] = null;

  }
  for (iBouteilles = 0; iBouteilles < global.JEU.NOMBRE_BOUTEILLE; iBouteilles++) {
    listeBouteilles[iBouteilles] = null;
  }

  for (iVoitures = 0; iVoitures < global.JEU.NOMBRE_VOITURE; iVoitures++) {
    listeVoiture[iVoitures] = null;
  }
}
function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
}
  initialiser();
}
module.exports = GestionnaireObjets;
