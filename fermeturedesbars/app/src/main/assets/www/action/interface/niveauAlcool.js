function NiveauAlcool(scene){

    function initialiser(){
        arriere = new createjs.Shape();
        arriere.graphics.beginFill("white").drawRect(0,0,window.innerWidth/2,window.innerHeight/25);
        arriere.x = window.innerWidth/4;
        arriere.y = 0;

        /*remplissage = new createjs.Shape();
        remplissage.graphics.beginFill("black").drawCircle(0,0,50);
        remplissage.graphics.beginFill("white").drawCircle(0,0,25);
        remplissage.alpha = 0.5;
        remplissage.x = 100;
        remplissage.y = window.innerHeight/2 + 100;*/

        scene.addChild(arriere);
        //scene.addChild(remplissage);
      }
    this.modifierNiveauAlcool = function(niveau){

    }

    initialiser();
}
