var JeuMultijoueur = function (listeJoueur, connexionNode,joueurActuel) {

  var vueJeuMultijoueur;
  var isPartieEnCours = false;
  var joueurActuel;
  var niveauAlcool;


  function initialiser() {

    console.log('jeuMultijoueur');

    vueJeuMultijoueur = new VueJeuMultijoueur(listeJoueur);

    document.body.addEventListener("fondecranpret", chargerJoueurEtObjet);
    document.body.addEventListener("niveaualcoolestcharger", gererNiveauAlcoolCharger);
    document.body.addEventListener("joueurestcharger", envoyerJoueurEstCharger);
    document.body.addEventListener("debuterpartie", debuterPartie);
    document.body.addEventListener("envoyerpositionsetniveaualcool", envoyerPositionsEtNiveauAlcool);
    document.body.addEventListener("transmettrepositionsadversaireetniveaualcool", transmettrePositionsAdversaireNiveauAlcool);
    document.body.addEventListener("repositionne_objet",repositionneObjet);
    document.body.addEventListener("collisionavecbouteille", colisionBouteille);
    document.body.addEventListener("collisionavecobjet", mortJoueur);
    document.body.addEventListener("partieTerminer", terminerJeu);
  }
  function terminerJeu(){
    console.log('vrm terminer');
    isPartieEnCours = null;
    joueurActuel = null;
    niveauAlcool = null;

    document.body.removeEventListener("fondecranpret", chargerJoueurEtObjet);
    document.body.removeEventListener("niveaualcoolestcharger", gererNiveauAlcoolCharger);
    document.body.removeEventListener("joueurestcharger", envoyerJoueurEstCharger);
    document.body.removeEventListener("debuterpartie", debuterPartie);
    document.body.removeEventListener("envoyerpositionsetniveaualcool", envoyerPositionsEtNiveauAlcool);
    document.body.removeEventListener("transmettrepositionsadversaireetniveaualcool", transmettrePositionsAdversaireNiveauAlcool);
    document.body.removeEventListener("repositionne_objet",repositionneObjet);
    document.body.removeEventListener("collisionavecbouteille", colisionBouteille);
    document.body.removeEventListener("collisionavecobjet", mortJoueur);
    document.body.removeEventListener("partieTerminer", terminerJeu);

    connexionNode.partieTerminer();

    window.location.hash = "fin-multijoueur";
  }
  function mortJoueur(evenement){
    vueJeuMultijoueur.setEtatJoueurEcraser();
    console.log('joueurMort')
  }
  function colisionBouteille(evenement){
    console.log('collision');
    vueJeuMultijoueur.augmenterNiveauAlcool();
  }
  this.getScore = function(){
    return vueJeuMultijoueur.getScore();
  }
  function repositionneObjet(evenement){
    switch (evenement.detail.type) {
      case 'bouteille':
        vueJeuMultijoueur.repositionnerUneBouteille(evenement.detail.id, evenement.detail.position);
        break;
      case 'obstacle':
        vueJeuMultijoueur.repositionnerUnObjet(evenement.detail.id, evenement.detail.position);
        break;
      case 'voiture':
        vueJeuMultijoueur.repositionnerUneVoiture(evenement.detail.id, evenement.detail.position);
        break;
    }
  }
  function chargerJoueurEtObjet() {
    vueJeuMultijoueur.chargerJoueurEtObjet();
  }

  this.demarrerJeu = function () {
    vueJeuMultijoueur.afficher();
    niveauAlcool = 100;
  }

  function gererNiveauAlcoolCharger(evenement) {
    console.log("gererNiveauAlcoolCharger");
    vueJeuMultijoueur.setNiveauAlcool(niveauAlcool);
  }

  //Envoi au serveur que le joueur est prêt pour le jeu
  function envoyerJoueurEstCharger() {
    connexionNode.envoyerJoueurEstCharger(joueurActuel.id);
  }

  function debuterPartie(){
    isPartieEnCours = true;
    vueJeuMultijoueur.debuterPartie(isPartieEnCours);
  }

  function envoyerPositionsEtNiveauAlcool(evenement){
    connexionNode.envoyerPositionsEtNiveauAlcool(evenement);
  }

  function transmettrePositionsAdversaireNiveauAlcool(evenement){
    vueJeuMultijoueur.transmettrePositionsAdversaireNiveauAlcool(evenement)
  }





  initialiser();
}
