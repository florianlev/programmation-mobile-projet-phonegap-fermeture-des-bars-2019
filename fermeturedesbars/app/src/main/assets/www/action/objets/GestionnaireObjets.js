var GestionnaireObjets = function(scene, content, joueur, niveauAlcool, score){
  var bouteilles = new Array();
  var voitures = new Array();
  var obstacles = new Array();

  var iterateurVerification = 0;
  //vitesse du jeu
  var vitesseObjetRoute = 1;
  var vitesseRoute = -1;
  var vitesseVoiture = 3;

  var nombreBouteille = 3;
  var nombreObstacle = 5;
  var nombreVoiture = 5;

  function initialiser(){//initialise les objets un par un avec un delais entre chaqun pour ne pas qu'ils arrive tous en meme temps
    for(iObstacles = 0; iObstacles < nombreObstacle; iObstacles++){
      setTimeout(function(){
        obstacles.push(new Obstacle(scene, content));
      },getNombreHazard(0, 10000));
    }

    for(iBouteilles = 0; iBouteilles < nombreBouteille; iBouteilles++){
      setTimeout(function(){
        bouteilles.push(new Bouteille(scene, content));
      },getNombreHazard(0, 10000));
    }

    for(iVoitures = 0; iVoitures < nombreVoiture; iVoitures++){
      setTimeout(function(){
        voitures.push(new Voiture(scene, content));
      },getNombreHazard(0, 10000));
    }
    /*setTimeout(function() {
    bouteilles.push(new Bouteille(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    obstacles.push(new Obstacle(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    voitures.push(new Voiture(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    bouteilles.push(new Bouteille(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    voitures.push(new Voiture(scene, content));
    }, getNombreHazard(0, 3000));
    setTimeout(function() {
    obstacles.push(new Obstacle(scene, content));
  }, getNombreHazard(0, 3000));*/
  }
  this.verification = function(){
    switch (iterateurVerification) {//verifie les 3 type d'objets mais il alterne pour reduire la charge a chaque interval
    case 0:
      for(iObstacles = 0; iObstacles < obstacles.length; iObstacles++){
        if (obstacles[iObstacles] && !obstacles[iObstacles].isEnAttenteDeplacment()) {
          obstacles[iObstacles].mouvementObstacle(vitesseObjetRoute);
          verificationCollisionnementJoueurObjet(obstacles[iObstacles]);
        }
      }
      iterateurVerification++;
      break;
    case 1:
      for(iBouteilles = 0; iBouteilles < bouteilles.length; iBouteilles++){
        if (bouteilles[iBouteilles] && !bouteilles[iBouteilles].isEnAttenteDeplacment()) {
          bouteilles[iBouteilles].mouvementBouteille(vitesseObjetRoute);
          verificationCollisionnementJoueurBouteille(bouteilles[iBouteilles]);
        }
      }
      iterateurVerification++;
      break;
    case 2:
      for(iVoitures = 0; iVoitures < voitures.length; iVoitures++){
        if (voitures[iVoitures] && !voitures[iVoitures].isEnAttenteDeplacment()) {
          voitures[iVoitures].mouvementVoiture(vitesseVoiture);
          verificationCollisionnementJoueurObjet(voitures[iVoitures]);
        }
      }
      iterateurVerification = 0;
      break;
    }
  }
  //Verification de la collision avec le joueur et la voiture
  function verificationCollisionnementJoueurObjet(objet) {
    collision = objet.getCollision();
    if(collision){
      if (joueur.rectangleCollisionJoueur().intersects(objet.getCollision(collision))) {
        //console.log("COLLISIONNEMENT ! ");
        joueur.setEtatJoueurEcraser();
        document.body.dispatchEvent(new CustomEvent("PARTIE_TERMINER"));
      }
    }
  }

  function verificationCollisionnementJoueurBouteille(bouteille) {
    collision = bouteille.getCollision();
    if(collision && !bouteille.isEnAttenteDeplacment()){
      if (joueur.rectangleCollisionJoueur().intersects(collision)) {
        bouteille.setEnAttenteDeplacement(true);
        //console.log("COLLISIONNEMENT ! ");
        console.log("hit, setTimeout");

        setTimeout(bouteille.repositionnerBouteille , getNombreHazard(0,5000));
        score.augmenterScore(10);
        niveauAlcool.ajouterNiveau(10);
      }
    }
  }
  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }
  initialiser();
}
