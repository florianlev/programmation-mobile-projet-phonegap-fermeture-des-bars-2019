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

    scene.addChild(cercle);
    scene.addChild(fantome);
  }

  function terminerChargement() {
    spriteIvrogne = new createjs.SpriteSheet(
      {
        images: [imageIvrogne],
				frames: { "regX": 32, "height": 700, "count": 0, "regY": 32, "width": 400},
				framerate: 12,
				animations:
					{
						"marche": [0,7, "marche"]
					}
      });


      animMarche = new createjs.Sprite(spriteIvrogne, "marche");
      animMarche.scaleX = 0.3;
      animMarche.scaleY = 0.3;
      animMarche.x = 300;
      animMarche.y = 300;


      scene.addChild(animMarche);
  }

  this.setPosition = function (x, y) {
    //  cercle.set({x:position.x,y:position.y});
    differenceY = window.innerHeight / 2;
    y = y - differenceY;
    if ((cercle.x - x) < distanceDoit && (cercle.x - x) > -distanceDoit && (cercle.y - y) < distanceDoit && (cercle.y - y) > -distanceDoit && y > 0) {
      cercle.x = x;
      cercle.y = y;

      fantome.x = x;
      fantome.y = y + differenceY;
    }
  }

  this.rectangleCollisionJoueur = function () {
    cercle.setBounds(cercle.x, cercle.y, joueur.height, joueur.width);
    //console.log(cercle.getBounds());
    return cercle.getBounds();
  }

  initialiser();
}
