/*----- constants -----*/

/*----- declare variables -----*/
let board = [];
let solution = [];
let selectionArray = [];
let feedbackBoard = [];
let gameScore = 0;

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
    while (solution.length < 4) {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        if (!solution.includes(randomNum)) {
            solution.push(randomNum);
        }
    }
    solutionPinsElementArray.forEach(function (pin) {
        pin.style.visibility = `hidden`;
    });
    previousScoreHeadingElement.style.visibility = `hidden`;
    render();
    console.log(solution);
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

// When the 'another round' button is clicked
playAnotherRoundButtonElement.addEventListener('click', function (event) {
    init();
    previousScoreHeadingElement.style.visibility = `visible`;
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
    render();
    messageBoardElement.innerHTML = '';
    scoreboardElement.innerHTML = '';
});

// When the 'restart game' button is clicked
restartGameButtonElement.addEventListener('click', function (event) {
    init();
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
    render();
    messageBoardElement.innerHTML = '';
    scoreboardElement.innerHTML = '';
    previousScoresElement.innerHTML = '';
});

/*----- functions -----*/

// Adds relevant colour value to the next available pin array in the next available guess row.
function markPin(selectionPinColourNumber) {
    if (!isNaN(selectionPinColourNumber)) {
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

// Takes a row and confirms if it has no non-zero elements in it (i.e. it is 'complete')
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
        let solutionCopy = [...solution];
        let guessRowCopy = [...guessRow];
        let gameRowIndex = board.indexOf(guessRow);
        for (let i = 0; i < guessRowCopy.length; i++) {
            if (guessRowCopy[i] === solutionCopy[i]) {
                feedbackPins.push(2);
                solutionCopy[i] = 0;
                guessRowCopy[i] = 0;
            }
        }
        for (let i = 0; i < guessRowCopy.length; i++) {
            if (
                solutionCopy[i] != 0 &&
                solutionCopy.includes(guessRowCopy[i])
            ) {
                feedbackPins.push(1);
                let solutionCopyIndex = solutionCopy.indexOf(guessRowCopy[i]);
                guessRowCopy[i] = 0;
                solutionCopy[solutionCopyIndex] = 0;
            }
        }
        feedbackPins.sort();
        feedbackPins.reverse();
        if (feedbackPins.length < 4) {
            const zerosToAdd = 4 - feedbackPins.length;
            for (let i = 0; i < zerosToAdd; i++) {
                feedbackPins.push(0);
            }
        }
        feedbackBoard[gameRowIndex] = feedbackPins;
    }
}

// Checks if four guesses in a row have been made, and if so, provides feedback. ++ Also checks if there is a win or if the game is over - and adds messages accordining
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

// Calculates your game score and adds it to the scores array
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
        console.log(emptyRowsCount);
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
