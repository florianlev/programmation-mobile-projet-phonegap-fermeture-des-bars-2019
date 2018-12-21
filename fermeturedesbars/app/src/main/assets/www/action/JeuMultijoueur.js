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
    console.log('debuterPartie');
    isPartieEnCours = true;
    vueJeuMultijoueur.debuterPartie(isPartieEnCours);
  }




  initialiser();
}