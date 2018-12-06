var Voiture = function(scene){
  var voiture = this;
  var imgVoiture = new Image();
  var bitmapVoiture
  
  function initialiser(){
    imgVoiture.src = "images/voiture.png";
    imgVoiture.onload = terminerChargement;
  }
  function terminerChargement()
  {
    bitmapVoiture = new createjs.Bitmap(imgVoiture);
    bitmapVoiture.scaleX = 0.2;
    bitmapVoiture.scaleY = 0.2;
    voiture.afficher();
  }


  this.afficher = function () {
    scene.addChild(bitmapVoiture);
    bitmapVoiture.x = 200;
    bitmapVoiture.y = 300;
  }
 
  initialiser();
}
