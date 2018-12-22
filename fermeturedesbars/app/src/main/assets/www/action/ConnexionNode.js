function ConnexionNode() {

    var connexion;
    var idJoueurActuel;
    var joueurActuel;

    function initialiser() {
        console.log("initialiserConnexionNode");
        connexion = io.connect('http://localhost:2000');
    }

    this.initierConnexion = function () {

        connexion.on('connect', etablirConnexion);

        connexion.on('envoyerIdJoueur', function (idJoueur) {
            idJoueurActuel = idJoueur;
            connexion.emit('envoyer_pseudo', {
                pseudo: localStorage['pseudo'],
                idJoueur: idJoueurActuel
            });
        });
        connexion.on('envoyer_joueur', recevoirJoueur);
        connexion.on('nouvelleListeRoom', recevoirNouvellesListeRoom);
        connexion.on('envoyer_idRoom', transmettreIdRoom);
        connexion.on('envoie_listeJoueur_room', recevoirListeJoueurRoom);
        connexion.on('envoyer_joueur_pret_client', afficherJoueurPret);
        connexion.on('commencer_partie', commencer);
        connexion.on('liste_joueurs_charger', gererDebutPartie);
        connexion.on('envoyer_positions_adversaire_niveau_alcool', recevoirPositionAdversaireEtNiveauAlcool);
        connexion.on('repositionne_objet', repositionnerUnObjet);
    }

    function repositionnerUnObjet(type, idObjet, position){
      document.body.dispatchEvent(new CustomEvent('repositionne_objet', {
          detail: {
              type: type,
              id: idObjet,
              position: position
          }
      }));
    }

    function afficherJoueurPret(joueur) {
        document.body.dispatchEvent(new CustomEvent('afficher_joueur_pret', {
            detail: {
                joueur: joueur
            }
        }));
    }

    function transmettreIdRoom(idRoom) {
        document.body.dispatchEvent(new CustomEvent('transmetre_id_room', {
            detail: {
                idRoom: idRoom
            }
        }));
    }

    function commencer(listeJoueurJson) {
        console.log('commencer_partie');
        document.body.dispatchEvent(new CustomEvent('commencer_multijoueur', {
            detail: {
                listeJoueur: JSON.parse(listeJoueurJson)
            }
        }));
    }

    function etablirConnexion(event) {
        console.log('etablirConnexion()');
    }

    function recevoirJoueur(joueur) {
        joueurActuel = joueur;
        document.body.dispatchEvent(new CustomEvent('cree_joueur', {
            detail: {
                joueur: joueur
            }
        }));
    }

    this.creerUneRoom = function (nom) {
        console.log("creerUneRoom");
        connexion.emit('creer_room', {
            nomRoom: nom,
            idJoueur: joueurActuel.id
        });
    }

    function recevoirNouvellesListeRoom(listeRoom) {
        listeRoom = JSON.parse(listeRoom);
        document.body.dispatchEvent(new CustomEvent('recevoir_nouvelle_liste_room', {
            detail: {
                listeRoom: listeRoom
            }
        }));
    }

    this.rejoindreUneRoom = function (idRoom) {
        connexion.emit('joindre_room', {
            idRoom: idRoom,
            idJoueur: joueurActuel.id
        });
    }

    function recevoirListeJoueurRoom(listeJoueurRoomJSON) {
        console.log("recevoirListeJoueurRoom");
        listeJoueurRoom = JSON.parse(listeJoueurRoomJSON);
        document.body.dispatchEvent(new CustomEvent('afficherListe_liste_joueur', {
            detail: {
                listeJoueurRoom: listeJoueurRoom
            }
        }));
    }

    this.envoyerJoueurPret = function () {
        connexion.emit('envoyer_joueur_pret_serveur', joueurActuel.id);
    }

    this.envoyerJoueurEstCharger = function (idJoueur) {
        connexion.emit('elements_joueur_est_charger', idJoueur);
    }

    function gererDebutPartie() {
        console.log('gererDebutPartie');
        document.body.dispatchEvent(new CustomEvent("debuterpartie"));

    }

    this.envoyerPositionsEtNiveauAlcool = function (evenement) {
        connexion.emit('envoyer_positions_et_niveau_alcool', {
            positions: evenement.detail.positions,
            niveauAlcool: evenement.detail.niveauAlcool,
            idJoueur: idJoueurActuel,
            isJoueurMort: evenement.detail.isJoueurMort
        });
    }

    function recevoirPositionAdversaireEtNiveauAlcool(donnees) {
        document.body.dispatchEvent(new CustomEvent('transmettrepositionsadversaireetniveaualcool', {
            detail: {
                positions: donnees.positions,
                niveauAlcool : donnees.niveauAlcool,
                idJoueur: donnees.idJoueur,
                isJoueurMort:donnees.isJoueurMort
            }
        }));
    }

    this.partieTerminer = function(){
      connexion.emit('partieTerminer');
    }

    initialiser();


}
