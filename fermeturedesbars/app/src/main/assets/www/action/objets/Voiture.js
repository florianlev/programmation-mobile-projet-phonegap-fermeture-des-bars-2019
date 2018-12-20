var Voiture = function (scene, content, idVoiture) {

  var voiture = this;
  var imgVoiture = new Image();
  var bitmapVoiture;
  voiture.height = 20;
  voiture.width = 20;

  var enAttenteDeplacement = false;

  var delaiAffichage;
  var debutInterval;


  function initialiser() {
    imgVoiture.src = "images/voiture.png";
    imgVoiture.onload = terminerChargement;

    delaiAffichage = 0;
    debutInterval = 0;
  }

  function terminerChargement() {
    bitmapVoiture = new createjs.Bitmap(imgVoiture);
    scale = (1.1 * content.offsetWidth) / 1920;
    bitmapVoiture.scaleX = scale;
    bitmapVoiture.scaleY = scale;
    //bitmapVoiture.scaleX = (0.2 * content.offsetWidth) / 1920;
    //bitmapVoiture.scaleY = (0.2 * content.offsetHeight) / 938;

    document.body.dispatchEvent(new CustomEvent("voiturechargee"));
    voiture.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapVoiture);
    voiture.repositionnerVoiture();
    estCharger = true;

  }
  this.isCharger = function () {
    return estCharger;
  }

  this.mouvementVoiture = function (vitesseRoute) {
    if (bitmapVoiture) {
      bitmapVoiture.y -= vitesseRoute * 3;

      //Si l'objet sort de la map on le repositionne
      if (bitmapVoiture.y < -50 && !enAttenteDeplacement) {
        enAttenteDeplacement = true;
        //console.log("voiture out");
        document.body.dispatchEvent(new CustomEvent("voituresortieecran", { detail: { idVoiture: voiture.getId() } }));

        //setTimeout(this.repositionnerVoiture, getNombreHazard(0,10000));
      }
    }
  }

  this.repositionnerVoiture = function () {
    //console.log("repositionnerVoiture()"+ getNombreHazard(10, content.offsetWidth) + content.offsetHeight);
    limiteXDoite = content.offsetWidth * 0.6;
    limiteXGauche = content.offsetWidth * 0.3;
    bitmapVoiture.y = content.offsetHeight + 50 + getNombreHazard(0, 800);
    bitmapVoiture.x = getNombreHazard(limiteXDoite, limiteXGauche);
    enAttenteDeplacement = false;
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.getRectangleCollision = function () {
    if (bitmapVoiture) {
      bitmapVoiture.setBounds(bitmapVoiture.x, bitmapVoiture.y, voiture.width, voiture.height);
      return bitmapVoiture.getBounds();
    } else {
      return null;
    }

  }

  this.getId = function () {
    return idVoiture;
  }

  this.isEnAttenteDeplacment = function () {
    return enAttenteDeplacement;
  }
  this.repositionnerManuellement = function(position){
    bitmapVoiture.x = content.offsetWidth*position.x;
    bitmapVoiture.y = content.offsetHeight*position.y;
  }
  this.setEnAttenteDeplacement = function (attente) {
    enAttenteDeplacement = attente;
    bitmapVoiture.x = -200;
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
