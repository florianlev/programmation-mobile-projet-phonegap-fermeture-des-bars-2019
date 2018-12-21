function NiveauAlcool(scene, joueur, idJoueur,couleur) {

  var niveauAlcool;
  var niveau;
  var pointsParSecondes;
  var couleur;

  function initialiser() {

    pointsParSecondes = 7;
    

  }

  this.afficher = function(){
    niveauAlcool = new ProgressBar.Line('#bar', {
      strokeWidth: 2,
      easing: 'easeInOut',
      duration: 10,
      color: couleur,
      trailColor: '#eee',
      trailWidth: 45,
      svgStyle: { width: '100%', height: '100%' }
    });
    niveauAlcool.animate(0.5);
  }

  this.getNivauAlcool = function(){
    return niveau;
  }


  this.demarrerDiminution = function () {
    niveau -= pointsParSecondes / 60;
    if (niveau <= 0) {
      niveau = 0;
      //Envoie de l'etat enVomissement pour lancer l'annimation
      joueur.setEtatJoueurVomisement();
      document.body.dispatchEvent(new CustomEvent("collisionavecobjet", { detail: { typeMort:"alcool" } }));
    }

    niveauAlcool.animate(niveau / 100);
  }

  this.modifierNiveauAlcool = function (nouveauNiveauAlcool) {
    niveau = nouveauNiveauAlcool;
    niveauAlcool.animate(niveau / 100);
  }



  initialiser();
}
