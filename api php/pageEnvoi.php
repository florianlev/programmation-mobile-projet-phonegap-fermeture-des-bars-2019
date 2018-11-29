<?php
include_once "ApreciationDAO.php";
if(!empty($_GET)){
  $filtreValeurs = array();
  $filtreValeurs['nom'] = FILTER_SANITIZE_ENCODED;
  $filtreValeurs['aimer'] = FILTER_SANITIZE_ENCODED;
  $filtreValeurs['email'] = FILTER_SANITIZE_ENCODED;
  $filtreValeurs['telephone'] = FILTER_SANITIZE_ENCODED;
  $filtreValeurs['nas'] = FILTER_SANITIZE_ENCODED;
  $filtreValeurs['commentaire'] = FILTER_SANITIZE_ENCODED;
  $listeValeurs = filter_var_array($_GET, $filtreValeurs);

  $dao = new ApreciationDAO();
  $dao->ajouterApreciation($listeValeurs);
}else{
  echo "erreur";
}
 ?>
