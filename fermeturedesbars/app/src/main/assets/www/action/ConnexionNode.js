function ConnexionNode(afficherNouvellesListeRoom, transmettreIdRoom) {

    var connexion;
    var idJoueurActuel;

    function initialiser() {
        console.log("initialiserConnexionNode");
        connexion = io.connect('http://localhost:2000');
    }

    this.initierConnexion = function (){
        
        connexion.on('connect', function () {
            console.log('connect');
        });
        connexion.on('envoyerIdJoueur', function(idJoueur){
            idJoueurActuel = idJoueur;
        });
        connexion.on('nouvelleListeRoom', recevoirNouvellesListeRoom);
        connexion.on('envoyer_idRoom', function(idRoom){
            transmettreIdRoom(idRoom);
        });

    }

    this.creerUneRoom = function(nom){
        console.log("creerUneRoom");
        connexion.emit('creer_room', {nomRoom :nom, idJoueur: idJoueurActuel});
    }

    function recevoirNouvellesListeRoom(listeRoom){
        listeRoom = JSON.parse(listeRoom);
        afficherNouvellesListeRoom(listeRoom);
    }

    this.rejoindreUneRoom = function(idRoom){
        connexion.emit('joindre_room', {idRoom: idRoom, idJoueur: idJoueurActuel} );
    }



    initialiser();


}