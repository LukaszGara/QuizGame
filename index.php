<!DOCTYPE html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link rel="stylesheet" href="style4.css">
        <meta charset="UTf-8">
    </head>
    <body>
        <header>
            <h1 class="header"> <i> <a href="index.php" id="header"> QUIZ SIDE </i> </a> </h1>
            <?php
            session_start();    

            if (isset($_SESSION['name'])) {
                echo '<a href="#" id="name"> '. $_SESSION['name'] .' </a>';
                echo '<a href="logout.php" id="logout"> Logout </a>';
            } else {
                echo '<a href="loginform.php" id="login"> Login </a>';
            }
            ?>
         </header>
        <div class="pointsLives">
            <div class="points">
                 Points: <span id="points"> 0 </span> 
            </div>
            <div class="lives">
                 Lives: <span id="lives"> 5 </p> 
            </div>
        </div>
        <div id="customize">
            <h3> Customize your quiz </h3>
            <p class="selectCategory"> Select Category </p>
                <button class="categoryButton">History</button>
                <button class="categoryButton">Video Games</button>
                <button class="categoryButton">Sport</button>
                <button class="categoryButton">Computers</button>
                <button class="categoryButton">Mixed</button>
            <p class="selectCategory"> Number of questions </p>
                <button class="amountButton">10</button>
                <button class="amountButton">20</button>
                <button class="amountButton">30</button>
                <button class="amountButton">40</button>
                <button class="amountButton">50</button>
            <p class="selectCategory"> Difficulty </p>
                <button class="difficultyButton">easy</button>
                <button class="difficultyButton">medium</button>
                <button class="difficultyButton">hard</button>
                <button class="difficultyButton">mixed</button>
            <p id="confirmCustomize">  </p>
            <button id="castomizeButton"> Start </button>
        </div>
        <div class="all">
            <div class="bestScores">
                <h3 id="bestScoresTitle"> Best scores </h3>
                <table id="bestScores">
                    <th>  </th>
                    <th> points </th>
                    <th> difficulty </th>
                    <th> category </th> 
                    <?php require_once "bestScores.php" ?>
                </table>
            </div>
            <div class="leaderboard">
                <h3 id="leaderboardTitle"> Leaderboard </h3>
                <table id="leaderboard">
                    <th>  </th>
                    <th> user </th>
                    <th> points </th>
                    <th> difficulty </th>
                    <th> category </th> 
                    <?php require_once "leaderBoard.php" ?>
                </table>
            </div>
            <main id="playSpace">

                <div class="category">
                    <p id="category"> </p>
                </div>
                
                <div class="questions">
                   <p id="question"> </p>
                </div>

                <div class="answers">
                    <a id="answer1" href="#" class="answer"></a>
                    <a id="answer2" href="#" class="answer"></a><br>
                    <a id="answer3" href="#" class="answer"></a>
                    <a id="answer4" href="#" class="answer"></a>
                </div>

            </main>
            <br><br>
            <a href="#" class="arrow" id="arrow"> Next question <i class="arrow right"></i></a>
            <a href="/quizGame" id="again"> Try again! <i class="arrow right"></i></a>
        </div>
        <script src="main.js"></script>

        <p class="hidden" id="difficultyData"></p>
        <p class="hidden" id="amountData"></p>
        <p class="hidden" id="categotyData"></p>
    </body>
</html