var http = require('http');
var io = require('socket.io');

var nombreClients;

function initialiser() {
    console.log("initialiser()");

    var server = http.createServer(function (req, res) {
        // Send HTML headers and message
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello Socket Lover!</h1>');
    });

    server.listen(2000);

    var socket = io.listen(server);
    socket.on('connection', gererConnexion);
}

function gererConnexion(connexion) {
    console.log(connexion);
}

initialiser();
