// using these throughout app
const X_CLASS = 'x';
// use these throughout app
const CIRCLE_CLASS = 'circle';
// create array for all winning combinations
const WINNING_COMBINATIONS = [
    // horizontal win combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical win combinations
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal win combinations
    [0, 4, 8],
    [2, 4, 6]
]
// selecting all "data-cell" into variable which creates and array
const cellElements = document.querySelectorAll('[data-cell]');
// selecting board class and assigning to variable
const board = document.getElementById('board');
// selecting winning message div and assigning variable
const winningMessageElement = document.getElementById('winningMessage');
// taking top red restart button and assigning variable
const restart = document.querySelector('#restart');
// selecting button and assigning to variable
const restartButton = document.getElementById('restartButton');
// selecting winning text message and assigning variable
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
// taking bottom span and assigning variable
const turn = document.querySelector('.turn');
// checking who's turn it is with this variable, if true it's circle's turn and visa versa
let circleTurn;

// calls function to start game
startGame();

// adding event listener with click and calling startGame() function
restart.addEventListener('click', startGame);  // top button
restartButton.addEventListener('click', startGame); // button when game ends

// function starts the game by clearing out the board
function startGame() {
    // setting circle turn to false so that X starts the game
    circleTurn = false;
    // looping over each cell
    cellElements.forEach(cell => {
        // resetting game board
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        console.log('Clearing board of both', `${X_CLASS} and ${CIRCLE_CLASS} marks.`);
        cell.removeEventListener('click', handleClick);
        // every time we click on the cell, only active event listener once
        cell.addEventListener('click', handleClick, { once: true })
    });
    // enabling hover CSS when game starts
    setBoardHoverClass();
    // removing message when resetting the game
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    // Finds
    const cell = e.target;
    // if it's circle's turn return circle class, otherwise return x class
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // places mark on cell and with current class
    placeMark(cell, currentClass);
    // Check for Win
    if (checkWin(currentClass)) {
        // this determines that game has not ended
        endGame(false);
        // Check for Draw
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Switch turns function only if there's not a winner yet
        swapTurns();
        // want to add this after swapTurns so we know whose turn it currently is
        setBoardHoverClass();
    }
}

// creating function to determine if game is a draw
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
        console.log(`Game ended in a ${winningMessageElement.innerText}!`)
    } else {
        // checks to see whose current turn it is when game is won
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
    }
    console.log(`${winningMessageElement.innerText} won!`);
    // code that actually shows the text
    winningMessageElement.classList.add('show');
}

// creating function to determine if the game is a draw 
function isDraw() {
    // checking to see if every cell is filled in
    // destructing cell elements into an array
    return [...cellElements].every(cell => {
        // check every cell to see if they all contain a class
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

// functions that takes in cell and currentClass then adds current class mark to board
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    console.log(`Placing ${currentClass} into this cell:`, cell);
}

// creating function takes circleTurn and then assigns the opposite
function swapTurns() {
    circleTurn = !circleTurn;
    console.log(`CIRCLE'S turn = ${circleTurn}`)
}

// calling hover states
function setBoardHoverClass() {
    // removes all classes on the board
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    // if it's circle turn then add circle class on board
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
        // changes bottom span text to say new text
        turn.textContent = "It is O's turn";
        // otherwise use the x class
    } else {
        board.classList.add(X_CLASS);
        // changes bottom span text to say new text
        turn.textContent = "It is X's turn";
    }
}

// creating functions that checks if currentClass has fulfilled a winning combo
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}