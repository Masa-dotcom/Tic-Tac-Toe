document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const message = document.getElementById('msg');
    const reset = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
    let gameActive = true;

    reset.addEventListener('click', resetGame);

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i;
        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    }

    function handleSquareClick(event) {
        const index = event.currentTarget.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.currentTarget.textContent = currentPlayer;

            if (checkForWin()) {    // Win
                message.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                showResetButton(); 
            } else if (gameBoard.every(square => square !== '')) {  // Tie
                message.textContent = "It's a tie!";
                gameActive = false;
                showResetButton();
            } else {    // Switch player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `${currentPlayer === 'X' ? 'Player X' : 'Player O'}'s turn`;
            }
        }
    }

    function checkForWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            // The element a is not empty and a = b = c
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function showResetButton() {
        reset.style.display = 'block';
    }

    function resetGame() {
        // Initialize the game
        currentPlayer = 'X';
        gameBoard = Array(9).fill('');
        gameActive = true;

        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.textContent = '';
        });

        message.textContent = "Player X's turn";

        reset.style.display = 'none';
    }
});
