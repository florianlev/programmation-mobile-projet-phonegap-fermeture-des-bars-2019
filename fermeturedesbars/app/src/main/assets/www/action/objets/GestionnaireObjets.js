var GestionnaireObjets = function(scene, content, joueur, niveauAlcool, score, vitesseJeu){
  var bouteilles = new Array();
  var voitures = new Array();
  var obstacles = new Array();

  var iterateurVerification = 0;
  //vitesse du jeu
  var vitesseObjetRoute = vitesseJeu*.4;//pourquoi 0.4 ?? c censer etre la meme chose que la route? non ?
  var vitesseVoiture = vitesseJeu*1.5;

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
  }

  this.verification = function(){
    deplacerObjets(bouteilles);
    deplacerObjets(obstacles);
    deplacerVoiture(voitures);
    switch (iterateurVerification) {//verifie les 3 type d'objets mais il alterne pour reduire la charge a chaque interval
    case 0:
      for(iObstacles = 0; iObstacles < obstacles.length; iObstacles++){
        if (obstacles[iObstacles] && !obstacles[iObstacles].isEnAttenteDeplacment()) {
          verificationCollisionnementJoueurObjet(obstacles[iObstacles]);
        }
      }
      iterateurVerification++;
      break;
    case 1:
      for(iBouteilles = 0; iBouteilles < bouteilles.length; iBouteilles++){
        if (bouteilles[iBouteilles] && !bouteilles[iBouteilles].isEnAttenteDeplacment()) {
          verificationCollisionnementJoueurBouteille(bouteilles[iBouteilles]);
        }
      }
      iterateurVerification++;
      break;
    case 2:
      for(iVoitures = 0; iVoitures < voitures.length; iVoitures++){
        if (voitures[iVoitures] && !voitures[iVoitures].isEnAttenteDeplacment()) {
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
  //deplace les objets contenu dans l'array(bouteille et obstacles)
  function deplacerObjets(objets){
      for(iObjets = 0; iObjets < objets.length; iObjets++){
        objets[iObjets].mouvement(vitesseObjetRoute);
      }
  }
  function deplacerVoiture(vehicule){
      for(iVehicule = 0; iVehicule < vehicule.length; iVehicule++){
        vehicule[iVehicule].mouvementVoiture(vitesseVoiture);
      }
  }
  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }
  initialiser();
}
