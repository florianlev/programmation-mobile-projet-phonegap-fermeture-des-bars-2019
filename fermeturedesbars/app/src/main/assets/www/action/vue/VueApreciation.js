var AjouterVueApreciation = (function(){
    var pageAjouterApreciation = document.getElementById("apreciation").innerHTML;

    return function(actionEnregistrerApreciation)
    {

        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageAjouterEquipe;

            var formulaireAjouter = document.getElementById("formulaireapreciation");
            formulaireAjouter.addEventListener("submit",enregistrerApreciation);

        }

        var enregistrerApreciation = function(evenement)
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
                      //  alert(aimer);
                    }

		          else if(document.getElementById("non").checked)
                    {
                        var aimer = document.getElementById("non").value;
                      //  alert(aimer);
                    }

            var equipe = new Equipe(nom, stade, historique, null);

            actionEnregistrerApreciation();
        }

    };
})();
