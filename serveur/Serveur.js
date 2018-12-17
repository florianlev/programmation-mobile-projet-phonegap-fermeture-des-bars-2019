var http = require('http');
var socketIo = require('socket.io');
Room = require('./Room.js');



var listeRoom = [];
var listeJoueur = [];
var listeConnexion = [];
var nombreClients;


function initialiser() {
    console.log("initialiser()");

    var server = http.createServer(function (req, res) {
        // Send HTML headers and message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello Socket Lover!</h1>');
    });

    server.listen(2000);
    io = socketIo.listen(server);


    io.on('connection', gererConnexion);


}

function gererConnexion(connexion) {
    console.log("Un joueur est connecté ! ");
    nombreClients++;

    connexion.id = nombreClients;

    //joueur = new Joueur(connexion.id);

    listeConnexion[connexion.id] = connexion;
    //listeJoueur[connexion.id] = joueur;
    //io.emit('nouvelleListeRoom',listeRoom);


    connexion.on("joindre_room", (room) => {

        if (listeRooms.includes(room)) {
            connexion.join(room);
            console.log("Le joueur a rejoin la room : " + room);
            io.in(room).emit('nouvel_utilisateur', "Nouveau a rejoin la room : " + room);
            //console.log(findRooms());


        } else {
            console.log("erreur la room n'existe pas");
        }
    });

    connexion.on('creer_room', creerRoom);

}

function creerRoom(nom) {
    console.log(nom);
    var room = new Room(nom);
    listeRoom[nom] = room;
   //console.log(listeRoom);

    var listeRoomJson = JSON.stringify(listeRoom);

    console.log(listeRoomJson);

    for (var idConnexion in listeConnexion) {
        if (listeConnexion[idConnexion]) {
            listeConnexion[idConnexion].emit('nouvelleListeRoom', listeRoom);
        }
    }
    //io.emit('nouvelleListeRoom', listeRoom);
}

initialiser();



