const chessPieces = {
  king: { color: "black", symbol: "♚" },
  queen: { color: "black", symbol: "♛" },
  rook: { color: "black", symbol: "♜" },
  bishop: { color: "black", symbol: "♝" },
  knight: { color: "black", symbol: "♞" },
  pawn: { color: "black", symbol: "️🨾" },
  white_king: { color: "white", symbol: "♔" },
  white_queen: { color: "white", symbol: "♕" },
  white_rook: { color: "white", symbol: "♖" },
  white_bishop: { color: "white", symbol: "♗" },
  white_knight: { color: "white", symbol: "♘" },
  white_pawn: { color: "white", symbol: "🨸" },
};

function createPiece(name) {
  const piece = chessPieces[name];

  return {
    name: name,
    color: piece.color,
    symbol: piece.symbol,
    alive: true,
  };
}

export default createPiece;
