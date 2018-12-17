var GestionnaireObjets = function (scene, content, joueur, niveauAlcool, score) {


  var bouteilles = new Array();
  var voitures = new Array();
  var obstacles = new Array();

  var iterateurVerification = 0;
  //vitesse du jeu

  function initialiser() {//initialise les objets un par un avec un delais entre chaqun pour ne pas qu'ils arrive tous en meme temps

    isListeBouteilleCharger = false;
    disperseurObstacle = 1;

    for (iObstacles = 0; iObstacles < MONDE.NOMBRE_OBSTACLE; iObstacles++) {
      obstacles.push(new Obstacle(scene, content, iObstacles));
    }

    for (iBouteilles = 0; iBouteilles < MONDE.NOMBRE_BOUTEILLE; iBouteilles++) {
      bouteilles.push(new Bouteille(scene, content, iBouteilles));
    }

    for (iVoitures = 0; iVoitures < MONDE.NOMBRE_VOITURE; iVoitures++) {

      voitures.push(new Voiture(scene, content, iVoitures));

    }
  }

  this.deplacerLesObjets = function (vitesse) {
    deplacerObjets(bouteilles, vitesse);
    deplacerObjets(obstacles, vitesse);
    deplacerVoiture(voitures, vitesse);
  }

  this.testerCollision = function () {

    switch (iterateurVerification) {//verifie les 3 type d'objets mais il alterne pour reduire la charge a chaque interval
      case 0:
        for (iObstacles = 0; iObstacles < obstacles.length; iObstacles++) {
          if (obstacles[iObstacles] && !obstacles[iObstacles].isEnAttenteDeplacment()) {
            testerCollisionObjet(obstacles[iObstacles]);
          }
        }
        iterateurVerification++;
        break;
      case 1:
        for (iBouteilles = 0; iBouteilles < bouteilles.length; iBouteilles++) {
          if (bouteilles[iBouteilles] && !bouteilles[iBouteilles].isEnAttenteDeplacment()) {
            testerCollisionBouteille(bouteilles[iBouteilles]);
          }
        }
        iterateurVerification++;
        break;
      case 2:
        for (iVoitures = 0; iVoitures < voitures.length; iVoitures++) {
          if (voitures[iVoitures] && !voitures[iVoitures].isEnAttenteDeplacment()) {
            testerCollisionObjet(voitures[iVoitures]);
          }
        }
        iterateurVerification = 0;
        break;
    }
  }

  //Verification de la collision avec le joueur et la voiture
  function testerCollisionObjet(objet) {
    rectangleCollision = objet.getRectangleCollision();
    if (rectangleCollision) {
      if (joueur.getRectangleCollision().intersects(objet.getRectangleCollision(rectangleCollision))) {
        //console.log("COLLISIONNEMENT ! ");
        joueur.setEtatJoueurEcraser();
        document.body.dispatchEvent(new CustomEvent("collisionavecobjet"));
      }
    }
  }

  function testerCollisionBouteille(bouteille) {
    rectangleCollision = bouteille.getRectangleCollision();
    if (rectangleCollision && !bouteille.isEnAttenteDeplacment()) {
      if (joueur.getRectangleCollision().intersects(rectangleCollision)) {
        bouteille.setEnAttenteDeplacement(true);
        document.body.dispatchEvent(new CustomEvent("collisionavecbouteille", { detail: { idBouteille: bouteille.getId() } }));
      }
    }
  }
  //deplace les objets contenu dans l'array(bouteille et obstacles)
  function deplacerObjets(objets, vitesse) {
    for (iObjets = 0; iObjets < objets.length; iObjets++) {
      objets[iObjets].mouvement(vitesse);
    }
  }
  function deplacerVoiture(vehicule, vitesse) {
    for (iVehicule = 0; iVehicule < vehicule.length; iVehicule++) {
      vehicule[iVehicule].mouvementVoiture(vitesse * MONDE.VITESSE_VOITURE);
    }
  }
  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.repositionnerBouteille = function (idBouteille) {
    bouteilles[idBouteille].repositionnerBouteille();
  }

  this.repositionnerObstacle = function (idObstacle) {
    console.log("repositionnerObstacle : " + idObstacle);
    obstacles[idObstacle].repositionnerObstacle();
  }

  this.repositionnerVoiture = function (idVoiture) {
    console.log("repositionnerObstacle : " + idVoiture);
    voitures[idVoiture].repositionnerVoiture();
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
    console.log("afficherObstacleDansLeTemps" + idVoiture);
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

  initialiser();
}
