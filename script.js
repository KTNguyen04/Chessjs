import createPiece from "./chess_man.js";

var board = createBoard();
var domBoard = document.querySelector(".board");
console.log(domBoard);
function initBoard() {
  // console.log(board);
  renderPiece();

  // console.log(mapping(0, 1));
}

function resize() {
  let cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    cell.style.height = cell.offsetWidth + "px";
    // cell.style.fontSize = 0.8 * cell.offsetWidth + "px";

    cell.style.fontSize = 0.8 * cell.offsetWidth + "px";

    // cell.querySelector("div").style.height = cell.offsetWidth + "px";
  }
}
function enableDragDrop() {
  let cell_pieces = document.querySelectorAll(".cell div");
  for (let piece of cell_pieces) {
    piece.setAttribute("draggable", "true");
    domBoard.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("id", event.target.id);
      event.target.style.opacity = "0.6";
    });
    domBoard.addEventListener("dragend", (event) => {
      event.target.style.opacity = "1";
    });
    domBoard.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    domBoard.addEventListener("drop", (event) => {
      let id = event.dataTransfer.getData("id");
      let target = event.target;
      console.log();
      if (target.classList.contains("cell")) {
        target.appendChild(document.getElementById(id));
      } else {
        target.parentNode.insertBefore(document.getElementById(id), target);
      }
    });
    // console.log(piece.dragStart);
  }

  // console.log(_cell_pieces);
}

function createBoard() {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  for (let i = 0; i < 8; ++i) {
    board[1][i] = createPiece("pawn");
  }
  for (let i = 0; i < 8; ++i) {
    board[6][i] = createPiece("white_pawn");
  }

  board[0][0] = createPiece("rook");
  board[0][1] = createPiece("knight");
  board[0][2] = createPiece("bishop");
  board[0][3] = createPiece("queen");
  board[0][4] = createPiece("king");
  board[0][5] = createPiece("bishop");
  board[0][6] = createPiece("knight");
  board[0][7] = createPiece("rook");

  board[7][0] = createPiece("white_rook");
  board[7][1] = createPiece("white_knight");
  board[7][2] = createPiece("white_bishop");
  board[7][3] = createPiece("white_queen");
  board[7][4] = createPiece("white_king");
  board[7][5] = createPiece("white_bishop");
  board[7][6] = createPiece("white_knight");
  board[7][7] = createPiece("white_rook");

  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      let { row: c_row, col: c_col } = mapping(i, j);

      const queryRowClass = ".board-row-" + c_row;
      const queryColClass = ".board-col-" + c_col;
      let c_cell = document
        .querySelector(queryRowClass)
        .querySelector(queryColClass);

      c_cell.id = c_row + c_col;
    }
  }
  return board;
}

function renderPiece() {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      if (board[i][j] !== null && board[i][j].alive) {
        let { row: c_row, col: c_col } = mapping(i, j);

        const queryRowClass = ".board-row-" + c_row;
        const queryColClass = ".board-col-" + c_col;
        let c_cell = document
          .querySelector(queryRowClass)
          .querySelector(queryColClass);

        const pieceDiv = document.createElement("div");
        pieceDiv.setAttribute("id", "start" + c_row + c_col);
        pieceDiv.innerText = board[i][j].symbol;
        // console.log(pieceDiv);
        c_cell.appendChild(pieceDiv);
      }
    }
  }
}

function mapping(row, col) {
  const colLetter = String.fromCharCode(65 + col);
  return { row: (8 - row).toString(), col: colLetter };
}
window.addEventListener("load", initBoard);
window.addEventListener("load", resize);
window.addEventListener("load", enableDragDrop);

window.addEventListener("resize", resize);
