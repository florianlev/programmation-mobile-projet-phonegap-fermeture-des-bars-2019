function Joueur(scene) {
  var joueur = this;
  var positionCourante = { x: 0, y: 0 };
  var cercle;
  var distanceDoit;
  var fantome;

  var IMAGE = "images/ivrogneMarche.png";

  joueur.height = 20;
  joueur.width = 20;


  function initialiser() {
    // dessiner cercle
    distanceDoit = 80;
    cercle = new createjs.Shape();
    cercle.graphics.beginFill("red").drawCircle(0, 0, 50);
    cercle.x = 100;
    cercle.y = 100;

    imageIvrogne = new Image();
    imageIvrogne.src = IMAGE;
    imageIvrogne.onload = terminerChargement;

    fantome = new createjs.Shape();
    fantome.graphics.beginFill("black").drawCircle(0, 0, 50);
    fantome.graphics.beginFill("white").drawCircle(0, 0, 25);
    fantome.alpha = 0.5;
    fantome.x = 100;
    fantome.y = window.innerHeight / 2 + 100;

    //scene.addChild(cercle);
    scene.addChild(fantome);
  }

  function terminerChargement() {
    spriteIvrogne = new createjs.SpriteSheet(
      {
        images: [imageIvrogne],
				frames: { "regX": 32, "height": 700, "count": 0, "regY": 32, "width": 478},
				framerate: 12,
				animations:
					{
              marche:
              {
                frames: [0,1,2,3,4,5,6]
              }
					}
      });


      animMarche = new createjs.Sprite(spriteIvrogne, "marche");
      animMarche.scaleX = (0.3 * content.offsetWidth) / 1920;
      animMarche.scaleY = (0.15 * content.offsetHeight) / 938;
      animMarche.x = 100;
      animMarche.y = 100;


      scene.addChild(animMarche);
  }

  this.setPosition = function (x, y) {
    //  cercle.set({x:position.x,y:position.y});
    differenceY = window.innerHeight / 2;
    y = y - differenceY;
    if ((animMarche.x - x) < distanceDoit && (animMarche.x - x) > -distanceDoit && (animMarche.y - y) < distanceDoit && (animMarche.y - y) > -distanceDoit && y > 0) {
      animMarche.x = x;
      animMarche.y = y;

      fantome.x = x;
      fantome.y = y + differenceY;
    }
  }

  this.rectangleCollisionJoueur = function () {
    //animMarche.setBounds(animMarche.x, animMarche.y, joueur.height, joueur.width);
    //console.log(cercle.getBounds());
    return animMarche.getTransformedBounds();
  }

  initialiser();
}
