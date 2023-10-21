/*----- constants -----*/

/*----- declare variables -----*/
let board = [];
let solution = [];
let selectionArray = [];
let feedbackBoard = [];

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
    console.log(`Solution array: `, solution); // Remove in final code - just to help with testing
    console.log(`Selection array: `, selectionArray); // Remove in final code - just to help with testing
    console.log(`Original board: `, board); // Remove in final code - just to help with testing
}

/*----- event listeners -----*/

// When a selection pin is clicked
selectionRowElementArray.forEach(function (pin) {
    pin.addEventListener('click', function (event) {
        selectionPinColourNumber = parseInt(event.target.dataset.colour);
        markPin(selectionPinColourNumber);
    });
});

/*----- functions -----*/

// Adds relevant colour value to the next available pin array in the next available guess row.
function markPin(selectionPinColourNumber) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                board[i][j] = selectionPinColourNumber;
                renderBoard();
                return;
            }
        }
    }
}

// Checks if four guesses in a row have been made, and if so, provides feedback. ++ Also checks if there is a win or if the game is over - and adds messages accordining
function guessFeedback() {
    // check the board array, check each row and see if any rows have four non-zero values
    // -- if no, exit the function
    // -- if yes, for each row with 4 non-zero values:
    // ---- loop through each value one by one
    // ---- firstly, see if it is equal to the solutions value at the same index - if so, push '1' to the relevant feedback board row (to the first available spot)
    // ---- if that isn't true, see if it is equal to any of the solutions values, in any of the index spots - if so, push '2' to the relevant feedback board row (to the first available spot)
    // ---- if that also isn't true, move to the next guess value and repeat the above.
    // -- once feedback has been given & rendered, then checkWin
    // ---- if win is true, stop the game, and add a message to the message board. Don't allow anymore clicks.
    // ---- if win is false, checkGameOver. If true - display a message in the messageboard. If false - allow more clicks.
}

// Checks if any of the guess rows = the solution row
function checkWin() {
    for (let guessRow of board) {
        if (guessRow.every((element, index) => element === solution[index])) {
            return true;
        }
    }
}

// Checks if it is 'game over'
function checkGameOver() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

/*----- render functions -----*/

// Overall render function
function render() {
    renderSelection();
    renderSolution();
    renderBoard();
    renderFeedback();
}

// Colour the selection pins the right colours
function renderSelection() {
    for (let i = 0; i < selectionArray.length; i++) {
        let selectionPin = document.querySelector(
            `[data-selection-pin="${i}"]`
        );
        if (selectionArray[i] === 1) {
            selectionPin.style.background = 'var(--selection-1-colour)';
        } else if (selectionArray[i] === 2) {
            selectionPin.style.background = 'var(--selection-2-colour)';
        } else if (selectionArray[i] === 3) {
            selectionPin.style.background = 'var(--selection-3-colour)';
        } else if (selectionArray[i] === 4) {
            selectionPin.style.background = 'var(--selection-4-colour)';
        } else if (selectionArray[i] === 5) {
            selectionPin.style.background = 'var(--selection-5-colour)';
        } else if (selectionArray[i] === 6) {
            selectionPin.style.background = 'var(--selection-6-colour)';
        } else {
        }
    }
}

// Looks at the values of the solution array and then colours the pins to their corresponding colour, and finally hides the solution.
function renderSolution() {
    for (let i = 0; i < solution.length; i++) {
        let solutionPin = document.querySelector(`[data-solution-spot="${i}"]`);
        if (solution[i] === 1) {
            solutionPin.style.background = 'var(--selection-1-colour)';
        } else if (solution[i] === 2) {
            solutionPin.style.background = 'var(--selection-2-colour)';
        } else if (solution[i] === 3) {
            solutionPin.style.background = 'var(--selection-3-colour)';
        } else if (solution[i] === 4) {
            solutionPin.style.background = 'var(--selection-4-colour)';
        } else if (solution[i] === 5) {
            solutionPin.style.background = 'var(--selection-5-colour)';
        } else if (solution[i] === 6) {
            solutionPin.style.background = 'var(--selection-6-colour)';
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
                boardPin.style.background = 'var(--selection-1-colour)';
            } else if (board[i][j] === 2) {
                boardPin.style.background = 'var(--selection-2-colour)';
            } else if (board[i][j] === 3) {
                boardPin.style.background = 'var(--selection-3-colour)';
            } else if (board[i][j] === 4) {
                boardPin.style.background = 'var(--selection-4-colour)';
            } else if (board[i][j] === 5) {
                boardPin.style.background = 'var(--selection-5-colour)';
            } else if (board[i][j] === 6) {
                boardPin.style.background = 'var(--selection-6-colour)';
            } else {
            }
        }
    }
}

// Renders the feedback board with any relevant pin colours
function renderFeedback() {
    for (let i = 0; i < feedbackBoard.length; i++) {
        for (j = 0; j < feedbackBoard[i].length; j++) {
            const feedbackPin = document.querySelector(
                `[data-feedback-row="${i}"][data-feedback-pin="${j}"]`
            );
            if (feedbackBoard[i][j] === 1) {
                feedbackPin.style.background = 'var(--feedback-1-colour)';
            } else if (feedbackBoard[i][j] === 2) {
                feedbackPin.style.background = 'var(--feedback-2-colour)';
            } else {
            }
        }
    }
}
