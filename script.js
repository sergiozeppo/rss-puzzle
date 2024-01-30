let currentType = "";
let down = false;
let rmb = false;
let lmb = false;

function clearCells() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.onclick = fillCell;
    cell.oncontextmenu = fillCross;
    // cell.onmousedown = dragCells;
    // cell.addEventListener("click", fillCell);
    // cell.addEventListener("contextmenu", fillCross);
  }
}

function fillCell() {
  down = true;
  lmb = true;
  if (this.classList.contains("filled")) {
    this.classList?.remove("filled");
    //   this.classList.add("crossed");
    currentType = "";
  } else if (this.classList.contains("crossed")) {
    this.classList?.remove("crossed");
    this.classList.add("filled");
    currentType = "filled";
  } else {
    this.classList.add("filled");
    currentType = "filled";
  }
}

function fillCross() {
  down = true;
  rmb = true;
  if (this.classList.contains("filled")) {
    this.classList.remove("filled");
    this.classList.add("crossed");
    currentType = "crossed";
  } else if (this.classList.contains("crossed")) {
    this.classList.remove("crossed");
    currentType = "";
  } else {
    this.classList.add("crossed");
    currentType = "crossed";
  }
}

// function dragCells() {
//   if (down) {
//     if (rmb) {
//       if (currentType === "") {
//         this.classList.add("crossed");
//       } else if (currentType === "filled") {
//         this.classList?.remove("filled");
//         this.classList.add("crossed");
//       } else if (currentType === "crossed") {
//         // crossed
//         this.classList?.remove("filled");
//         this.classList.add("crossed");
//       }
//     }
//     if (lmb) {
//       if (currentType === "") {
//         this.classList.add("filled");
//       } else if (currentType === "filled") {
//         this.classList.add("filled");
//         this.classList?.remove("crossed");
//       } else if (currentType === "crossed") {
//         // crossed
//         this.classList?.remove("crossed");
//         this.classList.add("filled");
//       }
//     }
//   }
// }
function disablecontext() {
  return false;
}
const game = document.querySelector(".game");
game.oncontextmenu = disablecontext;
clearCells();
