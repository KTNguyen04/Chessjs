import createPiece from "./chess_man.js";
import { chooseWay } from "./chess_man.js";
var board = createBoard();
var domBoard = document.querySelector(".board");
console.log(domBoard);
function initBoard() {
  // console.log(board);
  renderPiece();
  // board[1][0] = null;
  defineWay(board[1][0]);
  moveHandler();

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
  }

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
    // event.preventDefault();

    let drag_id = event.dataTransfer.getData("id");
    console.log(drag_id);
    let dragged_piece = document.getElementById(drag_id);
    let target = event.target;

    let o_pos = event.dataTransfer.getData("id").slice(-2).split("");
    console.log("le", event.dataTransfer.getData("id"));
    let { row: o_row, col: o_col } = r_mapping(o_pos[0], o_pos[1]);
    // console.log(o_row, o_col);
    if (
      board[o_row][o_col].possible_moves.some(
        (p_move) => p_move[0] == target.id[0] && p_move[1] == target.id[1]
      )
    ) {
      dragged_piece.setAttribute("id", "start" + target.id);
      let rc = target.id.split("");

      console.log(target.id);
      let { row: c_row, col: c_col } = r_mapping(rc[0], rc[1]);

      board[c_row][c_col] = board[o_row][o_col];
      board[c_row][c_col].c_x = rc[0];
      board[c_row][c_col].c_y = rc[1];
      board[o_row][o_col] = null;
      renderPiece();
      console.log(c_row, c_col);
      console.log(board[c_row][c_col]);
    }
    moveHandler();
  });
  // console.log(piece.dragStart);

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
      if (board[i][j] !== null) {
        board[i][j].c_x = c_row;
        board[i][j].c_y = c_col;
      }
      const queryRowClass = ".board-row-" + c_row;
      const queryColClass = ".board-col-" + c_col;
      let c_cell = document
        .querySelector(queryRowClass)
        .querySelector(queryColClass);

      c_cell.id = c_row + c_col;

      // console.log(board[i][j]);
    }
  }
  return board;
}

function renderPiece() {
  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      let { row: c_row, col: c_col } = mapping(i, j);

      const queryRowClass = ".board-row-" + c_row;
      const queryColClass = ".board-col-" + c_col;
      let c_cell = document
        .querySelector(queryRowClass)
        .querySelector(queryColClass);
      if (board[i][j] === null) {
        c_cell.innerText = "";
      } else if (board[i][j].alive) {
        if (c_cell.children.length === 0) {
          const pieceDiv = document.createElement("div");
          pieceDiv.setAttribute("draggable", "true");
          pieceDiv.setAttribute("id", "start" + c_row + c_col);
          pieceDiv.innerText = board[i][j].symbol;
          // console.log(pieceDiv);
          c_cell.appendChild(pieceDiv);
        }
      }
      // if(board[i][j]===null){
      //   if(c_cell.)
      //   list.removeChild(list.firstElementChild);
      // }
    }
  }
}

function mapping(row, col) {
  const colLetter = String.fromCharCode(65 + col);
  return { row: (8 - row).toString(), col: colLetter };
}

function r_mapping(row, col) {
  const colLetter = col.charCodeAt(0) - 65;
  return { row: 8 - row, col: parseInt(colLetter) };
}

function defineWay(piece) {
  let potenWay = chooseWay(piece);
  let cur_cell = [piece.c_x, piece.c_y];
  let possi_move = [];
  // console.log(cur_cell);
  // console.log(potenWay);
  // let { row: c_row, col: c_col } = mapping(cur_cell[0], cur_cell[1]);
  for (let dir of potenWay) {
    // console.log("dir", dir);
    for (let move of dir) {
      // console.log("moves", move);

      let move_cell = [
        String.fromCharCode(cur_cell[0].charCodeAt(0) + move[0]),
        String.fromCharCode(cur_cell[1].charCodeAt(0) + move[1]),
      ];
      // console.log(move);
      if (isInBoard(move_cell[0], move_cell[1])) {
        let { row: r, col: c } = r_mapping(move_cell[0], move_cell[1]);

        if (board[r][c] === null) {
          possi_move.push(move_cell);
        } else {
          if (board[r][c].color !== piece.color) {
            possi_move.push(move_cell);
          }
          break;
        }
      }
    }
  }
  piece.possible_moves = possi_move;
  // console.log(potenWay);
  // console.log(piece.possible_moves);
}
function moveHandler() {
  // console.log(board);
  for (let row of board) {
    for (let piece of row) {
      if (piece !== null) {
        defineWay(piece);
        console.log(piece);
      }
    }
  }
}
function isInBoard(i, j) {
  return i >= 1 && i <= 8 && j >= "A" && j <= "H";
}
window.addEventListener("load", initBoard);
window.addEventListener("load", resize);
window.addEventListener("load", enableDragDrop);

window.addEventListener("resize", resize);
