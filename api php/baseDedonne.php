<?php
    $hostname = "54.39.144.87";
    $databaseName = "fermeture_des_bars";
    $username = "postgres";
    $password = "9182";

    $dsn = 'pgsql:dbname='.$databaseName.';host='.$hostname;
    $basededonnees = new PDO($dsn, $username, $password);
?>
