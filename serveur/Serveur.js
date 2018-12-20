var http = require('http');
var socketIo = require('socket.io');
Room = require('./Room.js');
Joueur = require('./Joueur.js');
GestionnaireObjets = require('./objets/GestionnaireObjets.js');
var event = require('events');
var emiter = new event.EventEmitter;

var listeRoom = [];
var listeJoueur = [];
var gestionnaireObjets = new GestionnaireObjets(event);
var idRoom;



function initialiser() {
    console.log("initialiser()");

    var server = http.createServer(function (req, res) {
        // Send HTML headers and message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello Socket Lover!</h1>');
    });

    server.listen(2000);
    io = socketIo.listen(server);

    idRoom = 0;
    io.on('connection', gererConnexion);

    emiter.on('bouteillesortieecran',gererBouteilleSortieEcran);
    emiter.on('obstaclesortieecran',gererObstacleSortieEcran);
    emiter.on('voituresortieecran',gererVoitureSortiEcran);

}

function gererConnexion(nouvelleConnexion) {
    console.log("Un joueur est connecté ! ");

    nouveauJoueur = new Joueur(nouvelleConnexion.id);
    listeJoueur[nouvelleConnexion.id] = { joueur: nouveauJoueur, connexion: nouvelleConnexion };

    //Envoie de la liste des rooms
    nouvelleConnexion.emit('envoyerIdJoueur', nouvelleConnexion.id);
    nouvelleConnexion.emit('nouvelleListeRoom', JSON.stringify(listeRoom));
    nouvelleConnexion.on("joindre_room", joindreRoom);
    nouvelleConnexion.on('creer_room', creerRoom);
    nouvelleConnexion.on('envoyer_pseudo', recevoirPseudoJoueur);


}
function gererBouteilleSortieEcran(idBouteille){
  position = gestionnaireObjets.repositionnerBouteille(idBouteille);
}
function gererObstacleSortieEcran(idObstacle){
  position = gestionnaireObjets.repositionnerObstacle(idObstacle);
}
function gererVoitureSortiEcran(idVoiture){
  position = gestionnaireObjets.repositionnerVoiture(idVoiture);
}
function recevoirPseudoJoueur(donnees) {
    console.log('Arrivée de : ' + donnees.pseudo);
    listeJoueur[donnees.idJoueur].joueur.pseudo = donnees.pseudo;
}

function joindreRoom(donnees) {
    console.log("Le joueur " + listeJoueur[donnees.idJoueur].joueur.pseudo + " a rejoin la room : " + listeRoom[donnees.idRoom].nom);
    if (!listeRoom[donnees.idRoom].getListeJoueur().id || donnees.idJoueur != listeRoom[donnees.idRoom].getListeJoueur().id) {
        listeJoueur[donnees.idJoueur].connexion.join(listeRoom[donnees.idRoom].nom);
        listeRoom[donnees.idRoom].setJoueurDansListeRoom(listeJoueur[donnees.idJoueur]);
        //envoyer la liste de tout le monde au joueur venant de se connecter

    }
    listeJoueurRoom = listeRoom[donnees.idRoom].getListeJoueur();
    listeJoueurActifRoomJson = JSON.stringify(listeJoueurRoom);
    io.to(listeRoom[donnees.idRoom].nom).emit('envoie_listeJoueur_room', listeJoueurActifRoomJson);

}

function creerRoom(donnees) {
    nomRoom = donnees.nomRoom;
    idJoueur = donnees.idJoueur;

    var room = new Room(idRoom, nomRoom);
    listeRoom[idRoom] = room;


    //listeJoueur[idJoueur].connexion.join(room.nom);

    //console.log("Le joueur " + idJoueur + "a rejoin la room : " + room.nom);
    /*  listeJoueur.splice(idJoueur, 1);
     listeConnexion.splice(idJoueur, 1);
  */
    var listeRoomJson = JSON.stringify(listeRoom);
    io.emit('nouvelleListeRoom', listeRoomJson);
    listeJoueur[idJoueur].connexion.emit('envoyer_idRoom', room.id);
    idRoom++;

}

initialiser();
