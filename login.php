<?php

session_start();

require_once 'databaseConn.php';

$password = $_POST['passwordInput'];
$email = $_POST['emailInput'];

if ( $password && $email ) {
    $fetch = $pdo->prepare("SELECT user_id,name, password FROM users WHERE email = :email");
    $fetch->bindValue(':email', $email, PDO::PARAM_STR);
    $fetch->execute();
    $fetched = $fetch->fetch();
    if (password_verify($password, $fetched["password"])) {
        $_SESSION['name'] = $fetched["name"];
        $_SESSION['id'] = $fetched['user_id'];
        echo "<script>location.href='index.php';</script>";
    } else {
        $_SESSION['wrongPass'] = true;
        echo "<script>location.href='loginform.php';</script>";
    }

} else {
    $_SESSION['fields'] = true;
    echo "<script>location.href='loginform.php';</script>";
}