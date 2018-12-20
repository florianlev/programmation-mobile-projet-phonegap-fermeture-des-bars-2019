function ConnexionNode(afficherNouvellesListeRoom, 
                        transmettreIdRoom,
                        creerJoueur,
                        afficherListeJoueur) {

    var connexion;
    var idJoueurActuel;

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
        creerJoueur(joueur);
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

    function recevoirListeJoueurRoom(listeJoueurRoomJSON){
        console.log("recevoirListeJoueurRoom");
        listeJoueurRoom = JSON.parse(listeJoueurRoomJSON);
        var joueur;
        var nJoueur;

        afficherListeJoueur(listeJoueurRoom);
        /* if (listeJoueurRoom[1]){
            joueur = listeJoueurRoom[1];
            nJoueur = 2;
            afficherListeJoueur(listeJoueurRoom[0],1);
        }
        else{
            joueur = listeJoueurRoom[0];
            nJoueur = 1;
            afficherListeJoueur(joueur,nJoueur);

        } */
    }



    initialiser();


}