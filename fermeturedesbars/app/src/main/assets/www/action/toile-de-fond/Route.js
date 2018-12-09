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

        var acceleration = 1;

        // a changer
        imageRoute.src = "images/route.png";

        imageRoute.onload = function()
        {

            //jai essayer d'arranger le scale de limage de backgroud sa fait rien
            //scale = window.innerWidth/imageRoute.width;
            //imageRoute.width = imageRoute.width*scale;
            //imageRoute.height = imageRoute.height*scale;

            paysageRoute.graphics.beginBitmapFill(imageRoute,"repeat", matriceRoute).drawRect(0,0,content.offsetWidth,content.offsetHeight).endStroke();
            scene.addChild(paysageRoute);
            document.body.dispatchEvent(new CustomEvent("ROUTE_CHARGER"));
        }
    }

    this.raffraichirMatrice = function(vitesseRoute){
        matriceRoute.translate(0,vitesseRoute);

    }

    initialiser();


}
