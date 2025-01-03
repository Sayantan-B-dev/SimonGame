var gamePattern=[];
var buttonColors=["red","blue","green","yellow"]
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keydown(function(event){
    if(event.key==='r'||event.key=='R'){
        if(!started){
        $('#level-title').text("Level "+level)
        nextSequence();
        started=true;
        }
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
            }
    }
    else {
        setTimeout(() => {
            playSound("GameOver");
        }, 500);
            
  
        $("body").addClass('game-over');
        $("#level-title").text("Game Over, Press R to Restart");
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 50);
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    var audio = new Audio("sounds/" + randomChosenColour + "_male.mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed');
    setTimeout(() => {
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}