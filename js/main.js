/*----- constants -----*/

/*----- declare variables -----*/
let board;
let solution = [];
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
    renderSolution();
    console.log(solution); // Remove in final code - just to help with testing
}

/*----- event listeners -----*/

// When a selection pin is clicked

console.log(selectionRowElementArray);

selectionRowElementArray.forEach(function (pin) {
    cell.addEventListener('click', function (event) {
        let isDraw = checkDraw();
        if (winner) {
            return;
        } else if (isDraw) {
            return;
        } else {
            const columnNumberIndex = parseInt(event.target.dataset.column);
            const rowNumberIndex = parseInt(event.target.dataset.row);
            markCell(columnNumberIndex, rowNumberIndex);
        }
    });
});

/*----- functions -----*/

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
