<?php
require_once 'databaseConn.php';

session_start();

$results = $_POST['result'];

$results = json_decode($results);

$points = $results->points;
$difficulty = $results->difficulty;
$category = $results->category;

$data = $pdo->prepare("INSERT INTO scores VALUES (NULL, $_SESSION[id] , :points , :difficulty , :category )");
$data->bindValue(':points', $points, PDO::PARAM_INT);
$data->bindValue(':difficulty', $difficulty, PDO::PARAM_STR);
$data->bindValue(':category', $category, PDO::PARAM_STR);
$data->execute();