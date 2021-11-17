<?php

$host = "localhost";
$port = "3306";
$username = "root";
$password = "";
$database = "quiz";

try {
    $pdo = new PDO('mysql:host=' . $host . ';dbname=' . $database . ';port=' . $port . ';charset=utf8', $username, $password, array(
    PDO::ATTR_PERSISTENT => true));
} catch(PDOException $e){
    echo($e);
}