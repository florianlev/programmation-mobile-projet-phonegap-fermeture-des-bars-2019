function NiveauAlcool(scene){

    var niveauAlcool;
    var niveau = 50;
    var pointsParSecondes;
    function initialiser(){
      pointsParSecondes = 2;
        niveauAlcool = new ProgressBar.Line('#bar', {
          strokeWidth: 2,
          easing: 'easeInOut',
          duration: 1000/60,
          color: '#0077CC',
          trailColor: '#eee',
          trailWidth: 45,
          svgStyle: {width: '100%', height: '100%'}
        });
        niveauAlcool.animate(0.5);

        setInterval(diminution, 1000/60);
      }
      this.ajouterNiveau = function(ajout){
        niveau+=ajout;
        if(niveau > 100)niveau = 100;

        niveauAlcool.animate(niveau/100);
      }
      function diminution(){
        niveau-=pointsParSecondes/60;
        if(niveau <= 0){
          niveau = 0;
          document.body.dispatchEvent(new CustomEvent("PARTIE_TERMINER"));
        }
        niveauAlcool.animate(niveau/100);
      }
    initialiser();
}
