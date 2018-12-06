function Joueur(scene){
    var joueur = this;
    var positionCourante = {x:0, y:0};
    var cercle;

    function initialiser(){
        // dessiner cercle
        cercle = new createjs.Shape();
        cercle.graphics.beginFill("red").drawCircle(0,0,50);
        cercle.x = 100;
        cercle.y = 100;
        scene.addChild(cercle);
      }
    this.setPosition = function(x,y){
      //  cercle.set({x:position.x,y:position.y});
      differenceY = window.innerHeight/2;
      if((cercle.x - x) < 30 && (cercle.x - x) > -30){
        cercle.x = x
        cercle.y =  y - differenceY;
      }
    }

    initialiser();
}
