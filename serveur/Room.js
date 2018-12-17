function Room(nom) {

    room = this;

    var listeJoueurActif = [];

    this.nom;


    function initialiser() {
        room.nom = nom;
    }

    initialiser();
}
module.exports = Room;
