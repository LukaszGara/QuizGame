<?php

require_once 'databaseConn.php';

if (isset($_SESSION['id'])) {

    $getscores = $pdo->prepare("SELECT * FROM scores JOIN users ON scores.user_id = users.user_id WHERE scores.user_id = $_SESSION[id] ORDER BY points DESC LIMIT 10");
    $getscores->execute();
    $scores = $getscores->fetchAll();
    
    $i = 1;
    foreach ($scores as $score){
        echo "<tr>";
        echo "<td class='bestScoresCount'><b> " . $i . ".</b></td>";
        echo "<td> " . $score['points'] . "</td>";
        echo "<td> " . $score['difficulty'] . "</td>";
        echo "<td> " . $score['category'] . "</td>";
        echo "</tr>";
        $i++;
    }
} else {
   
    echo "<h3 id='scoresLogin'> Please login to see your best scores </h3>";
    echo "<script> $('#bestScores').hide() </script>";
 
}
