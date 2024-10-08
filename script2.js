const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const messageDisplay = document.getElementById('message');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Player is X, AI is O
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (boardState[index] !== '' || !gameActive || currentPlayer === 'O') {
        return;
    }

    boardState[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkResult();

    if (gameActive) {
        currentPlayer = 'O'; // Switch to AI
        setTimeout(aiMove, 500); // Delay for effect
    }
}

function aiMove() {
    const emptyCells = boardState.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        boardState[randomIndex] = currentPlayer;
        const cellElement = document.querySelector(`.cell[data-index="${randomIndex}"]`);
        cellElement.innerText = currentPlayer;
        checkResult();
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageDisplay.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        messageDisplay.innerText = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch back to player if AI's turn is over
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    messageDisplay.innerText = '';
    board.innerHTML = '';
    createBoard();
}

createBoard();
