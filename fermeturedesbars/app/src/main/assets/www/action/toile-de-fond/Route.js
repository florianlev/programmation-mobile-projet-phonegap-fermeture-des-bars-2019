function Route(scene, content, canvas) {

    var route = this;
    var imageRoute;
    var bitmap;
    var matrice;
    var paysage;


    function initialiser() {
        imageRoute = document.getElementById('route');

        matriceRoute = new createjs.Matrix2D();
        paysageRoute = new createjs.Shape();
        imageRoute = new Image();




        var chargementCompletArrierePlan = document.createEvent('Event');
        chargementCompletArrierePlan.initEvent('chargementCompletArrierePlan', true, true);
        // a changer
        imageRoute.src = "images/route.png";

        imageRoute.onload = function () {
            var bmp = new createjs.Bitmap(imageRoute);
            bmp.cache(0, 0, imageRoute.width, imageRoute.height,content.offsetWidth/ imageRoute.width);
            var bmp2 = new createjs.Bitmap(bmp.cacheCanvas);

            paysageRoute.graphics.beginBitmapFill(bmp2.image, "repeat", matriceRoute).drawRect(0, 0, content.offsetWidth,content.offsetHeight).endStroke();

            document.body.dispatchEvent(new CustomEvent("fondecranpret"));
            scene.addChild(paysageRoute);
        }
    }

    this.derouler = function (vitesseRoute) {
        matriceRoute.translate(0, (vitesseRoute) * -1);

    }


    initialiser();


}
