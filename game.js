
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var isStarted = false
var userChoose;
//
$(document).keydown(function() {
    if(!isStarted){
        $("#level-title").text("Level " + level);
        isStarted = true;
        nextLevel();
    }
});

$(".btn").click( function(){
    if(isStarted){
    console.log("user clicked " + $(this).attr("id"));
    userChoose = ($(this).attr("id"));
    animatePress(userChoose);
    userClickPattern.push(userChoose);
    compareClick(userClickPattern.length -1 );
}

})

function compareClick(currentClick){
    if(gamePattern[currentClick] !== userClickPattern[currentClick]){
        console.log(gamePattern[currentClick] + " " +  userClickPattern[currentClick])
        console.log("You Lose");
        gameOver();
    }
    else{
        if(userClickPattern.length === gamePattern.length){
            userClickPattern = [];
            console.log("wait")
        setTimeout(function () {
            nextLevel();
          }, 1000); 
        }
           
    }

}

function nextLevel(){
    level++;
    $("#level-title").text("Level " + level);
    randomNum = Math.floor(Math.random()*4);
    randomChoosenColour(randomNum);
    
}

function randomChoosenColour(randomNum){
    var randomColor = buttonColours[randomNum];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(source){
    var audio = new Audio("sounds/" + source + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function gameOver(){
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
    startOver();
}

function startOver(){
    isStarted = false;
    gamePattern = [];
    userClickPattern = [];
    level = 0;
}



