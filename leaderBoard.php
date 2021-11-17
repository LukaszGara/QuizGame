<?php

require_once 'databaseConn.php';

    $getscores = $pdo->prepare("SELECT name, points, difficulty, category FROM scores JOIN users ON scores.user_id = users.user_id ORDER BY points DESC LIMIT 20");
    $getscores->execute();
    $scores = $getscores->fetchAll();
    
    $i = 1;
    foreach ($scores as $score){
        echo "<tr>";
        echo "<td class='bestScoresCount'><b> " . $i . ".</b></td>";
        echo "<td> " . $score['name'] . "</td>";
        echo "<td> " . $score['points'] . "</td>";
        echo "<td> " . $score['difficulty'] . "</td>";
        echo "<td> " . $score['category'] . "</td>";
        echo "</tr>";
        $i++;
    }

