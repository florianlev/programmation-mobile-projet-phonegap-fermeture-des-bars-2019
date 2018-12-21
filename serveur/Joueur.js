function Joueur(id) {

    joueur = this;

    this.id;
    this.pseudo;
    this.idRoom;
    this.isPret;
    this.nomRoom;
    this.couleur;
    this.niveauAlcool;

    this.positions = {
        x: 0,
        y: 0
    };

    function initialiser() {
        joueur.id = id;
        joueur.isPret = false;
    }

    initialiser();
}

module.exports = Joueur;