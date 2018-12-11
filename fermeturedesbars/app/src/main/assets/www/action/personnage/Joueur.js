function Joueur(scene) {
  var joueur = this;
  var positionCourante = { x: 0, y: 0 };
  var cercle;
  var distanceDoit;
  var fantome;
  var animationCourante;

  var IMAGEIVROGNOREMARCHE = "images/spriteSheetIvrogne.png";
  var IMAGEIVROGNEVOMI = "images/ivrogneVomi.png";

  var xCourant;
  var yCourant;

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
    imageIvrogne.src = IMAGEIVROGNOREMARCHE;
    imageIvrogne.onload = terminerChargement;

    xCourant = 100;
    yCourant = 100;
    //imageIvrogneVomi.onload = terminerChargement;

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
        frames: { "regX": 0, "height": 892, "count": 0, "regY": 0, "width": 480 },
        framerate: 13,
        animations:
        {

          marche : [0, 6, "marche"],
          vomi : [7, 15, "vomi"],
          ecrasement : [16]
          /*marche:
          {
            frames: [0, 1, 2, 3, 4, 5, 6]
          }*/

        }
      });


    animMarche = new createjs.Sprite(spriteIvrogne, "marche");
    animMarche.scaleX = (0.3 * content.offsetWidth) / 1920;
    animMarche.scaleY = (0.15 * content.offsetHeight) / 938;

    animVomi = new createjs.Sprite(spriteIvrogne, "vomi");
    animVomi.scaleX = (0.3 * content.offsetWidth) / 1920;
    animVomi.scaleY = (0.15 * content.offsetHeight) / 938;

    animEcraser = new createjs.Sprite(spriteIvrogne, "ecrasement");
    animEcraser.scaleX = (0.3 * content.offsetWidth) / 1920;
    animEcraser.scaleY = (0.15 * content.offsetHeight) / 938;


    /*animMarche.x = 100;
    animMarche.y = 100;*/

    animationCourante = animMarche;
    //scene.addChild(animMarche);

    gererAnimation(animationCourante);
  }

  function gererAnimation(animation) {
    scene.removeChild(animationCourante);
    animationCourante = animation;
    animationCourante.x = xCourant;
    animationCourante.y = yCourant;
    scene.addChild(animationCourante);
  }

  this.setPosition = function (x, y) {
    //  cercle.set({x:position.x,y:position.y});
    differenceY = window.innerHeight / 2;
    y = y - differenceY;
    if ((animationCourante.x - x) < distanceDoit && (animationCourante.x - x) > -distanceDoit && (animationCourante.y - y) < distanceDoit && (animationCourante.y - y) > -distanceDoit && y > 0) {
      animationCourante.x = x;
      animationCourante.y = y;
      xCourant = x;
      yCourant = y;

      fantome.x = x;
      fantome.y = y + differenceY;
    }
  }

  this.rectangleCollisionJoueur = function () {
    //animMarche.setBounds(animMarche.x, animMarche.y, joueur.height, joueur.width);
    //console.log(cercle.getBounds());
    return animationCourante.getTransformedBounds();
  }

  initialiser();
}
