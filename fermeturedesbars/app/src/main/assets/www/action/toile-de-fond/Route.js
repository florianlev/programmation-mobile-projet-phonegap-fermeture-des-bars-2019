function Route(scene,content) {

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
        // a changer
        imageRoute.src = "images/route.png";

        imageRoute.onload = function()
        {

            paysageRoute.graphics.beginBitmapFill(imageRoute,"repeat", matriceRoute).drawRect(0,0,imageRoute.naturalWidth,imageRoute.naturalHeight).endStroke();
            paysageRoute.scaleX = content.offsetWidth / imageRoute.naturalWidth;
            paysageRoute.scaleY = content.offsetHeight / imageRoute.naturalHeight;
            scene.addChild(paysageRoute);
            document.body.dispatchEvent(new CustomEvent("ROUTE_CHARGER"));
        }
    }

    this.raffraichirMatrice = function(vitesseRoute){
        matriceRoute.translate(0,vitesseRoute);

    }

    initialiser();


}
