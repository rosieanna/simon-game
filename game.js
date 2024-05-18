var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1,userChosenColour);
});
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}
function playWrong() {
    var sound = new Audio("sounds/wrong.mp3");
    sound.volume= 0.3;
    sound.play();
}
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    },100)
}
$("#level-title").click(function(){
    setTimeout(() => {
        if (!started) {
            nextSequence();
            $("#level-title").text("Level " + level);
            started = true;
        }
    }, 100);
})
function checkAnswer(currentLevel,userChosenColour) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        playSound(userChosenColour);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 500);
        }
    } else {
        console.log("wrong");
        playWrong("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Tap here to Restart");
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}