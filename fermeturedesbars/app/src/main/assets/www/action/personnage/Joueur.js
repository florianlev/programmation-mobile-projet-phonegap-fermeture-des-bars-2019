function Joueur() {
  var joueur = this;

  var id;
  var idRoom;
  var pseudo;
  var couleur;

  var content;
  var scene;
  var distanceDoit;
  var fantome;
  var partieTerminer;
  var isJoueurActuel;

  var EtatJoueur = {
    enMarche: "enMarche",
    estEcraser: "estEcraser",
    estEnVomissement: "estEnVomissement"
  }

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

  }



  this.afficher = function () {
    console.log('afficher()');

    distanceDoit = 80;
    partieTerminer = false;
    imageIvrogne = new Image();
    imageIvrogne.src = IMAGEIVROGNOREMARCHE;
    imageIvrogne.onload = terminerChargement;

    xCourant = content.offsetWidth / 2;
    yCourant = 100;

    //Pour le déplacement du personnage le tactile
    fantome = new createjs.Shape();
    fantome.graphics.beginFill("black").drawCircle(0, 0, 50);
    fantome.graphics.beginFill("white").drawCircle(0, 0, 25);
    fantome.alpha = 0.5;
    fantome.x = content.offsetWidth / 2;
    fantome.y = window.innerHeight / 2 + 100;

    if(isJoueurActuel)scene.addChild(fantome);
  }
  this.isJoueurMort = function(){
    return partieTerminer;
  }
  function terminerChargement() {

    //Création de la spriteSheet
    spriteIvrogne = new createjs.SpriteSheet({
      images: [imageIvrogne],
      frames: {
        "regX": 0,
        "height": 892,
        "count": 0,
        "regY": 0,
        "width": 480
      },
      framerate: 13,
      animations: {
        //Gestion des 3 animations de la feuille de sprite
        marche: [0, 6, "marche"],
        vomi: [8, 15, "vomi"],
        ecrasement: [16]
      }
    });

    //Pour les 3 anims on créer une sprite et on l'adapte en fonction de l'ecran
    scale = (0.4 * content.offsetWidth) / 1920;
    animMarche = new createjs.Sprite(spriteIvrogne, "marche");
    animMarche.scaleX = scale;
    animMarche.scaleY = scale;
    //animMarche.scaleX = (0.3 * content.offsetWidth) / 1920;
    //animMarche.scaleY = (0.15 * content.offsetHeight) / 938;

    animVomi = new createjs.Sprite(spriteIvrogne, "vomi");
    animVomi.scaleX = scale;
    animVomi.scaleY = scale;
    //animVomi.scaleX = (0.3 * content.offsetWidth) / 1920;
    //animVomi.scaleY = (0.15 * content.offsetHeight) / 938;

    animEcraser = new createjs.Sprite(spriteIvrogne, "ecrasement");
    animEcraser.scaleX = scale;
    animEcraser.scaleY = scale;
    //animEcraser.scaleX = (0.3 * content.offsetWidth) / 1920;
    //animEcraser.scaleY = (0.15 * content.offsetHeight) / 938;

    animationCourante = animMarche;

    gererAnimation(animationCourante);
  }

  //Gestion des animations en fonction des changement de l'etatCourant du personnage
  function gererAnimation(animation) {
    scene.removeChild(animMarche);
    animationCourante = animation;
    animationCourante.x = xCourant;
    animationCourante.y = yCourant;
    scene.addChild(animationCourante);
  }

  //On set l'etat du joueur suivant la machine d'etat
  this.setEtatJoueur = function (etatJoueur) {
    if (!partieTerminer) {
      switch (etatJoueur) {
        case EtatJoueur.enMarche:
          animationCourante = animMarche;
          break;
        case EtatJoueur.estEcraser:
          animationCourante = animEcraser;
          partieTerminer = true;
          break;
        case EtatJoueur.estEnVomissement:
          animationCourante = animVomi;
          partieTerminer = true;
          break;
      }
      gererAnimation(animationCourante);
    }
  }

  this.monterEnY = function (vitesse) {
    animationCourante.y -= vitesse;
    xCourant -= vitesse;
    fantome.y += vitesse * 10;
  }
  this.setPosition = function (x, y) {
    if (!partieTerminer) {
      differenceY = window.innerHeight / 2;
      y = y - differenceY;
      limiteXDoite = content.offsetWidth * 0.7;
      limiteXGauche = content.offsetWidth * 0.2;
      if ((animationCourante.x - x) < distanceDoit && (animationCourante.x - x) > -distanceDoit && (animationCourante.y - y) < distanceDoit && (animationCourante.y - y) > -distanceDoit && y > 0 && x < limiteXDoite && x > limiteXGauche) {
        animationCourante.x = x;
        animationCourante.y = y;
        xCourant = x;
        yCourant = y;

        fantome.x = x;
        fantome.y = y + differenceY;
      }
    }
  }

  this.setPositions = function(positions){
    animationCourante.x = positions.x;
    animationCourante.y = positions.y

  }


  this.getPositions = function () {
    return position = {
      x: xCourant,
      y: yCourant
    };
  }

  //Retour de la collision du joueur
  this.getRectangleCollision = function () {
    if (animationCourante) return animationCourante.getTransformedBounds();
  }
  this.setEtatJoueurMarche = function () {
    this.setEtatJoueur(EtatJoueur.enMarche);
  }
  this.setEtatJoueurEcraser = function () {
    this.setEtatJoueur(EtatJoueur.estEcraser);
  }
  this.setEtatJoueurVomisement = function () {
    this.setEtatJoueur(EtatJoueur.estEnVomissement);
  }

  this.setContent = function (nouveauContent) {
    content = nouveauContent;
  }

  this.setScene = function (nouvelScene) {
    scene = nouvelScene;
  }

  this.getId = function () {
    return this.id;
  }

  this.getPseudo = function () {
    return this.pseudo;
  }

  this.getIdRoom = function () {
    return this.idRoom;
  }


  this.setId = function (id) {
    this.id = id;
  }
  this.setIdRoom = function (idRoom) {
    this.idRoom = idRoom;
  }
  this.setPseudo = function (pseudo) {
    this.pseudo = pseudo;
  }

  this.setCouleur = function(couleur){
    this.couleur = couleur;
  }
  this.getCouleur = function(){
    return this.couleur;
  }


  this.setIsJoueurActuel = function (newIsJoueurActuel) {
    isJoueurActuel = newIsJoueurActuel;
  }

  this.getIsJoueurActuel = function () {
    return isJoueurActuel;
  }
  initialiser();
}
