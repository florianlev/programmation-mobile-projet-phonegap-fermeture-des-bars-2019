function Joueur(scene){
    var joueur = this;
    var positionCourante = {x:0, y:0};
    var cercle;
    var distanceDoit;
    var fantome;
    function initialiser(){
        // dessiner cercle
        distanceDoit = 80;
        cercle = new createjs.Shape();
        cercle.graphics.beginFill("red").drawCircle(0,0,50);
        cercle.x = 100;
        cercle.y = 100;

        fantome = new createjs.Shape();
        fantome.graphics.beginFill("black").drawCircle(0,0,50);
        fantome.graphics.beginFill("white").drawCircle(0,0,25);
        fantome.alpha = 0.5;
        fantome.x = 100;
        fantome.y = window.innerHeight/2 + 100;

        scene.addChild(cercle);
        scene.addChild(fantome);
      }
    this.setPosition = function(x,y){
      //  cercle.set({x:position.x,y:position.y});
      differenceY = window.innerHeight/2;
      y = y - differenceY;
      if((cercle.x - x) < distanceDoit && (cercle.x - x) > -distanceDoit && (cercle.y - y) < distanceDoit && (cercle.y - y) > -distanceDoit && y > 0){
        cercle.x = x;
        cercle.y = y;

        fantome.x = x;
        fantome.y = y+differenceY;
      }
    }

    initialiser();
}