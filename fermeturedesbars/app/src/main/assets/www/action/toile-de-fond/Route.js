function Route(scene) {

    var route = this;
    var imageRoute;
    var bitmap;
    var matrice;
    var paysage;


    function initialiser() {
        imageRoute = document.getElementById('route');

        matrice = new createjs.Matrix2D();
        paysage = new createjs.Shape();
        imageRoute = new Image();
        // a changer
        imageRoute.src = "route.jpg";

        imageRoute.onload = function()
        {
            
        }



    }

    initialiser();


}