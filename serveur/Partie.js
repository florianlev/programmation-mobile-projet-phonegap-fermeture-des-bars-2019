function Partie(idRoom, nomRoom, listeJoueur) {

  GestionnaireObjets = require('./objets/GestionnaireObjets.js');
  this.idRoom = idRoom;
  this.nomRoom = nomRoom;
  var gestionnaireObjets;
  var timeoutBoucle;
  var event = require('events');
  var emiter = new event.EventEmitter();
  var vitesse = 1000 / 60;
  var debutInterval;
  var partieEnCours = false;
  var nombreJoueurCharger = 0;
  require('./JEU.js');
  function initialiser() {
    scaleVitesse = global.JEU.WIDTH / 1920;
    vitesseRoute = global.JEU.VITESSE_JEU * scaleVitesse;
    for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
      // Ajouter les evenements necessaire ICI pour le jeu
      listeJoueur[indiceListeJoueur].connexion.on('elements_joueur_est_charger', gererJoueurCharger);
      listeJoueur[indiceListeJoueur].connexion.on('envoyer_positions_et_niveau_alcool', gererPositionsEtNiveauAlcoolJoueur);
    }

    emiter.on('bouteille_sortie_ecran', gererBouteilleSortieEcran);
    emiter.on('obstacle_sortie_ecran', gererObstacleSortieEcran);
    emiter.on('voiture_sortie_ecran', gererVoitureSortiEcran);
    emiter.on('repositionner_objet', repositionneObjet);

    gestionnaireObjets = new GestionnaireObjets(emiter);

    intervalJeu = setInterval(boucleJeu, 1000 / 60);
  }


  //Calcul position des objets et des bouteilles
   function boucleJeu() {

     var nouvelInterval = Date.now();



     //SI au premier instant du jeu on initialise le debut de l'interval a quelque chose
     if (!debutInterval) {
       debutInterval = Date.now();
     }

    gestionnaireObjets.repositionnerObjets(Bouteille, nouvelInterval);
    gestionnaireObjets.repositionnerObjets(Obstacle, nouvelInterval);
    gestionnaireObjets.repositionnerObjets(Voiture, nouvelInterval);


    //Si le nouveau temps est plus grand que l'accelaration souhaiter par rapport au début de l'interval
     if (nouvelInterval - debutInterval >= 20) {
      vitesseRoute += 0.005;

      debutInterval = nouvelInterval;
    }

    //Appliquer les déplacements
    gestionnaireObjets.deplacerLesObjets(vitesseRoute);
  }


  function gererJoueurCharger(idJoueur) {
    nombreJoueurCharger++;
    console.log('nbreJoueur : ' + nombreJoueurCharger);

    //Si les joueurs sont charger débuter la partie
    if (nombreJoueurCharger == 2) {
      console.log('nombreJoueurCharger >= 2');
      partieEnCours = true;
      console.log(nomRoom);
      io.to(nomRoom).emit('liste_joueurs_charger', partieEnCours);
    }
  }

  function gererPositionsEtNiveauAlcoolJoueur(donnees) {

    for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {

      if (donnees.idJoueur == listeJoueur[indiceListeJoueur].joueur.id) {
        listeJoueur[indiceListeJoueur].joueur.positions.x = donnees.positions.x;
        listeJoueur[indiceListeJoueur].joueur.positions.y = donnees.positions.y;
        listeJoueur[indiceListeJoueur].joueur.niveauAlcool = donnees.niveauAlcool;
        listeJoueur[indiceListeJoueur].joueur.isJoueurMort = donnees.isJoueurMort;

        for (indice2ListeJoueur = 0; indice2ListeJoueur < listeJoueur.length; indice2ListeJoueur++) {

          if (donnees.idJoueur != listeJoueur[indice2ListeJoueur].joueur.id) {

            listeJoueur[indice2ListeJoueur].connexion.emit('envoyer_positions_adversaire_niveau_alcool', {
              positions: listeJoueur[indiceListeJoueur].joueur.positions,
              niveauAlcool : listeJoueur[indiceListeJoueur].joueur.niveauAlcool,
              idJoueur: listeJoueur[indiceListeJoueur].joueur.id,
              isJoueurMort: listeJoueur[indiceListeJoueur].joueur.isJoueurMort
            });
          }
        }
      }
    }
  }
  function repositionneObjet(type, id, position){
    for(iJoueur = 0; iJoueur < listeJoueur.length; iJoueur++){
      if(listeJoueur[iJoueur].connexion){
        listeJoueur[iJoueur].connexion.emit('repositionne_objet', type, id, position);
        //console.log('envoyer');
      }
      //console.log(type + id + " " + position.x + " " + position.y);
    }
  }
  function gererBouteilleSortieEcran(idBouteille) {
    //console.log('bouteille sortie')
    gestionnaireObjets.afficherBouteilleDansLeTemps(idBouteille, getNombreHazard(0, 3000));
  }

  function gererObstacleSortieEcran(idObstacle) {
    //console.log('obstacle sortie')
    gestionnaireObjets.afficherObstacleDansLeTemps(idObstacle, getNombreHazard(0, 3000));
  }

  function gererVoitureSortiEcran(idVoiture) {
    //console.log('voiture sortie')
    gestionnaireObjets.afficherVoitureDansLeTemps(idVoiture, getNombreHazard(0, 3000));
  }
  function getNombreHazard(min, max) {
      return Math.random() * (max - min) + min;
  }

  initialiser();
}

module.exports = Partie;
