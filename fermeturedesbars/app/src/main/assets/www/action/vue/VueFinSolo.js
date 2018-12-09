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
    //cherche les 5 meilleur scores dans les statistique et les place dans meilleurScore;
    if(statistique.length > 5){
      for(iMeilleurScore = 0; iMeilleurScore < 5; iMeilleurScore++){
        for(iStatistique = 0; iStatistique < statistique.lenght; iStatistique++){
          if(statistique[iStatistique]){
            if(!meilleurScore[iMeilleurScore]){
              meilleurScore[iMeilleurScore] = statistique[iStatistique].score;
              meilleurScore[id] = iStatistique; //set l'id de la statistique utiliser pour la suprimer lorseque on sait que ces la plus haute
            }else if (meilleurScore[iMeilleurScore] < statistique[iStatistique.score]) {
              meilleurScore[iMeilleurScore] = statistique[iStatistique].score;
              meilleurScore[id] = iStatistique;
            }
          }
        }
        delete(statistique[meilleurScore[id]]);// unset la variable
      }
    }else{
      meilleurScore = statistique;
    }
    //ajoute le html des score dans la variable html
    html = "";
    for(iMeilleurScore = 0; iMeilleurScore < meilleurScore.length; iMeilleurScore++){
        html += "<span><p>" + meilleurScore[iMeilleurScore].nom + "</p><p>" + meilleurScore[iMeilleurScore].score + "</p></span>";
    }
    //affiche les meilleurs score sur la page
    listeScore = document.getElementById("liste-score");
    listeScore.innerHTML = html;
  }

  initialiser();

}
