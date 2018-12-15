var Jeu = function () {

    var vueJeu;
    var score;
    var niveauAlcool;
    var compteurBouteilleVerteChargee;

    function initialiser() {
        vueJeu = new VueJeu(terminerJeu, 
                            gererCollisionAvecBouteille,
                            gererBouteilleSortieEcran,
                            gererBouteilleVerteChargee);

    }



    this.demarrerJeu = function () {

        vueJeu.afficher();
        score = 0;
        niveauAlcool = 100;
        compteurBouteilleVerteChargee = 0;
    }

    function terminerJeu() {
        vueJeu.stopperJeu(finaliserJeu);

    }

    function gererCollisionAvecBouteille(evenement) {
        console.log("gererCollisionBouteille");
        score += 10;
        vueJeu.setScore(score);
        niveauAlcool+= 10;
        if (niveauAlcool > 100) niveauAlcool = 100;
        vueJeu.setNiveauAlcool(niveauAlcool);
        console.log("grerCollisionAvecBoteille" + evenement.detail.idBouteille);

        vueJeu.ajouterBouteille( evenement.detail.idBouteille, getNombreHazard(0,5000));
    }
    
    function gererBouteilleSortieEcran(evenement){
        console.log("COUCOU : " + evenement.detail.idBouteille);
        vueJeu.ajouterBouteille( evenement.detail.idBouteille, getNombreHazard(0,5000));

    }

    function gererBouteilleVerteChargee(evenement){

        compteurBouteilleVerteChargee++;
        if(compteurBouteilleVerteChargee == MONDE.NOMBRE_BOUTEILLE - 1){
            for(indiceBouteille = 0; indiceBouteille < MONDE.NOMBRE_BOUTEILLE; indiceBouteille++){
                vueJeu.ajouterBouteille( indiceBouteille, getNombreHazard(0,5000));

            }

        }
  
      }


    function getNombreHazard(min, max) {
        return Math.random() * (max - min) + min;
      }

    function finaliserJeu() {
        window.location.hash = "fin-solo";
    }
    initialiser();

}