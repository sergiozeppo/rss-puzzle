import matrix from "./matrix.js";
import matrixNames from "./matrixNames.js";

let currentType = "";
let down = false;
let rmb = false;
let lmb = false;

function clearCells() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.classList?.remove("filled", "crossed");
    cell.onclick = fillCell;
    cell.oncontextmenu = fillCross;
    // cell.onmousedown = dragCells;
    // cell.addEventListener("click", fillCell);
    // cell.addEventListener("contextmenu", fillCross);
  }
}

function clearClues() {
  const clues = document.querySelectorAll(".clue");
  for (let i = 0; i < clues.length; i++) {
    clues[i].textContent = "";
    // cell.onclick = fillCell;
    // cell.oncontextmenu = fillCross;
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
      loadPuzzles(draft);
    } else if (level.classList.contains("level-item-active")) {
      level.classList.remove("level-item-active");
    }
  });
  loadDraft(draft);
}

function loadDraft(draft) {
  const container = document.querySelector(".container");
  const createTable = document.createElement("table");
  const createTbody = document.createElement("tbody");
  createTable.appendChild(createTbody);
  createTable.classList.add("game");
  if (draft === "easy") {
    if (document.querySelector(".game")) {
      container.removeChild(document.querySelector(".game"));
    }
    container.appendChild(createTable);
    for (let i = 0; i < 6; i++) {
      if (i === 0) {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 6; j++) {
          const th = parent.document.createElement("th");
          th.classList.add("clue", `th_${i}_${j}`);
          tr.appendChild(th);
        }
        createTbody.appendChild(tr);
      } else {
        const tr = parent.document.createElement("tr");

        for (let j = 0; j < 6; j++) {
          if (j === 0) {
            const th = parent.document.createElement("th");
            th.classList.add("clue", `th_${i}_${j}`);
            tr.appendChild(th);
          } else {
            const td = parent.document.createElement("td");
            td.classList.add("cell", `td_${i}_${j}`);
            tr.appendChild(td);
          }
        }
        createTbody.appendChild(tr);
      }
    }
  } else if (draft === "normal") {
    if (document.querySelector(".game")) {
      container.removeChild(document.querySelector(".game"));
    }
    container.appendChild(createTable);
    for (let i = 0; i < 11; i++) {
      if (i === 0) {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 11; j++) {
          const th = parent.document.createElement("th");
          th.classList.add("clue", `th_${i}_${j}`);
          tr.appendChild(th);
        }
        createTbody.appendChild(tr);
      } else {
        const tr = parent.document.createElement("tr");
        for (let j = 0; j < 11; j++) {
          if (j === 0) {
            const th = parent.document.createElement("th");
            th.classList.add("clue", `th_${i}_${j}`);
            tr.appendChild(th);
          } else {
            const td = parent.document.createElement("td");
            td.classList.add("cell", `td_${i}_${j}`);
            tr.appendChild(td);
          }
        }
        createTbody.appendChild(tr);
      }
    }
  } else if (draft === "hard") {
    if (document.querySelector(".game")) {
      container.removeChild(document.querySelector(".game"));
    }
    container.appendChild(createTable);
    for (let i = 0; i < 16; i++) {
      if (i === 0) {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 16; j++) {
          const th = parent.document.createElement("th");
          th.classList.add("clue", `th_${i}_${j}`);
          tr.appendChild(th);
        }
        createTbody.appendChild(tr);
      } else {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 16; j++) {
          if (j === 0) {
            const th = parent.document.createElement("th");
            th.classList.add("clue", `th_${i}_${j}`);
            tr.appendChild(th);
          } else {
            const td = parent.document.createElement("td");
            td.classList.add("cell", `td_${i}_${j}`);
            tr.appendChild(td);
          }
        }
        createTbody.appendChild(tr);
      }
    }
  }
  clearCells();
  clearClues();
  disableRMB();
}

function loadPuzzles(draft) {
  const levels = document.querySelector(".levels");
  const createPuzzleList = parent.document.createElement("ul");
  if (draft === "easy") {
    if (document.querySelector(".menu")) {
      levels.removeChild(document.querySelector(".menu"));
    }

    for (let i = 0; i < matrixNames[0].length; i++) {
      const puzzleItem = parent.document.createElement("li");
      createPuzzleList.appendChild(puzzleItem);
      puzzleItem.dataset.level = 0;
      puzzleItem.dataset.puzzle = i;
      puzzleItem.textContent = matrixNames[0][i];
    }

    createPuzzleList.classList.add("menu");
    levels.appendChild(createPuzzleList);
  }
  if (draft === "normal") {
    if (document.querySelector(".menu")) {
      levels.removeChild(document.querySelector(".menu"));
    }

    for (let i = 0; i < matrixNames[1].length; i++) {
      const puzzleItem = parent.document.createElement("li");
      createPuzzleList.appendChild(puzzleItem);
      puzzleItem.dataset.level = 1;
      puzzleItem.dataset.puzzle = i;
      puzzleItem.textContent = matrixNames[1][i];
    }

    createPuzzleList.classList.add("menu");
    levels.appendChild(createPuzzleList);
  }
  if (draft === "hard") {
    if (document.querySelector(".menu")) {
      levels.removeChild(document.querySelector(".menu"));
    }

    for (let i = 0; i < matrixNames[2].length; i++) {
      const puzzleItem = parent.document.createElement("li");
      createPuzzleList.appendChild(puzzleItem);
      puzzleItem.dataset.level = 2;
      puzzleItem.dataset.puzzle = i;
      puzzleItem.textContent = matrixNames[2][i];
    }

    createPuzzleList.classList.add("menu");
    levels.appendChild(createPuzzleList);
  }
  document.querySelectorAll("li").forEach((el) => {
    el.addEventListener("click", fillDraft);
  });
}

function fillDraft(e) {
  clearClues();
  clearCells();
  const currentLevel = e.target.closest("li");
  const chosenPuzzle =
    matrix[currentLevel.dataset.level][currentLevel.dataset.puzzle];
  console.log(chosenPuzzle);
  const game = document.querySelector(".game");
  console.log(game);
  console.log("chose" + chosenPuzzle[0][2]);
  for (let i = 0; i < chosenPuzzle.length; i++) {
    const clueSum = [];
    let clue = 0;
    for (let j = 0; j < chosenPuzzle.length; j++) {
      if (chosenPuzzle[i][j] === 1) {
        clue += 1;
      }
      if (chosenPuzzle[i][j] === 0 || j === chosenPuzzle.length - 1) {
        if (clue !== 0) {
          console.log(clue, i, j);
          clueSum.push(clue);
          clue = 0;
          console.log(clueSum, i, j);
          const span = document.createElement("span");
          span.textContent = clueSum[clueSum.length - 1];
          game.querySelector(`.th_${i + 1}_0`).appendChild(span);
        }
      }
    }
  }
  const chosenPuzzleRev = chosenPuzzle[0].map((_, indexCol) =>
    chosenPuzzle.map((row) => row[indexCol])
  );
  for (let i = 0; i < chosenPuzzleRev.length; i++) {
    const clueSum = [];
    let clue = 0;
    for (let j = 0; j < chosenPuzzleRev.length; j++) {
      if (chosenPuzzleRev[i][j] === 1) {
        clue += 1;
      }
      if (chosenPuzzleRev[i][j] === 0 || j === chosenPuzzleRev.length - 1) {
        if (clue !== 0) {
          console.log(clue, i, j);
          clueSum.push(clue);
          clue = 0;
          console.log(clueSum, i, j);
          const span = document.createElement("span");
          const br = document.createElement("br");
          span.textContent = clueSum[clueSum.length - 1];
          game.querySelector(`.th_0_${i + 1}`).appendChild(span);
          game.querySelector(`.th_0_${i + 1}`).appendChild(br);
        }
      }
    }
  }
}

loadDraft("easy");
function disablecontext() {
  return false;
}
function disableRMB() {
  const game = document.querySelector(".game");
  game.oncontextmenu = disablecontext;
}
disableRMB();
clearCells();
