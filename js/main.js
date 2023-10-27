/*----- constants -----*/

/*----- declare variables -----*/
let board;
let solution;
let selectionArray;
let feedbackBoard;
let gameScore;

/*----- cached HTML elements  -----*/
const selectionRowElementArray = document.querySelectorAll(`.selection-pins`);
const messageBoardElement = document.querySelector(`.messages`);
const solutionRowElement = document.querySelector(`.solution-row`);
const solutionPinsElementArray = document.querySelectorAll(`.solution-pin`);
const scoreboardElement = document.querySelector(`.scores`);
const previousScoreHeadingElement = document.querySelector(
    `.previous-scores-heading`
);
const previousScoresElement = document.querySelector(`.previous-scores`);
const playAnotherRoundButtonElement = document.querySelector(
    `.another-round-button`
);
const restartGameButtonElement = document.querySelector(`.restart-button`);

/*----- initialise  -----*/
init();

function init() {
    solution = [];
    selectionArray = [1, 2, 3, 4, 5, 6];
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
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
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    gameScore = 0;
    while (solution.length < 4) {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        if (!solution.includes(randomNum)) {
            // Included to ensure the solution only includes unique numbers (no duplicates)
            solution.push(randomNum);
        }
    }
    solutionPinsElementArray.forEach(function (pin) {
        pin.style.visibility = `hidden`;
    });
    previousScoreHeadingElement.style.visibility = `hidden`;
    render();
    console.log(`(FOR GAME REVIEW) Game Solution:`, solution); // This has been kept in for review purposes, and it will allow you to see the solution in the console while playing the game. Comment this out if you want to remove it.
}

/*----- event listeners -----*/

// When a selection pin is clicked
selectionRowElementArray.forEach(function (pin) {
    pin.addEventListener('click', function (event) {
        let isWon = checkWin();
        let isGameOver = checkGameOver();
        if (isWon) {
            return;
        } else if (isGameOver) {
            return;
        } else {
            selectionPinColourNumber = parseInt(event.target.dataset.colour);
            markPin(selectionPinColourNumber);
        }
    });
});

// When the 'another round' button is clicked (start a new game, render the game board, remove previous messages, but keep previous scores)
playAnotherRoundButtonElement.addEventListener('click', function (event) {
    init();
    setBoardArrayToZero();
    render();
    previousScoreHeadingElement.style.visibility = `visible`;
    messageBoardElement.innerHTML = '';
    scoreboardElement.innerHTML = '';
});

// When the 'restart game' button is clicked (start a new game from scratch, remove all previous scores)
restartGameButtonElement.addEventListener('click', function (event) {
    init();
    setBoardArrayToZero();
    render();
    messageBoardElement.innerHTML = '';
    scoreboardElement.innerHTML = '';
    previousScoresElement.innerHTML = '';
});

/*----- functions -----*/

// Adds relevant value to the next available pin array in the next available guess row, render the board, and check if feedback needs to be given, and if there are any updates to push.
function markPin(selectionPinColourNumber) {
    console.log(selectionPinColourNumber);
    if (!isNaN(selectionPinColourNumber)) {
        // This is included to ensure if a space outside the circle is clicked (which returns NaN) - nothing happens
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 0) {
                    board[i][j] = selectionPinColourNumber;
                    renderBoard();
                    guessFeedback();
                    renderFeedback();
                    gameMessagesAndScores();
                    return;
                }
            }
        }
    }
}

// Takes a guess row and confirms if it has no non-zero elements in it (i.e. is the guess row 'complete')
function isGuessRowComplete(guessRow) {
    for (let i = 0; i < guessRow.length; i++) {
        if (guessRow[i] === 0) {
            return false;
        }
    }
    return true;
}

// Checks a completed row to see if there are equal (same value & position) or similar elements (same value & diff position). Outputs a feedbackPins array and then updates the feedbackBoard with those values.
function checkAgainstSolution(guessRow) {
    if (isGuessRowComplete(guessRow)) {
        const feedbackPins = [];
        // I am creating copies so I don't actually mess with the solution or guess rows (which would alter the game)
        let solutionCopy = [...solution];
        let guessRowCopy = [...guessRow];
        let gameRowIndex = board.indexOf(guessRow);
        // First check if there are any pins in the right colour & position. If there are, log a 2 to the feedback pins array and then clear that value from the solution and guess row arrays (as they don't need to be checked again)
        for (let i = 0; i < guessRowCopy.length; i++) {
            if (guessRowCopy[i] === solutionCopy[i]) {
                feedbackPins.push(2);
                solutionCopy[i] = 0;
                guessRowCopy[i] = 0;
            }
        }
        // Then, with the remaining values in the guess row, see if they are present in the solution array. If so, push a 1 to the feedback pins array and clear it (so you don't check it again if there are duplicates it in the guess row).
        for (let i = 0; i < guessRowCopy.length; i++) {
            if (
                guessRowCopy[i] != 0 &&
                solutionCopy.includes(guessRowCopy[i])
            ) {
                feedbackPins.push(1);
                let solutionCopyIndex = solutionCopy.indexOf(guessRowCopy[i]);
                guessRowCopy[i] = 0;
                solutionCopy[solutionCopyIndex] = 0;
            }
        }
        // So it isn't obvious the order of the feedback, sort the array and then reverse it (so black pins are first, then white pins)
        feedbackPins.sort();
        feedbackPins.reverse();
        // The feedback row needs to be 4 pins in length (even if those are empty), so add 0 elements until the row is 4 in length.
        if (feedbackPins.length < 4) {
            const zerosToAdd = 4 - feedbackPins.length;
            for (let i = 0; i < zerosToAdd; i++) {
                feedbackPins.push(0);
            }
        }
        // Push the feedbackPins array to the feedbackBoard using the right index (taken from index of the guessRow)
        feedbackBoard[gameRowIndex] = feedbackPins;
    }
}

// Processes the guess feedback (goes through each row of the board, sees which ones are complete rows, and then runs them against the solution)
function guessFeedback() {
    for (let i = 0; i < board.length; i++) {
        if (isGuessRowComplete(board[i])) {
            checkAgainstSolution(board[i]);
        }
    }
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

// Calculates game score and adds it to the scores array
function calculateScore() {
    let isGameOver = checkGameOver();
    let isWon = checkWin();
    if (isWon) {
        let emptyRowsCount = 1;
        const emptyRow = [0, 0, 0, 0];
        for (let guessRow of board) {
            if (
                guessRow.every((element, index) => element === emptyRow[index])
            ) {
                emptyRowsCount += 1;
            }
        }
        gameScore = emptyRowsCount * 100;
    } else if (isGameOver) {
        gameScore = 0;
    }
}

// Updates game messages, scores and shows solution for a win or game over
function gameMessagesAndScores() {
    let isWon = checkWin();
    let isGameOver = checkGameOver();
    if (isWon) {
        calculateScore();
        messageBoardElement.innerHTML = `Congratulations! You cracked the code.`;
        scoreboardElement.innerHTML = `You scored ${gameScore.toLocaleString()} points!`;
        previousScoreHeadingElement.style.visibility = `visible`;
        let newScoreNode = document.createElement('li');
        let newScoreText = document.createTextNode(gameScore.toLocaleString());
        newScoreNode.prepend(newScoreText);
        previousScoresElement.prepend(newScoreNode);
        solutionPinsElementArray.forEach(function (pin) {
            pin.style.visibility = `visible`;
        });
    } else if (isGameOver) {
        calculateScore();
        messageBoardElement.innerHTML = `Game over! You didn't solve the secret code.`;
        scoreboardElement.innerHTML = `You didn't score any points`;
        previousScoreHeadingElement.style.visibility = `visible`;
        let newScoreNode = document.createElement('li');
        let newScoreText = document.createTextNode(gameScore.toLocaleString());
        newScoreNode.prepend(newScoreText);
        previousScoresElement.prepend(newScoreNode);
        solutionPinsElementArray.forEach(function (pin) {
            pin.style.visibility = `visible`;
        });
    }
}

// Reset the board to an empty array
function setBoardArrayToZero() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        }
    }
    for (let i = 0; i < feedbackBoard.length; i++) {
        for (let j = 0; j < feedbackBoard[i].length; j++) {
            feedbackBoard[i][j] = 0;
        }
    }
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
        } else if (selectionArray[i] === 0) {
            selectionPin.style.background = `var(--selection-no-colour)`;
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
        } else if (solution[i] === 0) {
            solutionPin.style.background = `var(--selection-no-colour)`;
        }
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
            } else if (board[i][j] === 0) {
                boardPin.style.background = `var(--selection-no-colour)`;
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
                feedbackPin.style.background = `var(--feedback-no-colour)`;
            }
        }
    }
}
