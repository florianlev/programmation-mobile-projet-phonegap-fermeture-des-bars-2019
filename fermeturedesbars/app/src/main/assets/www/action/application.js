(function () {

  instance = this;

  var connexionNode;

  function initialiser() {

    this.vueApreciation = new VueApreciation();
    this.vueChoisirPseudo = new VueChoisirPseudo();
    this.vueFinMultijoueur = new VueFinMultijoueur();
    this.vueFinSolo = new VueFinSolo();
    this.vueJeuMultijoueur = new VueJeuMultijoueur();
    this.vueMenuPrincipale = new VueMenuPrincipale();
    this.vueStatistique = new VueStatistique();

    console.log(localStorage['pseudo']);

    window.addEventListener("hashchange", this.naviguer);
    window.location.hash = '#menu-principale';
    if (!localStorage['pseudo']) {
      window.location.hash = '#choisir-pseudo';
    }

    else {
      this.naviguer();
    }

    console.log("WIDTH" + window.innerWidth);
    console.log("HEIGHT" + window.innerHeight);
    this.naviguer();

  }
  naviguer = function (event) {
    if (!window.location.hash || (window.location.hash.match(/^#menu-principale/))) {
      this.vueMenuPrincipale.afficher();
    } else if (window.location.hash.match(/^#choisir-pseudo/)) {
      this.vueChoisirPseudo.afficher();
    } else if (window.location.hash.match(/^#choix-room/)) {


      connexionNode = new ConnexionNode(afficherNouvellesListeRoom,
                                        naviguerAttenteMultiJoueurAvecIdRoom);
      this.vueChoixRoom = new VueChoixRoom(envoyerCreationRoom);
      connexionNode.initierConnexion();
      this.vueChoixRoom.afficher();

    } else if (window.location.hash.match(/^#attente-multijoueur\/([0-9])+/)) {
      hash = window.location.hash.match(/^#attente-multijoueur\/([0-9])+/);
      this.vueAttenteMultijoueur = new VueAttenteMultijoueur();

      this.vueAttenteMultijoueur.afficher(hash[1]);
    } else if (window.location.hash.match(/^#jeu-multijoueur/)) {
      this.vueJeuMultijoueur.afficher();
    } else if (window.location.hash.match(/^#jeu/)) {
      this.jeu = new Jeu();
      this.jeu.demarrerJeu();
      //this.vueJeu.afficher();
    } else if (window.location.hash.match(/^#fin-multijoueur/)) {
      this.vueFinMultijoueur.afficher();
    } else if (window.location.hash.match(/^#fin-solo/)) {
      this.vueFinSolo.afficher(this.jeu.getScore());
    } else if (window.location.hash.match(/^#apreciation/)) {
      this.vueApreciation.afficher();
    } else if (window.location.hash.match(/^#statistique/)) {
      this.vueStatistique.afficher();
    } else if (window.location.hash.match(/^#quitter/)) {

    }
  }


  function envoyerCreationRoom(nomRoom) {
    listeRoom = connexionNode.creerUneRoom(nomRoom);
  }

  function afficherNouvellesListeRoom(listeRoom) {
    this.vueChoixRoom.afficherListeRoom(listeRoom)
  }

  function naviguerAttenteMultiJoueurAvecIdRoom(idRoom){
    window.location.hash = "#attente-multijoueur/"+idRoom;
  }


  initialiser();

})();
