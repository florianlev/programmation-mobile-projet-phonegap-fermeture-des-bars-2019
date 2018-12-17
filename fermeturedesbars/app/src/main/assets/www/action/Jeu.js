var Jeu = function () {

    var vueJeu;
    var score;
    var niveauAlcool;
    var compteurBouteilleVerteChargee;
    var compteurObstacleCharge;
    var compteurVoitureCharge;


    function initialiser() {
        vueJeu = new VueJeu(terminerJeu,
            gererCollisionAvecBouteille,
            gererBouteilleSortieEcran,
            gererBouteilleVerteChargee,
            gererNiveauAlcoolCharger,
            gererObstacleCharge,
            gererObstacleSortieEcran,
            gererVoitureChargee,
            gererVoitureSortiEcran);

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
        niveauAlcool = vueJeu.getNiveauAlcool();

        if (niveauAlcool >= 90) niveauAlcool = 100;
        else niveauAlcool += 10;
        
        vueJeu.setNiveauAlcool(niveauAlcool)
        console.log("grerCollisionAvecBoteille" + evenement.detail.idBouteille);

        vueJeu.ajouterBouteille(evenement.detail.idBouteille, getNombreHazard(0, 5000));
    }

    function gererBouteilleSortieEcran(evenement) {
        vueJeu.ajouterBouteille(evenement.detail.idBouteille, getNombreHazard(0, 5000));

    }

    function gererBouteilleVerteChargee(evenement) {

        compteurBouteilleVerteChargee++;
        if (compteurBouteilleVerteChargee == MONDE.NOMBRE_BOUTEILLE - 1) {
            for (indiceBouteille = 0; indiceBouteille < MONDE.NOMBRE_BOUTEILLE; indiceBouteille++) {
                vueJeu.ajouterBouteille(indiceBouteille, getNombreHazard(0, 5000));
            }
        }
    }

    this.getScore = function(){
        return score;
    }

    function gererObstacleCharge(evenement){
        compteurObstacleCharge++;
        if (compteurObstacleCharge == MONDE.NOMBRE_OBSTACLE - 1) {
            for (indiceObstacle = 0; indiceObstacle < MONDE.NOMBRE_OBSTACLE; indiceObstacle++) {
                vueJeu.ajouterObstacle(indiceObstacle, getNombreHazard(0, 5000));
            }
        }
    }

    function gererObstacleSortieEcran(evenement){
        vueJeu.ajouterObstacle(evenement.detail.idObstacle, getNombreHazard(0, 5000));

    }

    function gererVoitureChargee(evenement){
        compteurVoitureCharge++;
        if (compteurVoitureCharge == MONDE.NOMBRE_VOITURE - 1) {
            for (indiceVoiture = 0; indiceVoiture < MONDE.NOMBRE_VOITURE; indiceVoiture++) {
                vueJeu.ajouterVoiture(indiceVoiture, getNombreHazard(0, 5000));
            }
        }
    }

    function gererVoitureSortiEcran(evenement){
        console.log("gererVoitureSortiEcran" + evenement.detail.idVoiture);
        vueJeu.ajouterVoiture(evenement.detail.idVoiture, getNombreHazard(0, 5000));

    }

    function gererNiveauAlcoolCharger(evenement) {
        console.log("gererNiveauAlcoolCharger");
        vueJeu.setNiveauAlcool(niveauAlcool);
    }

    function getNombreHazard(min, max) {
        return Math.random() * (max - min) + min;
    }

    function finaliserJeu() {
        window.location.hash = "fin-solo";
    }
    initialiser();

}