function Route(scene) {

    var route = this;
    var imageRoute;
    var bitmap;
    var matrice;
    var paysage;


    function initialiser() {
        imageRoute = document.getElementById('route');
        var arrierePlanConteneur = new createjs.Container();

        matriceRoute = new createjs.Matrix2D();
        paysageRoute = new createjs.Shape();
        imageRoute = new Image();
        var chargementCompletArrierePlan = document.createEvent('Event');
        chargementCompletArrierePlan.initEvent('chargementCompletArrierePlan', true, true);

        var acceleration = 1;

        // a changer
        imageRoute.src = "images/route.png";

        imageRoute.onload = function()
        {
            paysageRoute.graphics.beginBitmapFill(imageRoute,"repeat", matriceRoute).drawRect(0,0,5000,1200).endStroke();
            scene.addChild(paysageRoute);
            document.body.dispatchEvent(new CustomEvent("ROUTE_CHARGER"));
        }
    }

    this.raffraichirMatrice = function(vitesseRoute){
        matriceRoute.translate(0,vitesseRoute);

    }

    initialiser();


}
