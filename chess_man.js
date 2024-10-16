export default createPiece;
export { chooseWay };
const chessPieces = {
  king: { color: "black", symbol: "♚" },
  queen: { color: "black", symbol: "♛" },
  rook: { color: "black", symbol: "♜" },
  bishop: { color: "black", symbol: "♝" },
  knight: { color: "black", symbol: "♞" },
  pawn: { color: "black", symbol: "️🨾" },
  white_king: {
    color: "white",
    symbol: "♔",
  },
  white_queen: {
    color: "white",
    symbol: "♕",
  },
  white_rook: {
    color: "white",
    symbol: "♖",
  },
  white_bishop: {
    color: "white",
    symbol: "♗",
  },
  white_knight: {
    color: "white",
    symbol: "♘",
  },
  white_pawn: {
    color: "white",
    symbol: "🨸",
  },
};

function createPiece(name) {
  const piece = chessPieces[name];

  return {
    name: name,
    color: piece.color,
    symbol: piece.symbol,
    alive: true,
    c_x: 0,
    c_y: 0,
    possible_moves: [],
    step: 0,
  };
}

const moves = {
  king: [
    [[-1, -1]],
    [[-1, 0]],
    [[-1, 1]],
    [[0, -1]],
    [[0, 1]],
    [[1, -1]],
    [[1, 0]],
    [[1, 1]],
  ],
  queen: [
    [...Array.from({ length: 7 }, (_, i) => [-i - 1, 0])],
    [...Array.from({ length: 7 }, (_, i) => [i + 1, 0])],
    [...Array.from({ length: 7 }, (_, i) => [0, -i - 1])],
    [...Array.from({ length: 7 }, (_, i) => [0, i + 1])],
    [...Array.from({ length: 7 }, (_, i) => [-i - 1, -i - 1])],
    [...Array.from({ length: 7 }, (_, i) => [-i - 1, i + 1])],
    [...Array.from({ length: 7 }, (_, i) => [i + 1, -i - 1])],
    [...Array.from({ length: 7 }, (_, i) => [i + 1, i + 1])],
  ],
  rook: [
    [...Array.from({ length: 7 }, (_, i) => [-i - 1, 0])], // Up
    [...Array.from({ length: 7 }, (_, i) => [i + 1, 0])], // Down
    [...Array.from({ length: 7 }, (_, i) => [0, -i - 1])], // Left
    [...Array.from({ length: 7 }, (_, i) => [0, i + 1])], // Right
  ],
  bishop: [
    [...Array.from({ length: 7 }, (_, i) => [-i - 1, -i - 1])],
    [...Array.from({ length: 7 }, (_, i) => [-i - 1, i + 1])],
    [...Array.from({ length: 7 }, (_, i) => [i + 1, -i - 1])],
    [...Array.from({ length: 7 }, (_, i) => [i + 1, i + 1])],
  ],
  knight: [
    [[-2, -1]],
    [[-2, 1]],
    [[-1, -2]],
    [[-1, 2]],
    [[1, -2]],
    [[1, 2]],
    [[2, -1]],
    [[2, 1]],
  ],
  white_pawn: [[[1, 0]], [[1, -1]], [[1, 1]]],
  pawn: [[[-1, 0]], [[-1, -1]], [[-1, 1]]],
};

function chooseWay(piece) {
  switch (piece.name) {
    case "king":
    case "white_king":
      return moves.king;
    case "queen":
    case "white_queen":
      return moves.queen;
    case "rook":
    case "white_rook":
      return moves.rook;
    case "bishop":
    case "white_bishop":
      return moves.bishop;
    case "knight":
    case "white_knight":
      return moves.knight;
    case "pawn":
      return moves.pawn;
    case "white_pawn":
      return moves.white_pawn;
    default:
      return [];
  }
}
