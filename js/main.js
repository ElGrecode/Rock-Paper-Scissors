(function(){
    // Play to 7]
    var NECESSARYWINS = 5;

    // KEY CODES FOR OPTIONS
    var ROCK = 0;
    var PAPER = 1;
    var SCISSORS = 2;

    // KEY CODES FOR RESULTS
    var HUMANWIN = 0;
    var COMPUTERWIN = 1;
    var DRAW = 2;
    var DELAY = 2500;

    // Global Variables and Initializations
    var totalHumanWins = 0;
    var totalComputerWins = 0;
    var winningPhrases = ["Smooth!", "Good Choice!", "Terrific!", "Great!"];
    var losingPhrases = ["Terrible!", "You Suck!", "WHAT ARE YOU DOING?!", "Awful!"];
    var drawPhrases = ["DRAW!", "TIE!", "SAME!", "wtf?"];

    // CSS Classes
    var riseUpClass = "rise-up";
    var descendDownClass = "descend-down";

    // Elements
    var rockElem = document.getElementById('rock');
    var paperElem = document.getElementById('paper');
    var scissorsElem = document.getElementById('scissors');
    var computerChoiceElem = document.getElementById('computer-choice-image');
    var overlay = document.getElementById('overlay');
    var winRound = document.getElementById('win-round');
    var loseRound = document.getElementById('lose-round');
    var drawRound = document.getElementById('draw-round');
    var matchResultElem = document.getElementById('match-result');
    var headings = document.getElementsByClassName('big');
    var descriptions = document.getElementsByClassName('description');
    var humanIcon = document.getElementById('human-icon');
    var robotIcon = document.getElementById('robot-icon');

    // Event Listeners
    rockElem.addEventListener('click', function(){matchOff(ROCK)}, false);
    rockElem.addEventListener('mouseover', function(){animateRiseAndLower(rockElem, ROCK, riseUpClass, descendDownClass)}, false);
    rockElem.addEventListener('mouseout', function(){animateRiseAndLower(rockElem, ROCK, descendDownClass, riseUpClass)}, false);

    paperElem.addEventListener('click', function(){matchOff(PAPER)}, false);
    paperElem.addEventListener('mouseover', function(){animateRiseAndLower(paperElem, PAPER, riseUpClass, descendDownClass)}, false);
    paperElem.addEventListener('mouseout', function(){animateRiseAndLower(paperElem, PAPER, descendDownClass, riseUpClass)}, false);

    scissorsElem.addEventListener('click', function(){matchOff(SCISSORS)}, false);
    scissorsElem.addEventListener('mouseover', function(){animateRiseAndLower(scissorsElem, SCISSORS, riseUpClass, descendDownClass)}, false);
    scissorsElem.addEventListener('mouseout', function(){animateRiseAndLower(scissorsElem, SCISSORS, descendDownClass, riseUpClass)}, false);


    // Functions
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
            totalComputerWins++;
            return COMPUTERWIN;
        } else if (humanGuess == ROCK && computerGuess == SCISSORS){
            totalHumanWins++;
            return HUMANWIN;
        } else if (humanGuess == PAPER && computerGuess == SCISSORS){
            totalComputerWins++;
            return COMPUTERWIN;
        } else if (humanGuess == PAPER && computerGuess == ROCK){
            totalHumanWins++;
            return HUMANWIN;
        } else if (humanGuess == SCISSORS && computerGuess == ROCK){
            totalComputerWins++;
            return COMPUTERWIN;
        } else if (humanGuess == SCISSORS && computerGuess == PAPER){
            totalHumanWins++;
            return HUMANWIN;
        }
    }

    function animateToImage(image){
        // Animate Bottom Computer Image
        if (image == ROCK){
            computerChoiceElem.style.backgroundPosition = "0%";
        } else if (image == PAPER){
            computerChoiceElem.style.backgroundPosition = "50%";
        } else if (image == SCISSORS){
           computerChoiceElem.style.backgroundPosition = "100%";
        }
    }

    function animateRiseAndLower(elem, elemCode, addClass, removeClass){
        // This class will add and remove CSS classes for animation / transitions
        switch(elemCode){
            case ROCK:
                elem.classList.add(addClass);
                elem.classList.remove(removeClass);
            break;
            case PAPER:
                elem.classList.add(addClass);
                elem.classList.remove(removeClass);
            case SCISSORS:
                elem.classList.add(addClass);
                elem.classList.remove(removeClass);
            break;
        }
    }

    function animateOverlay(result){
        
        // Populate Overlay With Information
        // Fade-in and then fade-out classes
        function fadeHelper(roundOutcome, roundKeyCode, phrases, backgroundColor){
            roundOutcome.classList.add('active');
            headings[roundKeyCode].innerHTML = phrases[Math.floor(Math.random() * 4)];
            overlay.classList.add('fade-in');
            overlay.classList.add(backgroundColor);
            window.setTimeout(function(){
                overlay.classList.remove(backgroundColor);
                overlay.classList.remove('fade-in');
                roundOutcome.classList.remove('active');
            }, DELAY);
        }

        switch (result){
            case HUMANWIN : 
                fadeHelper(winRound, HUMANWIN, winningPhrases, 'positive');
            break;
            case COMPUTERWIN : 
                fadeHelper(loseRound, COMPUTERWIN, losingPhrases, 'negative');
            break;
            case DRAW : 
                fadeHelper(drawRound, DRAW, drawPhrases, 'ambiguous');
            break;
        }

    }

    function animateGameOver(matchResult){
        var winText = "You have won the match.<br>The Humans are safe... for now";
        var lossText = "The Computer has won.<br>The singularity is approaching";

        if (matchResult == "win"){
            // Insert win text, fade-in overlay, show relative image
            descriptions[3].innerHTML = winText;
            humanIcon.classList.add('active');
            overlay.classList.add('fade-in');
            overlay.classList.add('positive');
            matchResultElem.classList.add('active');
        } else if (matchResult == "loss"){
            descriptions[3].innerHTML = lossText;
            robotIcon.classList.add('active');
            overlay.classList.add('fade-in');
            overlay.classList.add('negative');
            matchResultElem.classList.add('active');
        }
    }

    function displayResults(result) {
        var descriptionText = "Human Wins: " + totalHumanWins + " : "
        + "Computer Wins: " + totalComputerWins;
        // 5 Options, Human Wins Match, Computer Wins Match,
        //            Human Wins Round, Computer Wins Round, Draw Round
        if (totalHumanWins == NECESSARYWINS){
            // Human Wins, Display .match-result
            animateGameOver("win");
        } else if (totalComputerWins == NECESSARYWINS){
            // Computer Wins, Display .match-result
            animateGameOver("loss");
        } else if (result == HUMANWIN){
            // Description 0 - 2 for .description divs
            descriptions[HUMANWIN].innerHTML = descriptionText;
            animateOverlay(result);
        } else if (result == COMPUTERWIN){
            descriptions[COMPUTERWIN].innerHTML = descriptionText;
            animateOverlay(result);   
        } else if (result == DRAW){
            descriptions[DRAW].innerHTML = descriptionText;
            animateOverlay(result);
        }
    }

    function matchOff(el){
        var result;
        var humanChoice = el;
        // Get Computer's Guess
        var computerChoice = computerGuessGenerator();

        // Animate Computer's Image
        animateToImage(computerChoice);

        // Compare Elements
        result = compareGuesses(humanChoice, computerChoice);

        // Display Results
        displayResults(result);
    }

})();
