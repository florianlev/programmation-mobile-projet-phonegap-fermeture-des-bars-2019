function Joueur(id) {

    joueur = this;

    this.id;
    this.idRoom;

    function initialiser(){
        joueur.id = id;
    }

    this.setIdRoom = function(idRoom){
        joueur.idRoom = idRoom;

    }

    initialiser();
}

module.exports = Joueur;

