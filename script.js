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
const levels = document.querySelectorAll(".level-item");
levels.forEach((level) => {
  level.addEventListener("click", switchLevel);
});
function switchLevel(e) {
  const currentLevel = e.target.closest(".level-item");
  let draft;
  levels.forEach((level) => {
    if (level === currentLevel) {
      level.classList.add("level-item-active");
      draft = level.dataset.level;
      console.log(draft);
    } else if (level.classList.contains("level-item-active")) {
      level.classList.remove("level-item-active");
    }
  });
  loadDraft(draft);
}

function loadDraft(draft) {
  const game = document.querySelector(".game");
  const createTable = document.createElement("table");
  const createRows = document.createElement("tr");
  const createCells = document.createElement("td");
  const createClues = document.createElement("th");
  if (draft === "Easy") {
    game.appendChild(createTable);
    for (let i = 0; i < 5; i++) {
      game.appendChild(createRows);
      for (let j = 0; j < 5; j++) {
        // if (j > 0) {
        createRows.appendChild(createCells);
      }
    }
  }
}

function disablecontext() {
  return false;
}
const game = document.querySelector(".game");
game.oncontextmenu = disablecontext;
clearCells();
