var VueJeu = function(){
  var contenuPage;
  var canvas;

  constructeur = function(){
    contenuPage = document.getElementById("jeu").innerHTML;
    
  }
  this.afficher = function(){
    document.body.innerHTML = contenuPage;
    canvas = document.getElementById('dessin');
    contexte = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  constructeur();
}
