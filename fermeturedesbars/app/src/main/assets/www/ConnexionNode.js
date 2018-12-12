function ConnexionNode() {


    function initialiser() {
        console.log("initialiserConnexionNode");
        connexion = io.connect('http://158.69.113.110:2000');
        var room  = "abc";

        connexion.on('connect', function () {
            console.log('connect');
            connexion.emit('room', room);
        });

        connexion.on('tata', function(data){
            console.log('test');
            console.log('Message: ', data);
        });
    }

    initialiser();

}