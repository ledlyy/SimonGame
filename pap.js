var gamePattern = [];
var userChosenPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var isStarted = false
var randomNum;
var count = 0;
var compareCheck = true;
$(document).keydown(function(event) {
    console.log(event.key.charAt(0))
    if(!isStarted && event.key.charAt(0) === 'a'){
        console.log("Level:" + level)
        isStarted = true;
        startGame();
    }
});

function startGame(){
    if(isStarted){
        nextSequence();
    }
    else{
        console.log("Wait");
    }
}
    



function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    randomNum = Math.floor(Math.random()*4);
    playing();
}

function restartGame(){
    console.log("Restarted");
    console.log(userChosenPattern);
    console.log(gamePattern);
    console.log("Restarted");
    gamePattern = [];
    userChosenPattern = [];
    level = 0;
    isStarted = false;

}

function playing(){
    randomChoosenColour();
    for(var i = 0; i < level; i++){
        playSound(gamePattern[i]);
        console.log("count: ---------" + count);
    }
    console.log("game pattern " + gamePattern);
    handler();
   
    
}

function compare(step){
    var result = true;
    if(step <= level){
    for(var i = 0; i < step; i++){
        if(gamePattern[i] !== userChosenPattern[i]){
            result = false;
            break;
        }
    }
    }
    if(step === level){
        userChosenPattern = [];
    if(result){
            nextSequence();
            count = 0;
            userChosenPattern = [];
    }
}
    
}

function handler(){
    $(".btn").click( function(){
        console.log("user clicked " + $(this).attr("id"));
        var userChosenColour = ($(this).attr("id"));
        playSound(userChosenColour);
        userChosenPattern.push(userChosenColour);
        animatePress(userChosenColour);
        console.log(userChosenPattern);
        console.log("count " + count);
        console.log("level " + level);
        compareY();
    });

}

function compareY() {
    if(userChosenPattern.length === level){
    compareCheck = true;
    for(var i = 0; i < level; i++){
        if(gamePattern[i] !== userChosenPattern[i]){
            console.log("gamepattern" + i + gamePattern[i]);
            console.log("userpattern" + i + userChosenPattern[i]);
            console.log("No Match!!!!")
            compareCheck = false;
            break; 
        }
    }
    if(compareCheck){
        userChosenPattern = [];
        count = 0;
        nextSequence();   
    } 
    else{
    console.log("overload");
    restartGame();
    }
    }
    else{
        handler();
    }
}



function randomChoosenColour(){
    var randomColor = buttonColours[randomNum];
    gamePattern.push(randomColor);
    //playSound(randomColor);
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    $("#" + color).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}
