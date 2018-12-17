function Room(id,nom) {

    room = this;

    var listeJoueurActif = [];

    this.nom;
    this.id;


    function initialiser() {
        room.nom = nom;
        room.id = id;
    }

    initialiser();
}
module.exports = Room;
