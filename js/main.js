(function(){
    // GLOBAL PARAMS

    // Play to 7
    var NECESSARYWINS = 2;
    var humanWins = 0;
    var computerWins = 0;

    // KEY FOR OPTIONS
    var ROCK = 0;
    var PAPER = 1;
    var SCISSORS = 2;

    // Elements
    var rockElem = document.getElementById('rock');
    var paperElem = document.getElementById('paper');
    var scissorsElem = document.getElementById('scissors');
    var computerChoiceElem = document.getElementById('computer-choice-image');

    // Event Listeners
    rockElem.addEventListener('click', function(){matchOff(ROCK)}, false);
    paperElem.addEventListener('click', function(){matchOff(PAPER)}, false);
    scissorsElem.addEventListener('click', function(){matchOff(SCISSORS)}, false);


    // Functions
    function matchOff(el){
        var humanChoice = el;
        // Get Computer's Guess
        var computerChoice = computerGuessGenerator();

        // Animate
        animateToImage(computerChoice);

        // Compare Elements
        compareGuesses(humanChoice, computerChoice);

        // Display Results
        displayResults();
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
            alert("DRAW");
        }
        // Guesses are different
        if (humanGuess == ROCK && computerGuess == PAPER){
            alert("COMPUTER WINS");
            computerWins++;
        } else if (humanGuess == ROCK && computerGuess == SCISSORS){
            alert("HUMAN WINS");
            humanWins++;
        } else if (humanGuess == PAPER && computerGuess == SCISSORS){
            alert("COMPUTER WINS");
            computerWins++;
        } else if (humanGuess == PAPER && computerGuess == ROCK){
            alert("HUMAN WINS");
            humanWins++;
        } else if (humanGuess == SCISSORS && computerGuess == ROCK){
            alert("COMPUTER WINS");
            computerWins++;
        } else if (humanGuess == SCISSORS && computerGuess == PAPER){
            alert("HUMAN WINS");
            humanWins++;
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

    function displayResults {
        alert("Human Wins: " + humanWins + " - Computer Wins: " + computerWins);
        if (humanWins == NECESSARYWINS){
            // GAME OVER
            alert("GAME OVER YOU WIN");
        } else if (computerWins == NECESSARYWINS){
            // GAME OVER
            alert("GAME OVER COMPUTER WINS");
        }
    }





})();
