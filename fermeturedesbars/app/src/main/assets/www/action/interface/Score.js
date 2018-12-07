var Score = function(scene)
{
    scoreInstance = this;
    var score;
    var scoreText;
    function initialiser()
    {
        score = 10;
        actualiserScore();
    }

    this.afficher = function()
    {
        scene.addChild(scoreText);
        scoreText.x = 500;
        scoreText.y = 100;
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
    initialiser();

}