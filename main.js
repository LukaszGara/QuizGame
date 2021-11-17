function generate_ulr (category, difficulty, questionAmount) {

    console.log(category);
    console.log(difficulty);
    console.log(questionAmount);

    var difficultyURL = "&difficulty=" + difficulty;
    var questionAmountURL = "?amount=" + questionAmount;
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

    var url = "https://opentdb.com/api.php" + questionAmountURL + categoryURL + difficultyURL;

    return url;
}

function start_game(url) {

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
                        console.log(data);
                        if ( data.results.length == z) {
                            save_score();
                            $("#arrow").hide();
                            $("#again").show();
                            alert("Congratulations you win the game");
                        }
                        setQuestion(data, z);
                        setanswers(data, z);
                        selectedAnswer(data, z);
                        z ++;
                })
            },
            error: function (){
                console.log("error with api");
            }
        });
}

function checkAnswer(data, a, allAnswers, z) {
    if (data.results[z].correct_answer == allAnswers[a]){
        var result = 'correct';
    } else{
        var result = 'incorrect';
    }

    return result;
}
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

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function setQuestion(data, z){
    $("#category").text(data.results[z].category);
     $("#question").html(data.results[z].question);
}

function setanswers(data, z) { 
    var allAnswers = data.results[z].incorrect_answers;
    allAnswers.push(data.results[z].correct_answer);
    shuffle(allAnswers);
    $(".answers").html("");

    if (data.results[z].type == "multiple") {
        for ( var a = 0; a < 4; a++ ){
           var result = checkAnswer(data, a, allAnswers, z);
           $(".answers").append("<a id='answer" + a+1 + "' href='#' class='answer' value='" + result + "'>" + allAnswers[a] + "</a>");
        }
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

    var results = {
        'points': $('#points').text(),
        'difficulty': localStorage.getItem("Difficulty"),
        'category': localStorage.getItem("Category"),
    }
    var points = JSON.stringify(results);
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

var categoryButton = $(".categoryButton");
var amountButton = $(".amountButton");
var difficultyButton = $(".difficultyButton");
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
                if (categoryButton[a].value) {
                    var selectedCategory = $(".categoryButton[value='selected']").text();
                    localStorage.setItem("Category", selectedCategory);
                }
            }
            for (var  a = 0; a < amountButton.length; a++){
                if (amountButton[a].value) {
                    var selectedAmount = $(".amountButton[value='selected']").text();
                }
            }
            for (var  a = 0; a < difficultyButton.length; a++){
                if (difficultyButton[a].value) {
                    var selectedDifficulty = $(".difficultyButton[value='selected']").text();
                    localStorage.setItem("Difficulty", selectedDifficulty);
                }
            } 
            if (!selectedCategory){
                throw "Please select category";
            } else if (!selectedDifficulty){
                throw "Please select difficulty";
            } else if (!selectedAmount) {
                throw "Please select number of question";
            }

            var url =  generate_ulr (selectedCategory, selectedDifficulty, selectedAmount);

            start_game(url);

            $("#customize").hide(500);
            setTimeout(function(){
                $("#playSpace").show();
                $("#arrow").show();
            },500)

        } catch(err){
           alert(err);
        }
});

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

