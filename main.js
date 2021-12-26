// generate customized api url based on player choices
function generate_ulr (category, difficulty, questionAmount) {

    //customize difficulty
    var difficultyURL = "&difficulty=" + difficulty;
    //customize amount of questions
    var questionAmountURL = "?amount=" + questionAmount;
    //customize category
    var categoryURL;
    switch (category){
        case 'Sport':
            categoryURL = "&category=21";
        break;
        case 'History':
            categoryURL = "&category=23";
        break;
        case "Video Games":
            categoryURL = "&category=15";
        break;
        case "Computers":
            categoryURL = "&category=18";
        break;
        case "Mixed":
            categoryURL = "";
        break;
    }

    if(difficulty == "mixed"){

        difficultyURL = '';

    } 
    // ready url
    var url = "https://opentdb.com/api.php" + questionAmountURL + categoryURL + difficultyURL;

    return url;
}

function start_game(url) {
    // get data from api
    $.ajax({
            url: url,
            type: "GET",
            dataType: 'json',
            success: function (data) {
                var z = 0;
                setQuestion(data, z);
                setanswers(data, z);
                selectedAnswer(data, z);
                z ++;
                $("#arrow").click(function () {
                       nextQuestion(data);
                })
            },
            error: function (){
                console.log("error with api");
            }
        });
}
function nextQuestion(data) {
    // When player finish all questions 
    if ( data.results.length == z) {
        save_score();
        $("#arrow").hide();
        $("#again").show();
        alert("Congratulations you win the game");
    }
    // setup next question and answers
    setQuestion(data, z);
    setanswers(data, z);
    selectedAnswer(data, z);
    z ++;
}
// check if selected answer has value set to correct
function checkAnswer(data, a, allAnswers, z) {
    if (data.results[z].correct_answer == allAnswers[a]){
        var result = 'correct';
    } else{
        var result = 'incorrect';
    }

    return result;
}
//select value of questions 
function checkValue(data, z){
    var difficulty = data.results[z].difficulty;
    switch(difficulty) {
        case "easy":
            var points = 1;
            break;
        case "medium":
            var points = 2;
            break;
        case "hard":
            var points = 3;
            break;
    }
    return points;
}
// shuffle array
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
// setup question
function setQuestion(data, z){
    //change html elements
    $("#category").text(data.results[z].category);
    $("#question").html(data.results[z].question);
}
// setup answers
function setanswers(data, z) {
    //get wrong aswers
    var allAnswers = data.results[z].incorrect_answers;
    //add correct answer
    allAnswers.push(data.results[z].correct_answer);
    //shuffle answers
    shuffle(allAnswers);
    //clear answers
    $(".answers").html("");
    // setup asnwers for multiple choice question
    if (data.results[z].type == "multiple") {
        for ( var a = 0; a < 4; a++ ){
           var result = checkAnswer(data, a, allAnswers, z);
           $(".answers").append("<a id='answer" + a+1 + "' href='#' class='answer' value='" + result + "'>" + allAnswers[a] + "</a>");
        }
    // setup asnwers for boolean choice question
    } else {
        for (var a = 0; a<2; a++){
            var result = checkAnswer(data, a, allAnswers, z);
            $(".answers").append("<a id='answer" + a+1 + "' href='#' class='answer' value='" + result + "'>" + allAnswers[a] + "</a>");
        }
    }
}
function selectedAnswer(data, z){

    var questionValue = parseInt( checkValue(data, z));

     $(".answers a").click(function () {
             if ($(this).attr('value') == "correct") {
                 //select correct answer
                 $(this).css({"background-color": "green", "border-color": "#1c9413"})
                 // add points
                 var points = parseInt( $("#points").text() ) + questionValue;
                 $("#points").text(points);
                 //disable click event
                 $(".answers a").off('click');
             } else {
                 $(this).css({"background-color": "red", "border-color": "#6e0e03"});
                 //show correct answer
                 $(".answers a[value='correct']").css({"background-color": "green", "border-color": "#1c9413"});
                 // udpate lives
                 var lives = parseInt( $("#lives").text() );
                 lives--;
                 $("#lives").text(lives);
                 //disable click event
                 $(".answers a").off('click');
                 // when player loses all lives display message and play again button
                 if ($("#lives").text() == '0') {
                    setTimeout(function(){
                        alert("you lost all lives. Try again! ");
                    },500)
                    $("#arrow").hide();
                    $("#again").show();
                    save_score();
         
                }      
            }
     })
}
function save_score(){
    // make object with all data about current game
    var results = {
        'points': $('#points').text(),
        'difficulty': localStorage.getItem("Difficulty"),
        'category': localStorage.getItem("Category"),
    }
    var points = JSON.stringify(results);
    // send object to php file, then add result to database
     $.ajax({  
         type: 'POST',  
         url: 'addScore.php', 
         data: { result: points },
         success: function() {
         },
         error: function(err) {
            console.log(err);
         }
    });    
}
// select buttons 
var categoryButton = $(".categoryButton");
var amountButton = $(".amountButton");
var difficultyButton = $(".difficultyButton");
// mark selected button and setup value to selected 
function selected_button(button) {
    button.click(function(){
        button.css({"background-color": "rgb(66, 66, 252)"});
        button.attr("value", "");
        $(this).attr("value" , "selected");
        $(this).css({"background-color": "#16269e"});
    });
}
selected_button(categoryButton);
selected_button(amountButton);
selected_button(difficultyButton);


$("#castomizeButton").click( function(){

         var difficultyButton = $(".difficultyButton");
         var amountButton = $(".amountButton");
         var categoryButton = $(".categoryButton");
        try{
            for (var  a = 0; a < categoryButton.length; a++){
                // save slected category to local storage
                if (categoryButton[a].value) {
                    var selectedCategory = $(".categoryButton[value='selected']").text();
                    localStorage.setItem("Category", selectedCategory);
                }
            }
            for (var  a = 0; a < amountButton.length; a++){

                if (amountButton[a].value) {
                    // get select amount of questions
                    var selectedAmount = $(".amountButton[value='selected']").text();
                }
            }
            for (var  a = 0; a < difficultyButton.length; a++){
                // save slected difficulty to local storage
                if (difficultyButton[a].value) {
                    var selectedDifficulty = $(".difficultyButton[value='selected']").text();
                    localStorage.setItem("Difficulty", selectedDifficulty);
                }
            }
            // check that all setups has been selected
            if (!selectedCategory){
                throw "Please select category";
            } else if (!selectedDifficulty){
                throw "Please select difficulty";
            } else if (!selectedAmount) {
                throw "Please select number of question";
            }
            // generate url based on selected options
            var url =  generate_ulr (selectedCategory, selectedDifficulty, selectedAmount);

            start_game(url);

            // customize panel disappear
            $("#customize").hide(500);
            setTimeout(function(){
                $("#playSpace").show();
                $("#arrow").show();
            },500)

        } catch(err){
           alert(err);
        }
});
// cut available questions amount 
function cut_amount(max){
    var amountButton = $(".amountButton");
    for (var  a = 0; a < amountButton.length; a++){
        if ( parseInt( $(amountButton[a]).text() ) > max) {
            $(amountButton[a]).hide();
        } else {
            $(amountButton[a]).show();
        }
    }
}
// setup max amount of questions for each category
$(".categoryButton").click(function (){

    switch ( $(this).text() ){
        case "Sport":
            cut_amount(20);
        break;
        case "History":
            cut_amount(50);
        break;
        case "Video Games":
            cut_amount(50);
        break;
        case "Computers":
            cut_amount(30);
        break;
        case "Mixed":
            cut_amount(50);
        break;
    }
});

