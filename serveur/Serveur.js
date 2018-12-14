var http = require('http');
var socketIo = require('socket.io');
Room = require('./Room.js');


const listeRooms = ['room1', 'room2', 'room3'];

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

    connexion.on("joindre_room", (room) => {

        if (listeRooms.includes(room)) {
            connexion.join(room);
            console.log("Le joueur a rejoin la room : " + room);
            io.in(room).emit('nouvel_utilisateur', "Nouveau a rejoin la room : " + room);
            //console.log(findRooms());

            //Listage de room A VOIR
            var nsp = io.of('/');
            var rooms = nsp.adapter.rooms;
            
            console.log(rooms);
        } else {
            console.log("erreur la room n'existe pas");
        }
    });
}

initialiser();



