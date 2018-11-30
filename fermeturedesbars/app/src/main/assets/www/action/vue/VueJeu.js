var VueJeu = function(){
  var contenuPage;
  var canvas;
  var scene;

  function initialiser(){
    contenuPage = document.getElementById("jeu").innerHTML;
    canvas = document.getElementById('dessin');
    contexte = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
    
  }
  initialiser();
}
