const grid = document.querySelector(".connect-four");
const rows = 6;
const cols = 7;
let currentPlayer = 1;
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

function handleCellClick(event) {
  const clickedCell = event.target;
  const col = clickedCell.dataset.col;

  const emptyCell = findEmptyCell(col);

  if (emptyCell !== null) {
    emptyCell.classList.add(`player${currentPlayer}`);

    if (checkWin(emptyCell) || checkDraw()) {
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }
}

function resetGame() {
  isGameLocked = false;
  currentPlayer = 1;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("player1", "player2", "clicked");
  });
}

function findEmptyCell(col) {
  const cells = Array.from(document.querySelectorAll(`[data-col="${col}"]`));
  for (let i = cells.length - 1; i >= 0; i--) {
    if (
      !cells[i].classList.contains("player1") &&
      !cells[i].classList.contains("player2")
    ) {
      return cells[i];
    }
  }
  return null;
}

function checkWin(cell) {
  return false;
}

function checkDraw() {
  return false;
}

function checkWin(cell) {
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const currentPlayerClass = `player${currentPlayer}`;

  let consecutiveCount = 0;
  for (let i = 0; i < cols; i++) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${i}"]`);
    if (cell.classList.contains(currentPlayerClass)) {
      consecutiveCount++;
      if (consecutiveCount === 4) {
        return true;
      }
    } else {
      consecutiveCount = 0;
    }
  }

  consecutiveCount = 0;
  for (let i = 0; i < rows; i++) {
    const cell = document.querySelector(`[data-row="${i}"][data-col="${col}"]`);
    if (cell.classList.contains(currentPlayerClass)) {
      consecutiveCount++;
      if (consecutiveCount === 4) {
        return true;
      }
    } else {
      consecutiveCount = 0;
    }
  }

  consecutiveCount = 0;
  for (let i = -3; i <= 3; i++) {
    const newRow = row + i;
    const newCol = col + i;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const cell = document.querySelector(
        `[data-row="${newRow}"][data-col="${newCol}"]`
      );
      if (cell.classList.contains(currentPlayerClass)) {
        consecutiveCount++;
        if (consecutiveCount === 4) {
          return true;
        }
      } else {
        consecutiveCount = 0;
      }
    }
  }

  consecutiveCount = 0;
  for (let i = -3; i <= 3; i++) {
    const newRow = row + i;
    const newCol = col - i;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const cell = document.querySelector(
        `[data-row="${newRow}"][data-col="${newCol}"]`
      );
      if (cell.classList.contains(currentPlayerClass)) {
        consecutiveCount++;
        if (consecutiveCount === 4) {
          return true;
        }
      } else {
        consecutiveCount = 0;
      }
    }
  }

  return false;
}

function handleCellClick(event) {
  if (isGameLocked) {
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
    }
  }
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
  grid.removeEventListener("click", handleCellClick);

  const playAgainButton = popup.querySelector(".play-again");
  playAgainButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const closePopupButton = popup.querySelector("#close-popup");
  closePopupButton.addEventListener("click", () => {
    popup.remove();
    isPopupDisplayed = false;
    grid.addEventListener("click", handleCellClick);
    isGameLocked = true;

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("hoverable");
    });
  });
}

function restartGame() {
  const popup = document.querySelector(".popup");
  if (popup) {
    popup.remove();
  }

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("player1", "player2", "clicked");
  });

  currentPlayer = 1;
  isPlayerTurn = true;

  cells.forEach((cell) => {
    cell.classList.add("hoverable");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const goHomeButton = document.getElementById("go-home");
  const restartButton = document.getElementById("restart");

  goHomeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  restartButton.addEventListener("click", () => {
    resetGame();
    isGameLocked = false;
  });
});
