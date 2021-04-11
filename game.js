var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var userClickedPattern = [];


// ###################################################################
// START THE GAME; PRESSING A KEY TO START
// ###################################################################
var level = 0;
var gameOn = false;
$(document).keydown(function() {
  if (gameOn === false) {
    nextSequence();
    gameOn = true;
  }
});


// ###################################################################
// GAME TO PICK A RANDOM COLOUR EACH ROUND
// ###################################################################

// A RANDOM NUMBER WILL BE GENERATED, AND USED TO INDEX FROM THE ARRAY OF AVAILABLE COLOURS
// THE RELEVANT SOUND AND A ANIMIATION WILL BE PLAYED FOR COLOUR
// PREVIOUS PLAYER PATTERNS WILL BE RESET EACH ROUND
function nextSequence() {
  level += 1;
  $("h1").text("Level " + level);

  var randomNumber = Math.random() * 3;
  randomNumber = Math.round(randomNumber);
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  flashColor(randomChosenColor);
  playSound(randomChosenColor);

  userClickedPattern = [];
}


// ###################################################################
// FUNCTION TO FLASH A RANDOM COLOUR (CAN BE USED FOR GAME AND USER)
// ###################################################################
function flashColor(randomChosenColor) {
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}


// ###################################################################
// FUNCTION TO PLAY A SOUND OF A COLOUR (CAN BE USED FOR GAME AND USER)
// ###################################################################
function playSound(randomChosenColor) {
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}


// ###################################################################
// USER TO PICK COLOURS AN ARRAY OF COLOURS EACH ROUND
// ###################################################################

// CLICK EVENT TO RETURN COLOR CLICKED
// EVENT SHOULD ONLY WORK IF THE USER PATTERN IS SMALLER THAN THE GAME PATTERN
// RETRIEVE THE ID OF THE BUTTON CLICKED, APPEND TO ARRAY, PLAY SOUND & ANIMATIONS AND CHECK ANSWER
$(".btn").click(function() {
  if (userClickedPattern.length < gamePattern.length) {
    var idOfButton = $(this).attr("id");
    userClickedPattern.push(idOfButton);
    playSound(idOfButton);
    animatePress(idOfButton);
    checkAnswer(level);
  }
});


// FUNCTION TO ANIMATE THE COLOR BUTTON WHICH HAS BEEN PRESSED
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed").delay(100).queue(function() {
    $(this).removeClass("pressed").dequeue();
  });
}


// ###################################################################
// COMPARE THE USER ANSWER TO THE GAME ANSWER
// ###################################################################

// CHECK THE ANSWER AT EACH USER CLICK
// FIRSTLY, CHECK IF LATEST INPUTTED CLICK DOES NOT MATCH THE RELEVANT GAME COLOUR; IF NO MATCH, THEN GAME OVER
// SECONDLY, IF THE LAST ITEM IN THE ARRAY IS CORRECT, THEN PROCEED TO THE NEXT ROUND AS THERE WERE NO ERRORS
function checkAnswer(level) {
  if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over").delay(200).queue(function() {
      $("body").removeClass("game-over").dequeue();
    })
    setTimeout(gameOver, 1000);
  }
  if (userClickedPattern[level - 1] === gamePattern[level - 1]) {
    setTimeout(nextSequence, 1000);
  }
}


// ###################################################################
// GAME OVER FUNCTION; RESET ALL VARIABLES AND RESTART GAME
// ###################################################################
function gameOver() {
  level = 0;
  gameOn = false;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Game Over, Press Any Key to Restart");
}
