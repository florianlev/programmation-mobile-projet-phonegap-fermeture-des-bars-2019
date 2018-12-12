var Voiture = function(scene,content){
  var voiture = this;
  var imgVoiture = new Image();
  var bitmapVoiture;
  voiture.height = 20;
  voiture.width = 20;
  var enAttenteDeplacement = false;
  function initialiser(){
    imgVoiture.src = "images/voiture.png";
    imgVoiture.onload = terminerChargement;
  }

  function terminerChargement()
  {
    bitmapVoiture = new createjs.Bitmap(imgVoiture);
    scale = (0.3 * content.offsetWidth) / 1920;
    bitmapVoiture.scaleX = scale;
    bitmapVoiture.scaleY = scale;
    //bitmapVoiture.scaleX = (0.2 * content.offsetWidth) / 1920;
    //bitmapVoiture.scaleY = (0.2 * content.offsetHeight) / 938;
    voiture.afficher();
  }

  this.afficher = function () {
    scene.addChild(bitmapVoiture);
    voiture.repositionnerVoiture();
    estCharger = true;

  }
  this.isCharger = function(){
    return estCharger;
  }

  this.mouvementVoiture = function (vitesseRoute) {
    if(bitmapVoiture){
      bitmapVoiture.y -= vitesseRoute;

      //Si l'objet sort de la map on le repositionne
      if (bitmapVoiture.y < -50 && !enAttenteDeplacement) {
        enAttenteDeplacement = true;
        //console.log("voiture out");
        setTimeout(this.repositionnerVoiture, getNombreHazard(0,3000));
      }
    }
  }

  this.repositionnerVoiture = function () {
    //console.log("repositionnerVoiture()"+ getNombreHazard(10, content.offsetWidth) + content.offsetHeight);
    bitmapVoiture.y = content.offsetHeight;
    bitmapVoiture.x = getNombreHazard(10, content.offsetWidth);
    enAttenteDeplacement = false;
  }

  function getNombreHazard(min, max) {
    return Math.random() * (max - min) + min;
  }

  this.getCollision = function () {
    bitmapVoiture.setBounds(bitmapVoiture.x, bitmapVoiture.y, voiture.width, voiture.height);
    return bitmapVoiture.getBounds();
  }
  this.isEnAttenteDeplacment = function(){
    return enAttenteDeplacement;
  }
  initialiser();
}
