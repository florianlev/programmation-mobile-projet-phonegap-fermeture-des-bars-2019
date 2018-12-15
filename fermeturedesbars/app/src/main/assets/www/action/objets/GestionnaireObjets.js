var GestionnaireObjets = function (scene, content, joueur, niveauAlcool, score) {


  var bouteilles = new Array();
  var voitures = new Array();
  var obstacles = new Array();

  var iterateurVerification = 0;
  //vitesse du jeu
  //var vitesseObjetRoute = MONDE.VITESSE_JEU * .4;//pourquoi 0.4 ?? c censer etre la meme chose que la route? non ?

  function initialiser() {//initialise les objets un par un avec un delais entre chaqun pour ne pas qu'ils arrive tous en meme temps

    isListeBouteilleCharger = false;
    disperseurObstacle = 1;

    for (iObstacles = 0; iObstacles < MONDE.NOMBRE_OBSTACLE; iObstacles++) {
      setTimeout(function () {
        obstacles.push(new Obstacle(scene, content));
      }, disperseurObstacle * 1700);
      disperseurObstacle++;
    }

    for (iBouteilles = 0; iBouteilles < MONDE.NOMBRE_BOUTEILLE; iBouteilles++) {
      /*setTimeout(function () {
        bouteilles.push(new Bouteille(scene, content, iBouteilles));
      }, getNombreHazard(0, 10000));*/

      bouteilles.push(new Bouteille(scene, content, iBouteilles));
    }


    for (iVoitures = 0; iVoitures < MONDE.NOMBRE_VOITURE; iVoitures++) {
      setTimeout(function () {
        voitures.push(new Voiture(scene, content));
      }, getNombreHazard(0, 10000));
    }
  }

  this.deplacerLesObjets = function (vitesse) {
    deplacerObjets(bouteilles,vitesse);
    deplacerObjets(obstacles,vitesse);
    deplacerVoiture(voitures,vitesse);
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

        //console.log("COLLISIONNEMENT ! ");

        /* setTimeout(bouteille.repositionnerBouteille , getNombreHazard(0,5000));  
        
 */
      }
    }
  }
  //deplace les objets contenu dans l'array(bouteille et obstacles)
  function deplacerObjets(objets,vitesse) {
    for (iObjets = 0; iObjets < objets.length; iObjets++) {
      objets[iObjets].mouvement(vitesse);
    }
  }
  function deplacerVoiture(vehicule,vitesse) {
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


  this.afficherBouteilleDansLeTemps = function (idBouteille, delai) {
    bouteilles[idBouteille].setDelaiAffichage(delai);
    bouteilles[idBouteille].setDebutInterval(Date.now());
  }

  this.getListeBouteilles = function () {
    return bouteilles;
  }




  initialiser();
}
