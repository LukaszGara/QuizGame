<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link rel="stylesheet" href="style4.css">
        <meta charset="UTf-8">
    </head>
    <body>
        <header>
         <h1 class="header"> <i> <a href="index.php" id="header"> QUIZ SITE </i> </a> </h1>
         </header>
        <div id= "container">
            <div id="loginHeader">
                <h3> Login </h3>
            </div>
            <div id="loginForm">
                <form action="login.php" method="POST">
                    <label for="emailInput"> Email </label> <br> 
                    <input type="text" name="emailInput"> <br> <br>
                    <label for="passwordInput"> Password </label> <br> 
                    <input type="password" name="passwordInput"> <br> <br>
                    <input type="submit" value="Login" id="loginButton">
                </form>
                <a href="registerForm.php" id="createAccount"> Create account </a> <br> <br>
                <?php
                    session_start();

                    if ( isset($_SESSION['wrongPass']) ) {
                        echo 'Wrong email or password';
                        unset($_SESSION['wrongPass']);
                    } elseif (isset($_SESSION['fields'])) {
                        echo 'Please fill all fields';
                        unset($_SESSION['fields']);
                    }
                ?>
            </div>

        </div>
    </body>
</html>

