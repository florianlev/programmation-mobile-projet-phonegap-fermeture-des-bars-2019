var VueApreciation = function () {

  var contenuPage;

  function initialiser() {
    contenuPage = document.getElementById("apreciation").innerHTML;
  }

  this.afficher = function () {
    document.body.innerHTML = contenuPage;
    var formulaireAjouter = document.getElementById("formulaireapreciation");
    formulaireAjouter.addEventListener("submit",enregistrerEquipe);
  }
  var enregistrerEquipe = function(evenement)
          {

              evenement.preventDefault();

              var nom = document.getElementById("nom").value;
              var courriel = document.getElementById("courriel").value;
              var telephone = document.getElementById("phone").value;
              var nas = document.getElementById("nas").value;
              var commentaire = document.getElementById("commentaire").value;

              if(document.getElementById("oui").checked)
                    {
                        var aimer = document.getElementById("oui").value;
                        alert(aimer);
                    }

		          else if(document.getElementById("non").checked)
                    {
                        var aimer = document.getElementById("non").value;
                        alert(aimer);
                    }

              initialiser();
          }


}
