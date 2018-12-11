var GestionnaireObjets = function(scene, content, joueur, niveauAlcool, score){
  var bouteilles = new Array();
  var voitures = new Array();
  var obstacles = new Array();
  var EtatJoueur = {
    enMarche: "enMarche",
    estEcraser: "estEcraser",
    estEnVomissement: "estEnVomissement"
  }

  //vitesse du jeu
  var vitesseObjetRoute = 1;
  var vitesseRoute = -1;
  var vitesseVoiture = 3;

  function initialiser(){
    bouteilles.push(new Bouteille(scene, content));
    bouteilles.push(new Bouteille(scene, content));

    voitures.push(new Voiture(scene, content));
    voitures.push(new Voiture(scene, content));

    obstacles.push(new Obstacle(scene, content));
    obstacles.push(new Obstacle(scene, content));
  }
  this.verification = function(){
    for(iObstacles = 0; iObstacles < obstacles.length; iObstacles++){
      if (obstacles[iObstacles]) {
        obstacles[iObstacles].mouvementObstacle(vitesseObjetRoute);
        verificationCollisionnementJoueurObjet(obstacles[iObstacles]);
      }
    }
    for(iBouteilles = 0; iBouteilles < bouteilles.length; iBouteilles++){
      if (bouteilles[iBouteilles]) {
        bouteilles[iBouteilles].mouvementBouteille(vitesseObjetRoute);
        verificationCollisionnementJoueurBouteille(bouteilles[iBouteilles]);
      }
    }
    for(iVoitures = 0; iVoitures < voitures.length; iVoitures++){
      if (voitures[iVoitures]) {
        voitures[iVoitures].mouvementVoiture(vitesseVoiture);
        verificationCollisionnementJoueurObjet(voitures[iVoitures]);
      }
    }
  }
  //Verification de la collision avec le joueur et la voiture
  function verificationCollisionnementJoueurObjet(objet) {
    if (joueur.rectangleCollisionJoueur().intersects(objet.getCollision())) {
      //console.log("COLLISIONNEMENT ! ");
      detail = [];
      detail['etatJoueur'] = EtatJoueur.estEcraser;
      document.body.dispatchEvent(new CustomEvent("PARTIE_TERMINER", {'detail':detail}));
    }
  }

  function verificationCollisionnementJoueurBouteille(bouteille) {
    if (joueur.rectangleCollisionJoueur().intersects(bouteille.getCollision())) {
      //console.log("COLLISIONNEMENT ! ");
      bouteille.repositionnerBouteille();
      score.augmenterScore(10);
      niveauAlcool.ajouterNiveau(10);
    }
  }
  initialiser();
}
