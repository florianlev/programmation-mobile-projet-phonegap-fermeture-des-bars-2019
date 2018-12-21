function ConnexionNode(afficherNouvellesListeRoom, 
                        transmettreIdRoom,
                        creerJoueur,
                        afficherListeJoueur) {

    var connexion;
    var idJoueurActuel;
    var joueurActuel;

    function initialiser() {
        console.log("initialiserConnexionNode");
        connexion = io.connect('http://localhost:2000');
    }

    this.initierConnexion = function (){
        
        connexion.on('connect', etablirConnexion);

        connexion.on('envoyerIdJoueur', function(idJoueur){
            idJoueurActuel = idJoueur;
            connexion.emit('envoyer_pseudo', {pseudo : localStorage['pseudo'], idJoueur : idJoueurActuel});
        });
        connexion.on('envoyer_joueur', recevoirJoueur);
        connexion.on('nouvelleListeRoom', recevoirNouvellesListeRoom);
        connexion.on('envoyer_idRoom', function(idRoom){
            transmettreIdRoom(idRoom);
        });
        connexion.on('envoie_listeJoueur_room',recevoirListeJoueurRoom);

    }

    function etablirConnexion(event){
        console.log('etablirConnexion()');
    }

    function recevoirJoueur(joueur){
        joueurActuel = joueur;
        creerJoueur(joueur);
    }

    this.creerUneRoom = function(nom){
        console.log("creerUneRoom");
        connexion.emit('creer_room', {nomRoom :nom, idJoueur: joueurActuel.id});
    }

    function recevoirNouvellesListeRoom(listeRoom){
        listeRoom = JSON.parse(listeRoom);
        afficherNouvellesListeRoom(listeRoom);
    }

    this.rejoindreUneRoom = function(idRoom){
        connexion.emit('joindre_room', {idRoom: idRoom, idJoueur: joueurActuel.id} );
    }

    function recevoirListeJoueurRoom(listeJoueurRoomJSON){
        console.log("recevoirListeJoueurRoom");
        listeJoueurRoom = JSON.parse(listeJoueurRoomJSON);
        afficherListeJoueur(listeJoueurRoom);
    }

    this.envoyerJoueurPret(){
        connexion.emit('envoyer_joueur_pret', joueurActuel.id);
    }



    initialiser();


}