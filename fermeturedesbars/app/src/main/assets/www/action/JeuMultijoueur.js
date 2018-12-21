var JeuMultijoueur = function (listeJoueur, connexionNode) {

  var vueJeuMultijoueur;
  var isPartieEnCours = false;
  var joueurActuel;
  var niveauAlcool;


  function initialiser() {

    vueJeuMultijoueur = new VueJeuMultijoueur(listeJoueur);

    document.body.addEventListener("fondecranpret", chargerJoueurEtObjet);
    document.body.addEventListener("niveaualcoolestcharger", gererNiveauAlcoolCharger);
    document.body.addEventListener("joueurestcharger", envoyerJoueurEstCharger);
    document.body.addEventListener("debuterPartie", debuterPartie);



    for (indiceListeJoueur = 0; indiceListeJoueur < listeJoueur.length; indiceListeJoueur++) {
      if (listeJoueur[indiceListeJoueur].getIsJoueurActuel()) joueurActuel = listeJoueur[indiceListeJoueur];
    }
  }

  function chargerJoueurEtObjet() {
    vueJeuMultijoueur.chargerJoueurEtObjet(joueur);
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




  initialiser();
}