const grid = document.querySelector(".connect-four");
const rows = 6;
const cols = 7;
let currentPlayer = 1; // Player 1 starts

// Create the game grid
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        grid.appendChild(cell);
    }
}

// Add event listener for cell clicks
grid.addEventListener("click", handleCellClick);

function handleCellClick(event) {
    const clickedCell = event.target;
    const col = clickedCell.dataset.col;

    // Find the bottom-most empty cell in the clicked column
    const emptyCell = findEmptyCell(col);

    if (emptyCell !== null) {
        // Place player's piece in the empty cell
        emptyCell.classList.add(`player${currentPlayer}`);
        
        // Check for a win or draw
        if (checkWin(emptyCell) || checkDraw()) {
            // Handle win/draw here
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
    }
}

function findEmptyCell(col) {
    const cells = Array.from(document.querySelectorAll(`[data-col="${col}"]`));
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains("player1") && !cells[i].classList.contains("player2")) {
            return cells[i];
        }
    }
    return null; // Column is full
}

function checkWin(cell) {
    // Implement win checking logic here
    return false; // Return true if a win is detected
}

function checkDraw() {
    // Implement draw checking logic here
    return false; // Return true if the game is a draw
}
