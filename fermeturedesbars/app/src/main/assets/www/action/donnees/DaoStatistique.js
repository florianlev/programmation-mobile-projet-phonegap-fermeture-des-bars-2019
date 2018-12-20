var DaoStatistique = function () {

  this.recupererToutLesStatistique = function () {
    return JSON.parse(localStorage['statistique']);
  }

  this.ajouterPartie = function (partie, pseudo) {
    //console.log(partie + pseudo);
    score = {"score":partie, "pseudo":pseudo};
    //console.log(score);

    if(!localStorage['statistique']){
      statistique = [];
      statistique[0] = score;
      localStorage['statistique'] = JSON.stringify(statistique);
    }else{

      statistique = JSON.parse(localStorage['statistique']);
      //console.log(statistique[0]);
      statistique[statistique.length] = score;
      localStorage['statistique'] = JSON.stringify(statistique);
    }
  }

}
