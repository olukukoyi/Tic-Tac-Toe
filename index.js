const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const button = document.getElementById("winners-button");
const winner = document.getElementById("winning-screen");
const winnerMessage = document.getElementById("winningMessage");
const x_class = "x";
const circle_class = "circle";
const winning_array = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn = false;

startGame();

function startGame() {
  circleTurn = false;
  winner.classList.remove("active");
  boardHoverClass();
  cells.forEach((cell) => {
    cell.classList.remove(circle_class);
    cell.classList.remove(x_class);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  //placeMark
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  placeMark(cell, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //check for draw
  else if (isDraw()) {
    endGame(true);
  } else {
    //switch turns DONE

    circleTurn = !circleTurn;
    boardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function boardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (circleTurn) {
    board.classList.add(circle_class);
  } else {
    board.classList.add(x_class);
  }
}

function checkWin(currentClass) {
  return winning_array.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winnerMessage.innerText = "Draw!";
  } else {
    winnerMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winner.classList.add("active");
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}

button.addEventListener("click", startGame);
