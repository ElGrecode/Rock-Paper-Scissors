(function(){
    // Play to 7]
    var NECESSARYWINS = 5;

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
    var winningPhrases = ["Smooth!", "Good Choice!", "Terrific!", "Great!"];
    var losingPhrases = ["Terrible!", "You Suck!", "Terrific!", "Great!"];

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
    rockElem.addEventListener('mouseover', function(){animateRiser(ROCK)}, false);
    rockElem.addEventListener('mouseout', function(){animateDescender(ROCK)}, false);

    paperElem.addEventListener('click', function(){matchOff(PAPER)}, false);
    paperElem.addEventListener('mouseover', function(){animateRiser(PAPER)}, false);
    paperElem.addEventListener('mouseout', function(){animateDescender(PAPER)}, false);

    scissorsElem.addEventListener('click', function(){matchOff(SCISSORS)}, false);
    scissorsElem.addEventListener('mouseover', function(){animateRiser(SCISSORS)}, false);
    scissorsElem.addEventListener('mouseout', function(){animateDescender(SCISSORS)}, false);


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
        if (image == ROCK){
            computerChoiceElem.style.backgroundPosition = "0%";
        } else if (image == PAPER){
            computerChoiceElem.style.backgroundPosition = "50%";
        } else if (image == SCISSORS){
           computerChoiceElem.style.backgroundPosition = "100%";
        }
    }

    function animateRiser(elem){
        switch(elem){
            case ROCK :
                rockElem.classList.add('rise-up');
                rockElem.classList.remove('descend-down');
            break;  
            case PAPER :
                paperElem.classList.add('rise-up');
                paperElem.classList.remove('descend-down');
            break;  
            case SCISSORS :
                scissorsElem.classList.add('rise-up');
                scissorsElem.classList.remove('descend-down');
            break;    
        }
    }

    function animateDescender(elem){
        switch(elem){
            case ROCK :
                rockElem.classList.add('descend-down');
                rockElem.classList.remove('rise-up');
            break;  
            case PAPER :
                paperElem.classList.add('descend-down');
                paperElem.classList.remove('rise-up');
            break;  
            case SCISSORS :
                scissorsElem.classList.add('descend-down');
                scissorsElem.classList.remove('rise-up');
            break;    
        }
    }

    function animateOverlay(result){
        var timeoutID;
        // Populate Overlay With Information
        // Fade-in and then fade-out classes

        switch (result){
            case HUMANWIN : 
                winRound.classList.add('active');
                headings[0].innerHTML = winningPhrases[Math.floor(Math.random() * 4)];
                overlay.classList.add('fade-in');
                overlay.classList.add('positive');
                timeoutID = window.setTimeout(function(){
                    overlay.classList.remove('positive');
                    overlay.classList.remove('fade-in');
                    winRound.classList.remove('active');
                }, 2000);
            break;
            case COMPUTERWIN : 
                loseRound.classList.add('active');
                headings[1].innerHTML = losingPhrases[Math.floor(Math.random() * 4)];
                overlay.classList.add('fade-in');
                overlay.classList.add('negative');
                timeoutID = window.setTimeout(function(){
                    overlay.classList.remove('negative');
                    overlay.classList.remove('fade-in');
                    loseRound.classList.remove('active');
                }, 2000);
            break;
            case DRAW : 
                drawRound.classList.add('active');
                overlay.classList.add('fade-in');
                overlay.classList.add('ambiguous');
                timeoutID = window.setTimeout(function(){
                    overlay.classList.remove('ambiguous');
                    overlay.classList.remove('fade-in');
                    drawRound.classList.remove('active');
                }, 2000);
            break;
        }

    }

    function animateGameOver(matchResult){
        var winText = "You have won the match.<br>The Humans are safe... for now";
        var lossText = "The Computer had won.<br>The singularity is approaching";

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
            descriptions[ROCK].innerHTML = descriptionText;
            animateOverlay(result);
        } else if (result == COMPUTERWIN){
            descriptions[PAPER].innerHTML = descriptionText;
            animateOverlay(result);   
        } else if (result == DRAW){
            descriptions[SCISSORS].innerHTML = descriptionText;
            animateOverlay(result);
        }
    }

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

})();
