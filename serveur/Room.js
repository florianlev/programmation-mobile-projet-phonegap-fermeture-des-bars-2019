function Room(id,nom) {

    room = this;

    var listeJoueurActif = [];

    this.nom;
    this.id;


    function initialiser() {
        room.nom = nom;
        room.id = id;
    }

    this.setJoueurDansListeRoom = function(joueur){
        listeJoueurActif.push(joueur);
    }


    initialiser();
}

module.exports = Room;
