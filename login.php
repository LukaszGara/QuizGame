<?php

session_start();

require_once 'databaseConn.php';
// get data
$password = $_POST['passwordInput'];
$email = $_POST['emailInput'];

if ( $password && $email ) {
    // get hashed password from database
    $fetch = $pdo->prepare("SELECT user_id,name, password FROM users WHERE email = :email");
    $fetch->bindValue(':email', $email, PDO::PARAM_STR);
    $fetch->execute();
    $fetched = $fetch->fetch();
    //compare hashed password with user given password
    if (password_verify($password, $fetched["password"])) {
        $_SESSION['name'] = $fetched["name"];
        $_SESSION['id'] = $fetched['user_id'];
        echo "<script>location.href='index.php';</script>";
    } else {
        // passwords doesn'y match
        $_SESSION['wrongPass'] = true;
        echo "<script>location.href='loginform.php';</script>";
    }

} else {
    // not all fields filled
    $_SESSION['fields'] = true;
    echo "<script>location.href='loginform.php';</script>";
}