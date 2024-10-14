function initBoard() {
  let cells = document.querySelectorAll(".cell");

  for (let cell of cells) {
    cell.style.height = cell.offsetWidth + "px";
    // cell.style.fontSize = 0.8 * cell.offsetWidth + "px";
    // console.log(cell.querySelector("div"));

    cell.querySelector("div").style.fontSize = 0.8 * cell.offsetWidth + "px";

    // cell.querySelector("div").style.height = cell.offsetWidth + "px";
  }

  //   console.log(board);
  //   for (let i = 1; i <= 7; ++i) {
  //     let rowClone = row.cloneNode(true);

  //     board.appendChild(rowClone);
  //   }
}

window.addEventListener("load", initBoard);
window.addEventListener("resize", initBoard);
