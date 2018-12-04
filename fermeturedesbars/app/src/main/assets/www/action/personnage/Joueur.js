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
        scene.mouseMoveOutside = true;
        scene.on("stagemousemove", mouvementSouris);
        createjs.Ticker.addEventListener('tick', cursor);
        createjs.Ticker.setFPS(60);
    }
    
    function cursor(event){
        var difX = stage.mouseX - circle.x;
        var difY = stage.mouseY - circle.y;
          
        circle.x += difX/2;
        circle.y += difY/2;
        stage.update();
  }

    this.afficher = function(){
        
    }


    initialiser();
}