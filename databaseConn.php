<?php

$host = "sql106.epizy.com";
$port = "3306";
$username = "epiz_30672828";
$password = "VbD9A2aRFUkF8sN";
$database = "epiz_30672828_quiz";

try {
    $pdo = new PDO('mysql:host=' . $host . ';dbname=' . $database . ';port=' . $port . ';charset=utf8', $username, $password, array(
    PDO::ATTR_PERSISTENT => true));
} catch(PDOException $e){
    echo($e);
}