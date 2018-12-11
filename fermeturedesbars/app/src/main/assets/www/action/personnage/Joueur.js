function Joueur(scene) {
  var joueur = this;
  var positionCourante = { x: 0, y: 0 };
  var cercle;
  var distanceDoit;
  var fantome;

  var animationCourante;

  var IMAGEIVROGNOREMARCHE = "images/spriteSheetIvrogne.png";

  // positions courante pour les deplacements
  var xCourant;
  var yCourant;

  //Variables d'animations
  var animMarche;
  var animEcraser;
  var animVomi;


  function initialiser() {
    // dessiner cercle
    distanceDoit = 80;

    imageIvrogne = new Image();
    imageIvrogne.src = IMAGEIVROGNOREMARCHE;
    imageIvrogne.onload = terminerChargement;

    xCourant = 100;
    yCourant = 100;

    //Pour le déplacement du personnage le tactile
    fantome = new createjs.Shape();
    fantome.graphics.beginFill("black").drawCircle(0, 0, 50);
    fantome.graphics.beginFill("white").drawCircle(0, 0, 25);
    fantome.alpha = 0.5;
    fantome.x = 100;
    fantome.y = window.innerHeight / 2 + 100;

    scene.addChild(fantome);
  }

  function terminerChargement() {

    //Création de la spriteSheet
    spriteIvrogne = new createjs.SpriteSheet(
      {
        images: [imageIvrogne],
        frames: { "regX": 0, "height": 892, "count": 0, "regY": 0, "width": 480 },
        framerate: 13,
        animations:
        {
          //Gestion des 3 animations de la feuille de sprite
          marche: [0, 6, "marche"],
          vomi: [7, 15, "vomi"],
          ecrasement: [16]
        }
      });

    //Pour les 3 anims on créer une sprite et on l'adapte en fonction de l'ecran
    animMarche = new createjs.Sprite(spriteIvrogne, "marche");
    animMarche.scaleX = (0.3 * content.offsetWidth) / 1920;
    animMarche.scaleY = (0.15 * content.offsetHeight) / 938;

    animVomi = new createjs.Sprite(spriteIvrogne, "vomi");
    animVomi.scaleX = (0.3 * content.offsetWidth) / 1920;
    animVomi.scaleY = (0.15 * content.offsetHeight) / 938;

    animEcraser = new createjs.Sprite(spriteIvrogne, "ecrasement");
    animEcraser.scaleX = (0.3 * content.offsetWidth) / 1920;
    animEcraser.scaleY = (0.15 * content.offsetHeight) / 938;

    animationCourante = animMarche;

    gererAnimation(animationCourante);
  }

  //Gestion des animations en fonction des changement de l'etatCourant du personnage
  function gererAnimation(animation) {
    console.log("gererAnimation()");
    scene.removeChild(animMarche);
    animationCourante = animation;
    animationCourante.x = xCourant;
    animationCourante.y = yCourant;
    scene.addChild(animationCourante);
  }

  //On set l'etat du joueur suivant la machine d'etat
  this.setEtatJoueur = function (etatJoueur) {
    switch (etatJoueur) {
      case "enMarche":
        animationCourante = animMarche;
        break;
      case "estEcraser":
        animationCourante = animEcraser;
        break;
      case "estEnVomissement":
        animationCourante = animVomi;
        break;
    }
    gererAnimation(animationCourante);
  }


  this.setPosition = function (x, y) {

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

  //Retour de la collision du joueur
  this.rectangleCollisionJoueur = function () {
    return animationCourante.getTransformedBounds();
  }

  initialiser();
}
