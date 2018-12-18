var http = require('http');
var socketIo = require('socket.io');
Room = require('./Room.js');
Joueur = require('./Joueur.js');



var listeRoom = [];
var listeJoueur = [];
var listeConnexion = [];
var nombreClients = 0;
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



}

function gererConnexion(connexion) {
    console.log("Un joueur est connecté ! ");


    connexion.id = nombreClients;

    joueur = new Joueur(connexion.id);

    console.log("id : " + connexion.id);
    //listeConnexion[connexion.id] = connexion;
    //listeJoueur[connexion.id] = joueur;
    listeConnexion.push(connexion);
    listeJoueur.push(joueur);
    console.log(listeJoueur);
    //Envoie de la liste des rooms
    connexion.emit('nouvelleListeRoom', { listeRoom: JSON.stringify(listeRoom), idJoueur: joueur.id });

    nombreClients++;
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


function creerRoom(donnees) {
    nomRoom = donnees.nomRoom;
    idJoueur = donnees.idJoueur;
    var room = new Room(idRoom, nomRoom);
    listeRoom[idRoom] = room;
    console.log(listeConnexion);
    room.setJoueurDansListeRoom(listeJoueur[idJoueur]);
    room.setConnexionJoueurDansListeConnexion(listeConnexion[idJoueur]);
    listeConnexion[idJoueur].join(room.nom);
    console.log("Le joueur " + idJoueur + "a rejoin la room : " + room.nom);
    listeJoueur.splice(idJoueur, 1);
    listeConnexion.splice(idJoueur, 1);



    var listeRoomJson = JSON.stringify(listeRoom);

    //console.log(listeRoomJson);

    //mise a jour des liste de room
    //io.emit('nouvelleListeRoom', listeRoomJson);

    if (listeConnexion) {
        for (i = 0; i < listeConnexion.length; i++) {
            listeConnexion[i].emit('nouvelleListeRoom', listeRoomJson);
        }
    }

    idRoom++;

}

initialiser();



