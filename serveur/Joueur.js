function Joueur(id) {

    joueur = this;

    this.id;
    this.pseudo;
    this.idRoom;
    this.isPret;

    function initialiser(){
        joueur.id = id;
        joueur.isPret = false;
    }

    initialiser();
}

module.exports = Joueur;

