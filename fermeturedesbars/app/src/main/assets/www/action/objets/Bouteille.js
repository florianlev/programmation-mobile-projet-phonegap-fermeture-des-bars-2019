var Bouteille = function (scene, content, idBouteille) {
  var bouteille = this;
  var imgBouteille = new Image();
  var bitmapBouteille;
  var estCharger = false;
  bouteille.height = 20;
  bouteille.width = 20;

  var delaiAffichage;
  var enAttenteDeplacement = false;
  var debutInterval;

  function initialiser() {

    imgBouteille.src = "images/beer.png";
    imgBouteille.onload = terminerChargement;

    delaiAffichage = 0;

    debutInterval = 0;
  }

  function terminerChargement() {
    bitmapBouteille = new createjs.Bitmap(imgBouteille);
    scale = (0.7 * content.offsetWidth) / 1920;
    bitmapBouteille.scaleX = scale;
    bitmapBouteille.scaleY = scale;


    //initialiser bitmapbouteille hors de l'ecran


    //bitmapBouteille.scaleX = (0.2 * content.offsetWidth) / 1920;
    //bitmapBouteille.scaleY = (0.05 * content.offsetHeight) / 938;

    document.body.dispatchEvent(new CustomEvent("bouteillevertechargee"));
    bouteille.afficher();

  }

  this.afficher = function () {
    scene.addChild(bitmapBouteille);
    bouteille.repositionnerBouteille();
    estCharger = true;

  }


  this.isCharger = function () {
    return estCharger;
  }
  this.mouvement = function (vitesseRoute) {
    //console.log("bougerBouteille");
    if (bitmapBouteille) {
      bitmapBouteille.y -= vitesseRoute;

      //Si l'objet sort de la map on le repositionne


      if (bitmapBouteille.y <= -200 && !enAttenteDeplacement) {
        enAttenteDeplacement = true;
        document.body.dispatchEvent(new CustomEvent("bouteillesortieecran", { detail : {idBouteille: bouteille.getId() } }));
      }
    }
  }

  this.repositionnerBouteille = function () {
    limiteXDoite = content.offsetWidth * 0.7;
    limiteXGauche = content.offsetWidth * 0.2;
    bitmapBouteille.y = content.offsetHeight + 50 + getNombreHazard(0,800);
    bitmapBouteille.x = getNombreHazard(limiteXGauche, limiteXDoite);
    enAttenteDeplacement = false;
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.getRectangleCollision = function () {
    if (bitmapBouteille) {
      bitmapBouteille.setBounds(bitmapBouteille.x, bitmapBouteille.y, bouteille.width, bouteille.height);
      return bitmapBouteille.getBounds();
    } else {
      return null;
    }
  }

  this.getId = function(){
    return idBouteille;
  }
  this.isEnAttenteDeplacment = function () {
    return enAttenteDeplacement;
  }
  this.setEnAttenteDeplacement = function (attente) {
    enAttenteDeplacement = attente;
    bitmapBouteille.x = -200;
  }

  this.setDelaiAffichage = function (nouveauDelaiAffichage) {
    delaiAffichage = nouveauDelaiAffichage;
  }

  this.getDelaiAffichage = function () {
    return delaiAffichage;
  }

  this.setDebutInterval= function(intervalBouteille){
    debutInterval = intervalBouteille;
  }

  this.getDebutInterval= function(){
    return debutInterval;
  }
  this.repositionnerManuellement = function(position){
    bitmapbouteille.x = content.offsetWidth*position.x;
    bitmapBouteille.y = content.offsetHeight*position.y;
  }

  initialiser();
}
