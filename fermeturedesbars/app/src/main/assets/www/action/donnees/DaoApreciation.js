//XMLHttpRequest
var DaoApreciation = function(){
  this.envoyerFormulaire = function(){
    var donneeDuFormulaire = new FormData(this);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200)
      {
          console.log(this.response);
      }
      else if (this.readyState == 4 ) {
        alert("Erreur d'envoie");
      }
    };
    xhr.open('GET', 'http://54.39.144.87/fermetureDesBars/pageEnvoi.php?nom=&aimer=&email=&telephone=&nas=&commentaire=');
        XMLHttpRequest();
      xhr.send(donneeDuFormulaire);
  }

}
