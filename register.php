
<?php
    session_start();
    require_once 'databaseConn.php';
    if ( $_POST['username'] && $_POST['email'] && $_POST['password'] && $_POST['repeatPassword'] && $_POST['terms']){

        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $repeatPassword = $_POST['repeatPassword'];
    
        function user_exist($column, $value, $pdo){
    
            $userCheck = $pdo->prepare("SELECT Count(*) FROM users WHERE $column = :value");
            $userCheck->bindValue(':value', $value, PDO::PARAM_STR);
            $userCheck->execute();
    
            return $userCheck->fetchColumn();
        }
    
        try {
    
            $usernameCheck = intval( user_exist('name', $username, $pdo) );
            $emailCheck = intval( user_exist('email', $email, $pdo) );
    
            if ($usernameCheck > 0) {
                throw new Exception("User with that name already exists");
            } elseif ($emailCheck > 0) {
                throw new Exception("User wtih that email already exists");
            } elseif ($password !== $repeatPassword) {
                throw new Exception("Passwords are different");
            } elseif (!$_POST['terms']) {
                throw new Exception("Please accept terms");
            }
        
            $hashPassword = password_hash($password, PASSWORD_DEFAULT);
    
            $insert = $pdo->prepare("INSERT INTO users VALUES(NULL, '$username', '$hashPassword', '$email')");
            $insert->execute();
            
            echo "<script> location.href='loginform.php' </script> ";
    
        } catch (Exception $e) {

            $_SESSION['error'] = $e->getMessage();
            echo "<script> location.href='registerForm.php' </script> ";
        }
    } else {
        $_SESSION['error'] = 'Please fill all fields';
        echo "<script> location.href='registerForm.php' </script> ";
    }
