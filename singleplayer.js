const grid = document.querySelector(".connect-four");
const rows = 6;
const cols = 7;
let currentPlayer = 1;
let isSinglePlayer = true;
let isPlayerTurn = true;
let isGameLocked = false;


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        grid.appendChild(cell);
    }
}


grid.addEventListener("click", handleCellClick);






const popup = document.createElement("div");
popup.classList.add("popup");
let isPopupDisplayed = false;


document.addEventListener("DOMContentLoaded", () => {
    const goHomeButton = document.getElementById("go-home");
    const restartButton = document.getElementById("restart");


    grid.addEventListener("click", handleCellClick);

    goHomeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    restartButton.addEventListener("click", function () {
        restartGame();
        isGameLocked = false;
    });


    const playAgainButton = popup.querySelector(".play-again");
    playAgainButton.addEventListener("click", function () {
        window.location.href = "frontpage.html";
        isPopupDisplayed = false;
    });



    const closePopupButton = popup.querySelector("#close-popup");
    closePopupButton.addEventListener("click", () => {
        popup.remove();
        isPopupDisplayed = false;

    });
});



function handleCellClick(event) {
    if (isGameLocked) {
        return;
    }

    if (!isPlayerTurn) {
        return;
    }

    const clickedCell = event.target;
    const col = clickedCell.dataset.col;

    const emptyCell = findEmptyCell(col);

    if (emptyCell !== null) {
        const currentPlayerClass = `player${currentPlayer}`;
        emptyCell.classList.add(currentPlayerClass, "clicked");

        if (checkWin(emptyCell)) {
            displayWinPopup(currentPlayer === 1 ? "Red" : "Yellow");
        } else if (checkDraw()) {

        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            isPlayerTurn = false;
            setTimeout(computerMove, 1000);
        }
    }
}




function computerMove() {
    if (isPlayerTurn) {
        return;
    }

    const availableCols = Array.from({ length: cols }, (_, col) =>
        findEmptyCell(col) ? col : null
    ).filter(col => col !== null);

    if (availableCols.length === 0) {
        return;
    }

    const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
    const emptyCell = findEmptyCell(randomCol);
    emptyCell.classList.add(`player${currentPlayer}`, "clicked");

    if (checkWin(emptyCell)) {
        displayWinPopup(currentPlayer === 1 ? "Red" : "Yellow");
    } else if (checkDraw()) {

    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        isPlayerTurn = true;
    }
}




function findEmptyCell(col) {
    const cells = Array.from(document.querySelectorAll(`[data-col="${col}"]`));
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains(`player1`) && !cells[i].classList.contains(`player2`)) {
            return cells[i];
        }
    }
    return null;
}

function checkWin(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const player = cell.classList.contains(`player1`) ? 1 : 2;

    function checkDirection(dx, dy) {
        let count = 0;
        for (let i = 1; i < 4; i++) {
            const newRow = row + i * dx;
            const newCol = col + i * dy;
            const neighborCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"].player${player}`);
            if (neighborCell) {
                count++;
            } else {
                break;
            }
        }
        return count;
    }


    if (checkDirection(0, 1) + checkDirection(0, -1) >= 3) {
        return true;
    }


    if (checkDirection(1, 0) >= 3) {
        return true;
    }


    if (checkDirection(1, 1) + checkDirection(-1, -1) >= 3) {
        return true;
    }


    if (checkDirection(1, -1) + checkDirection(-1, 1) >= 3) {
        return true;
    }

    return false;
}

function checkDraw() {
    for (let col = 0; col < cols; col++) {
        if (!findEmptyCell(col)) {
            return true;
        }
    }
    return false;
}



if (!isPopupDisplayed) {
    grid.addEventListener("click", handleCellClick);
}

function displayWinPopup(winningColor) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <p class="blink-text">Congrats, ${winningColor} won the game!</p>
        <button class="play-again">Play Again</button>
        <button id="close-popup">Close</button>
        <p class="popup-footer">&copy; 2023 Derrick Marques. All rights reserved. | <a href="https://github.com/Djmarques18" target="_blank">GitHub</a></p>
    `;

    document.body.appendChild(popup);
    isGameLocked = true;
    grid.removeEventListener("click", handleCellClick);

    const playAgainButton = popup.querySelector(".play-again");
    const closePopupButton = popup.querySelector("#close-popup");

    playAgainButton.addEventListener("click", () => {
        window.location.href = "index.html";
        isPopupDisplayed = false;
    });

    closePopupButton.addEventListener("click", () => {
        popup.remove();
        isGameLocked = true;
        grid.removeEventListener("click", handleCellClick);

    });
}





function resetGame() {

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("player1", "player2", "clicked");
    });


    currentPlayer = 1;
    isPlayerTurn = true;
}



function restartGame() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }


    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("player1", "player2", "clicked");
    });


    currentPlayer = 1;
    isPlayerTurn = true;


    cells.forEach(cell => {
        cell.classList.add("hoverable");
    });
    grid.addEventListener("click", handleCellClick);
}


document.addEventListener("DOMContentLoaded", () => {
    const goHomeButton = document.getElementById("go-home");
    const restartButton = document.getElementById("restart");

    goHomeButton.addEventListener("click", () => {
        window.location.href = "frontpage.html";
    });

    restartButton.addEventListener("click", () => {

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.classList.remove("player1", "player2", "clicked");
        });


        resetGame();
        isGameLocked = false;
    });


    grid.addEventListener("click", handleCellClick);
});


































