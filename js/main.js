(function(){
    // Play to 7]
    var NECESSARYWINS = 2;

    // KEY CODES FOR OPTIONS
    var ROCK = 0;
    var PAPER = 1;
    var SCISSORS = 2;

    // KEY CODES FOR RESULTS
    var HUMANWIN = 3;
    var COMPUTERWIN = 4;
    var DRAW = 5;

    // Global Variables
    var totalHumanWins = 0;
    var totalComputerWins = 0;

    // Elements
    var rockElem = document.getElementById('rock');
    var paperElem = document.getElementById('paper');
    var scissorsElem = document.getElementById('scissors');
    var computerChoiceElem = document.getElementById('computer-choice-image');
    var overlay = document.getElementById('overlay');

    // Event Listeners
    rockElem.addEventListener('click', function(){matchOff(ROCK)}, false);
    paperElem.addEventListener('click', function(){matchOff(PAPER)}, false);
    scissorsElem.addEventListener('click', function(){matchOff(SCISSORS)}, false);


    // Functions
    function matchOff(el){
        var result;
        var humanChoice = el;
        // Get Computer's Guess
        var computerChoice = computerGuessGenerator();

        // Animate
        animateToImage(computerChoice);

        // Compare Elements
        result = compareGuesses(humanChoice, computerChoice);

        // Display Results
        displayResults(result);
    }

    function computerGuessGenerator(){
        var guess;
        // Randomize a guess for the computer
        guess = Math.floor(Math.random() * 3);
        return guess;
    }

    function compareGuesses(humanGuess, computerGuess){
        // Guesses are the same
        if (humanGuess == computerGuess){
            return DRAW;
        }
        // Guesses are different
        if (humanGuess == ROCK && computerGuess == PAPER){
            return COMPUTERWIN;
        } else if (humanGuess == ROCK && computerGuess == SCISSORS){
            return HUMANWIN;
        } else if (humanGuess == PAPER && computerGuess == SCISSORS){
            return COMPUTERWIN;
        } else if (humanGuess == PAPER && computerGuess == ROCK){
            return HUMANWIN;
        } else if (humanGuess == SCISSORS && computerGuess == ROCK){
            return COMPUTERWIN;
        } else if (humanGuess == SCISSORS && computerGuess == PAPER){
            return HUMANWIN;
        }

    }

    function animateToImage(image){
        if (image == ROCK){
            computerChoiceElem.style.backgroundPosition = "0%";
            alert("Compute chooses ROCK");
        } else if (image == PAPER){
            computerChoiceElem.style.backgroundPosition = "50%";
             alert("Compute chooses PAPER");
        } else if (image == SCISSORS){
           computerChoiceElem.style.backgroundPosition = "100%";
             alert("Compute chooses SCISSORS");
        }
    }

    function animateOverlay(result){
        // Wait a second
        // Populate overlay with information
        // if match win / match loss
            // Fade in Overlay
        // if round win / round loss / 
            // Fade in Overlay
            // Fade out Overlay
        switch (result){
            case HUMANWIN : 
                overlay.classList.add('fade-in');
            break;
            case COMPUTERWIN : 
               overlay.classList.add('fade-in');
            break;
            case DRAW : 
                overlay.classList.add('fade-in');
            break;
        }

    }

    function displayResults(result) {
        // 4 Options, Human Wins Match, Computer Wins Match,
        //            Human Wins Round, Computer Wins Round
            alert("In Display Results");
        if (totalHumanWins == NECESSARYWINS){
            alert("GAME OVER HUMAN WINS");
        } else if (totalComputerWins == NECESSARYWINS){
            alert("GAME OVER HUMAN WINS");
        } else if (result == HUMANWIN){
            alert("Human Wins round");
            animateOverlay(result);
        } else if (result == COMPUTERWIN){
            animateOverlay(result);   
        } else if (result == DRAW){
            animateOverlay(result);
        }


    }





})();
