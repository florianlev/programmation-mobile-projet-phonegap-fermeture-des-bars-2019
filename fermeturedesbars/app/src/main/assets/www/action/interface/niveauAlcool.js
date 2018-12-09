function NiveauAlcool(scene){

    var niveauAlcool;
    function initialiser(){
      niveauAlcool = new ProgressBar.Line('#bar', {
        strokeWidth: 2,
        easing: 'easeInOut',
        duration: 800,
        color: '#0077CC',
        trailColor: '#eee',
        trailWidth: 45,
        svgStyle: {width: '100%', height: '100%'}
      });
      niveauAlcool.animate(1);

      }

    initialiser();
}
