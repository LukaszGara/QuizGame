<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style4.css">
    <title>Register</title>
</head>
<body>
    <header>
        <h1 class="header"> <i> <a href="index.php" id="header"> QUIZ SITE </i> </a> </h1>
        <a href="loginform.php" id="login"> Login </a>
    </header>
    <div id="container">
        <div id="registerHeader">
            <h3> Register </h3>
        </div>
        <div id="registerForm">
            <form action="register.php" method="post">
                <label for="username"> username </label>
                <input type="text" name="username" maxlength="20">
                <label for="email"> email </label>
                <input type="email" name="email">
                <label for="password"> password </label>
                <input type="password" name="password">
                <label for="repeatPassword"> repeat password </label>
                <input type="password" name="repeatPassword">
                <label for="terms"> Accept terms </label>
                <input type="checkbox" name="terms"> <br> <br>
                <input type="submit" value="Register" id="registerButton">
            </form>
            <?php
                session_start();

                if (isset($_SESSION['error'])) {
                    echo $_SESSION['error'];
                    unset($_SESSION['error']);
                }
            ?>
        </div>
    </div>
</body>
</html>


