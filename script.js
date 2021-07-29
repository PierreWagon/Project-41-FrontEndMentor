// Rules button and modal
const rulesBtn = document.querySelector('.rules-btn');
const rulesModal = document.querySelector('.rules-modal');
const closeRulesModal = document.querySelector('.rules-modal-title img');

rulesBtn.addEventListener('click', e => {
    rulesModal.style.display = "block";
    rulesModal.style.animation = "modalIn 0.6s linear"
})

closeRulesModal.addEventListener('click', e => {
    rulesModal.style.animation = "modalOut 0.6s linear"
    setTimeout(function() {
        rulesModal.style.display = "none";
    }, 550);
})


// Animates your selection to the good place
const paper = document.querySelector('.paper.player');
const scissors = document.querySelector('.scissors.player');
const rock = document.querySelector('.rock.player');
const allChoices = document.querySelectorAll('.play-btn-color.player');
const gameText = document.querySelector('.game-text'); //Displays "You picked", "The house picked", win and lose messages.
const houseMoves = document.querySelector('.house-moves'); //Displays the house waiting div and house element selection
const paperHouse = document.querySelector('.paper.house');
const scissorsHouse = document.querySelector('.scissors.house');
const rockHouse = document.querySelector('.rock.house');

// Makes the two other elements disappear when you select one.
function mainMenuDisappear(pick) {
    document.querySelector('.game-wrapper').style.backgroundImage = "none";
    allChoices.forEach(choice => {
        if (!choice.classList.contains(pick)) {
            choice.style.animation = "disappear 0.4s linear forwards";
        }
    })
}


// Generates a pseudo-random result : 0 for paper, 1 for scissors and 2 for rock
function houseSelectElement() {
    let result = Math.floor(Math.random() * 3); 
    if (result == 0) {
        paperHouse.classList.add('active');
        return "paper";
    }
    else if (result == 1) {
        scissorsHouse.classList.add('active');
        return "scissors";
    }
    else {
        rockHouse.classList.add('active');
        return "rock";
    }
}

// Different cases : Win / Lose / Draw
const score = document.getElementById('score');
const replayBtn = document.querySelector('.replay-btn');
const winMsg = document.getElementById('game-win');
const loseMsg = document.getElementById('game-lose');
const drawMsg = document.getElementById('game-draw');
function winGame() {
    winMsg.classList.add('active');
    replayBtn.classList.add('active');
    setTimeout(function() {
        score.innerHTML = parseInt(score.innerHTML, 10) + 1;
    }, 3000);
}

function loseGame() {
    loseMsg.classList.add('active');
    replayBtn.classList.add('active');
    setTimeout(function() {
        score.innerHTML = parseInt(score.innerHTML, 10) - 1;
    }, 3000);
}

function drawGame() {
    drawMsg.classList.add('active');
    replayBtn.classList.add('active');
}

// Resets the board (except score) to allow user to play again by clicking on the "Play again" button
function resetBoard() {
    paper.classList.remove('active');
    paper.classList.remove('win');
    paperHouse.classList.remove('active');
    paperHouse.classList.remove('win');

    rock.classList.remove('active');
    rock.classList.remove('win');
    rockHouse.classList.remove('active');
    rockHouse.classList.remove('win');

    scissors.classList.remove('active');
    scissors.classList.remove('win');
    scissorsHouse.classList.remove('active');
    scissorsHouse.classList.remove('win');

    gameText.classList.remove('active');
    houseMoves.classList.remove('active');

    winMsg.classList.remove('active');
    drawMsg.classList.remove('active');
    loseMsg.classList.remove('active');
    replayBtn.classList.remove('active');

    document.querySelector('.game-wrapper').style.backgroundImage = "url(images/bg-triangle.svg)";
    allChoices.forEach(choice => {
            choice.style.animation = "none";
    })
}

// Calls resetBoard() function
replayBtn.addEventListener('click', e => {
    resetBoard();
})


// Initiates the game when clicking on paper, scissors or rock
let houseResult;

paper.addEventListener('click', e => {
    paper.classList.add('active');
    gameText.classList.add('active');
    houseMoves.classList.add('active');
    mainMenuDisappear("paper");
    houseResult = houseSelectElement();
    if (houseResult == "paper") {
        drawGame();
    }
    else if (houseResult == "rock") {
        winGame();
        setTimeout(function() {
            paper.classList.add('win');
        }, 3500);
    }
    else if (houseResult == "scissors") {
        loseGame();
        setTimeout(function() {
            scissorsHouse.classList.add('win');
        }, 3500);
    }
})

scissors.addEventListener('click', e => {
    scissors.classList.add('active');
    gameText.classList.add('active');
    houseMoves.classList.add('active');
    mainMenuDisappear("scissors");
    houseResult = houseSelectElement();
    if (houseResult == "paper") {
        winGame();
        setTimeout(function() {
            scissors.classList.add('win');
        }, 3500);
    }
    else if (houseResult == "rock") {
        loseGame();
        setTimeout(function() {
            rockHouse.classList.add('win');
        }, 3500);
    }
    else if (houseResult == "scissors") {
        drawGame();
    }
})

rock.addEventListener('click', e => {
    rock.classList.add('active');
    gameText.classList.add('active');
    houseMoves.classList.add('active');
    mainMenuDisappear("rock");
    houseResult = houseSelectElement();
    if (houseResult == "paper") {
        loseGame();
        setTimeout(function() {
            paperHouse.classList.add('win');
        }, 3500);
    }
    else if (houseResult == "rock") {
        drawGame();
    }
    else if (houseResult == "scissors") {
        winGame();
        setTimeout(function() {
            rock.classList.add('win');
        }, 3500);
    }
})