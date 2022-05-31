var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = true;
var level = 0;

// detect first keyboard press only
$(document).on("keypress", function () {
    if(started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = false;
    }
});

// detect user's selection
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// generate next pattern sequence
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// plays the corresponding sound to each color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// injects css to create an illusion of animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); // or could use: .delay(100).removeClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

// main logic of the game
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("right");
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over").delay(200).removeClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


// restarts the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
}

