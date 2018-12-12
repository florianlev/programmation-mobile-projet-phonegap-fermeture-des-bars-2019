(function () {

  instance = this;

  function initialiser() {

    this.vueApreciation = new VueApreciation();
    this.vueAttenteMultijoueur = new VueAttenteMultijoueur();
    this.vueChoisirPseudo = new VueChoisirPseudo();
    this.vueFinMultijoueur = new VueFinMultijoueur();
    this.vueFinSolo = new VueFinSolo();
    this.vueJeu = new VueJeu();
    this.vueChoixRoom = new VueChoixRoom();
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
    }else if (window.location.hash.match(/^#choix-room/)){
      this.vueChoixRoom.afficher();
    } else if (window.location.hash.match(/^#attente-multijoueur/)) {
      this.vueAttenteMultijoueur.afficher();
    } else if (window.location.hash.match(/^#jeu-multijoueur/)) {
      this.vueJeuMultijoueur.afficher();
    } else if (window.location.hash.match(/^#jeu/)) {
      this.vueJeu.afficher();
    } else if (window.location.hash.match(/^#fin-multijoueur/)) {
      this.vueFinMultijoueur.afficher();
    } else if (window.location.hash.match(/^#fin-solo/)) {
      this.vueFinSolo.afficher(this.vueJeu.getScore());
    } else if (window.location.hash.match(/^#apreciation/)) {
      this.vueApreciation.afficher();
    } else if (window.location.hash.match(/^#statistique/)) {
      this.vueStatistique.afficher();
    } else if (window.location.hash.match(/^#quitter/)) {
      //rien ne marche ffs.
      //device.exitApp();
      //navigator.app.exitApp();
      //cordova.plugins.exit();
    }
  }

  initialiser();

})();
