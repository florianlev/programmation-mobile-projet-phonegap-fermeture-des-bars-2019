function Room(id,nom) {

    room = this;

    var listeJoueurActif = [];
    var listeConnexionActif = [];

    this.nom;
    this.id;


    function initialiser() {
        room.nom = nom;
        room.id = id;
    }

    this.setJoueurDansListeRoom = function(joueur){
        listeJoueurActif.push(joueur);
    }

    this.setConnexionJoueurDansListeConnexion = function(connexion){
        listeConnexionActif.push(connexion);
    }

    initialiser();
}

module.exports = Room;
