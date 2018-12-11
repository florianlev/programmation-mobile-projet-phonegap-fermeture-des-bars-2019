var Score = function(scene)
{
    scoreInstance = this;
    var score;
    var scoreText;
    function initialiser()
    {
        score = 0;
        actualiserScore();
    }

    this.afficher = function()
    {
        scene.addChild(scoreText);
        scoreText.x = (window.innerWidth/2)-40;//changer le 500px pcq cetais offscreen pour mon phone
        scoreText.y = 60;// 60px tombe 10px en dessou de la barre c mieu que 100px
        scoreText.scaleX = 10;
        scoreText.scaleY = 10;
    }

    function actualiserScore()
    {
        scene.removeChild(scoreText);
        scoreText = new createjs.Text(score.toString());
        scoreInstance.afficher();

    }

    this.augmenterScore = function(scoreAjoute)
    {
       // console.log("la fonction de augmentation est call + score: " + score);
        score = score + scoreAjoute;

        actualiserScore();

    }
    this.getScore = function(){
      return score;
    }
    initialiser();

}
