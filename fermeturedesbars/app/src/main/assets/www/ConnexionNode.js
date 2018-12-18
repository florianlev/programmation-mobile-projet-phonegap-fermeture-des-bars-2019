function ConnexionNode(afficherNouvellesListeRoom) {

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

        connexion.on('nouvelleListeRoom', recevoirNouvellesListeRoom);


        connexion.on('tata', function(data){
            console.log('test');
            console.log('Message: ', data);
        });

        connexion.on('nouvel_utilisateur', function(data){
            console.log(data);
        });
    }

    this.creerUneRoom = function(nom){
        console.log("creerUneRoom");
        connexion.emit('creer_room', {nomRoom :nom, idJoueur: idJoueurActuel});
    }

    function recevoirNouvellesListeRoom(donnees){
        listeRoom = JSON.parse(donnees.listeRoom);
        idJoueurActuel = donnees.idJoueur;
        console.log(listeRoom);
        afficherNouvellesListeRoom(listeRoom);
        
    }

    initialiser();


}