<?php
include_once "baseDeDonne.php";

class ApreciationDAO{
  function ajouterApreciation($donnees){
    global $basededonnees;
    $SQL_AJOUTER_APRECIATION = "INSERT INTO apreciation (nom, aimer, email, telephone, nas, commentaire) VALUES (:nom, :aimer, :email, :telephone, :nas, :commentaire)";
    $requete = $basededonnees->prepare($SQL_AJOUTER_APRECIATION);
    $requete->bindParam(':nom', $donnees['nom'], PDO::PARAM_STR);
    $requete->bindParam(':aimer', $donnees['aimer'], PDO::PARAM_STR);
    $requete->bindParam(':email', $donnees['email'], PDO::PARAM_STR);
    $requete->bindParam(':telephone', $donnees['telephone'], PDO::PARAM_STR);
    $requete->bindParam(':nas', $donnees['nas'], PDO::PARAM_STR);
    $requete->bindParam(':commentaire', $donnees['commentaire'], PDO::PARAM_STR);
    $requete->execute();
    //print_r($requete->errorInfo());
  }
}
?>
