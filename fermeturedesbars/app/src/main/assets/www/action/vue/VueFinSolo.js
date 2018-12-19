var VueFinSolo = function () {

  var contenuPage;

  function initialiser() {
    contenuPage = document.getElementById("fin-solo").innerHTML;
  }

  this.afficher = function (pointage) {
    document.body.innerHTML = contenuPage;

    daoStatistique = new DaoStatistique();
    //ajoute au table des score le resultat de la partie
    daoStatistique.ajouterPartie(pointage, localStorage['pseudo']);
    //affiche le score de la partie a l'ecran
    tagScorePartie = document.getElementsByTagName('h1')[0];
    tagScorePartie.innerHTML += ": " + pointage;

    statistique = daoStatistique.recupererToutLesStatistique();
    meilleurScore = [];
    //console.log(statistique);
    //cherche les 5 meilleur scores dans les statistique et les place dans meilleurScore;
    //console.log(statistique.length);
    if(statistique.length > 5){
      //console.log('in');
      for(iMeilleurScore = 0; iMeilleurScore < 5; iMeilleurScore++){
        //console.log('loop1');
        for(iStatistique = 0; iStatistique < statistique.length; iStatistique++){
          //console.log('loop2');
          if(statistique[iStatistique]){
            //console.log('stat defined');
            if(!meilleurScore[iMeilleurScore]){
              meilleurScore[iMeilleurScore] = statistique[iStatistique];
              meilleurScore['id'] = iStatistique; //set l'id de la statistique utiliser pour la suprimer lorseque on sait que ces la plus haute
              //console.log("defining");
            }else if (meilleurScore[iMeilleurScore].score < statistique[iStatistique].score) {
              meilleurScore[iMeilleurScore] = statistique[iStatistique];
              meilleurScore['id'] = iStatistique;
              //console.log("ishigher");
            }
          }
        }
        delete(statistique[meilleurScore['id']]);// unset la variable
      }
    }else{
      meilleurScore = statistique;
    }
    //ajoute le html des score dans la variable html
    html = "";
    for(iMeilleurScore = 0; iMeilleurScore < meilleurScore.length; iMeilleurScore++){
      html += "<div><p class='scores'>" + meilleurScore[iMeilleurScore].pseudo + " : </p><p class='score'>" + meilleurScore[iMeilleurScore].score + "</p></div>";
    }
    //affiche les meilleurs score sur la page
    listeScore = document.getElementById("liste-score");
    listeScore.innerHTML = html;
  }

  initialiser();

}
