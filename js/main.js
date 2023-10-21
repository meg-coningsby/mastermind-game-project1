/*----- constants -----*/

/*----- declare variables -----*/
let board;
let solution = [];
let selectionArray = [];
let feedbackBoard;

/*----- cached HTML elements  -----*/
const selectionRowElementArray = document.querySelectorAll(`.selection-pins`);
const messageBoardElement = document.querySelector(`.message-board`);
const gameBoardElement = document.querySelector(`.game-board`);
const solutionRowElement = document.querySelector(`.solution-row`);
const feedbackBoardElement = document.querySelector(`.feedback-board`);
const scoreboardElement = document.querySelector(`.scoreboard`);
const playAnotherRoundButtonElement = document.querySelector(
    `.another-round-button`
);
const restartGameButtonElement = document.querySelector(`.restart-button`);

/*----- initialise  -----*/
init();

function init() {
    selectionArray = [1, 2, 3, 4, 5, 6];
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    feedbackBoard = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    while (solution.length < 4) {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        if (!solution.includes(randomNum)) {
            solution.push(randomNum);
        }
    }
    render();
    console.log(solution); // Remove in final code - just to help with testing
    console.log(selectionArray); // Remove in final code - just to help with testing
}

/*----- event listeners -----*/

// When a selection pin is clicked
selectionRowElementArray.forEach(function (pin) {
    pin.addEventListener('click', function (event) {
        console.log(event.target.dataset.selectionPin);
        selectionPinIndex = event.target.dataset.selectionPin;
        markPin(selectionPinIndex);
    });
}); // This just registers the click at the moment, it doesn't do anything with the click

/*----- functions -----*/

// Overall render function
function render() {
    renderSelection();
    renderSolution();
    renderBoard();
}

// Colour the selection pins the right colours
function renderSelection() {
    for (let i = 0; i < selectionArray.length; i++) {
        let selectionPin = document.querySelector(
            `[data-selection-pin="${i}"]`
        );
        if (selectionArray[i] === 1) {
            selectionPin.style.background = 'var(--selection-0-colour)';
        } else if (selectionArray[i] === 2) {
            selectionPin.style.background = 'var(--selection-1-colour)';
        } else if (selectionArray[i] === 3) {
            selectionPin.style.background = 'var(--selection-2-colour)';
        } else if (selectionArray[i] === 4) {
            selectionPin.style.background = 'var(--selection-3-colour)';
        } else if (selectionArray[i] === 5) {
            selectionPin.style.background = 'var(--selection-4-colour)';
        } else if (selectionArray[i] === 6) {
            selectionPin.style.background = 'var(--selection-5-colour)';
        } else {
        }
    }
}

// Looks at the values of the solution array and then colours the pins to their corresponding colour, and finally hides the solution.
function renderSolution() {
    for (let i = 0; i < solution.length; i++) {
        let solutionPin = document.querySelector(`[data-solution-spot="${i}"]`);
        if (solution[i] === 1) {
            solutionPin.style.background = 'var(--selection-0-colour)';
        } else if (solution[i] === 2) {
            solutionPin.style.background = 'var(--selection-1-colour)';
        } else if (solution[i] === 3) {
            solutionPin.style.background = 'var(--selection-2-colour)';
        } else if (solution[i] === 4) {
            solutionPin.style.background = 'var(--selection-3-colour)';
        } else if (solution[i] === 5) {
            solutionPin.style.background = 'var(--selection-4-colour)';
        } else if (solution[i] === 6) {
            solutionPin.style.background = 'var(--selection-5-colour)';
        } else {
        }
        // solutionPin.style.visibility = `hidden`; Commented out just while testing the game
    }
}

// Renders the game board with any relevant pin colours
function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        for (j = 0; j < board[i].length; j++) {
            const boardPin = document.querySelector(
                `[data-guess-row="${i}"][data-guess-pin="${j}"]`
            );
            if (board[i][j] === 1) {
                boardPin.style.background = 'var(--selection-0-colour)';
            } else if (board[i][j] === 2) {
                boardPin.style.background = 'var(--selection-1-colour)';
            } else if (board[i][j] === 3) {
                boardPin.style.background = 'var(--selection-2-colour)';
            } else if (board[i][j] === 4) {
                boardPin.style.background = 'var(--selection-3-colour)';
            } else if (board[i][j] === 5) {
                boardPin.style.background = 'var(--selection-4-colour)';
            } else if (board[i][j] === 6) {
                boardPin.style.background = 'var(--selection-5-colour)';
            } else {
            }
        }
    }
}

// Adds relevant colour value to the next available pin array in the next available guess row.
function markPin(selectionPinIndex) {
    // Find the row and pin number for the next available spot to add a guess
    // Update the game board variable in the array with the corresponding index + 1
}
