var http = require('http');
var io = require('socket.io');
var sockets;
var nombreClients;
var roomno = 1;

function initialiser() {
    console.log("initialiser()");

    var server = http.createServer(function (req, res) {
        // Send HTML headers and message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello Socket Lover!</h1>');
    });

    server.listen(2000);

    sockets = io.listen(server);
    sockets.on('connection', gererConnexion);
    sockets.in('abc').emit('tata', 'SALUTT');

}

function gererConnexion(connexion) {
    connexion.on('room', function (room) {
        console.log("room : " + room);
        //Utilisateur rejoin la room
        connexion.join(room);
    });

}
initialiser();



