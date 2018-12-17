function ConnexionNode() {

    var connexion;

    function initialiser() {
        
    }

    this.initierConnexion = function (){
        console.log("initialiserConnexionNode");
        connexion = io.connect('http://localhost:2000');
        var room  = "room3";
        connexion.on('connect', function () {
            console.log('connect');
            connexion.emit('joindre_room', room);
        });


        connexion.on('tata', function(data){
            console.log('test');
            console.log('Message: ', data);
        });

        connexion.on('nouvel_utilisateur', function(data){
            console.log(data);
        });
    }

    initialiser();


}