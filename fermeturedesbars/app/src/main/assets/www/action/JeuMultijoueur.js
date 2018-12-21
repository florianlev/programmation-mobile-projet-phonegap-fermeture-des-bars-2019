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
