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

    this.getListeJoueur = function(){
        var listeJoueur = [];
        for(i=0;i < listeJoueurActif.length; i++){
            listeJoueur.push(listeJoueurActif[i].joueur);
        }
        return listeJoueur;
    }


    initialiser();
}

module.exports = Room;
