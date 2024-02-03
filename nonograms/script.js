import matrix from "./matrix.js";
import matrixNames from "./matrixNames.js";

const body = document.querySelector("body");
const modalCreate = document.createElement("div");
const puzzleCreate = document.createElement("img");
const resultCreate = document.createElement("div");
const greetCreate = document.createElement("h3");
const textCreate = document.createElement("p");
const buttonCreate = document.createElement("button");

// Adding classes to MODAL section
modalCreate.classList.add("modal");
resultCreate.classList.add("result");
greetCreate.classList.add("hint-part");
textCreate.innerHTML = "<p><b></b></p>";
buttonCreate.classList.add("retry");
buttonCreate.innerText = "Play again";

// Generating MODAL
body.appendChild(modalCreate);
modalCreate.appendChild(resultCreate);
resultCreate.appendChild(puzzleCreate);
resultCreate.appendChild(greetCreate);
resultCreate.appendChild(textCreate);
resultCreate.appendChild(buttonCreate);

const modal = document.querySelector(".modal");
const modalImg = modal.querySelector("img");
const modalGreet = modal.querySelector("h3");
const retryButton = document.querySelector(".retry");

let currentType = "";
let prevType = "";
let down = false;
let rmb = false;
let lmb = false;
let chosenPuzzle = matrix[0][0];
let secretFill = 0;
let secretCross = 0;
let guessFill = 0;
let guessCross = 0;
let isGameOver = false;

function clearCells() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.classList?.remove("filled", "crossed");
    cell.onclick = fillCell;
    // cell.onclick = ;
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

function fillCell(e) {
  down = true;
  lmb = true;
  if (this.classList.contains("filled")) {
    this.classList?.remove("filled");
    prevType = "filled";
    currentType = "empty";
  } else if (this.classList.contains("crossed")) {
    this.classList?.remove("crossed");
    prevType = "crossed";
    this.classList.add("filled");
    currentType = "filled";
  } else {
    this.classList.add("filled");
    currentType = "filled";
    prevType = "empty";
  }
  checkFill(e);
}

function fillCross(e) {
  down = true;
  rmb = true;
  if (this.classList.contains("filled")) {
    this.classList.remove("filled");
    prevType = "filled";
    this.classList.add("crossed");
    currentType = "crossed";
  } else if (this.classList.contains("crossed")) {
    this.classList.remove("crossed");
    prevType = "crossed";
    currentType = "empty";
  } else {
    this.classList.add("crossed");
    currentType = "crossed";
    prevType = "empty";
  }
  checkCross(e);
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
  secretFill = 0;
  secretCross = 0;
  guessFill = 0;
  guessCross = 0;
  const currentLevel = e ? e.target.closest("li") : 0;
  chosenPuzzle = e
    ? matrix[currentLevel.dataset.level][currentLevel.dataset.puzzle]
    : matrix[0][0];
  secretFill = chosenPuzzle.flat().reduce((acc, value) => acc + value);
  secretCross = chosenPuzzle.length ** 2 - secretFill;
  guessCross = secretCross;
  modalImg.src = `./img/puzzles/${
    currentLevel.dataset?.level ? currentLevel.dataset.level : 0
  }_${currentLevel.dataset?.puzzle ? currentLevel.dataset.puzzle : 0}.png`;
  console.log("secretFill - " + secretFill);
  console.log("secretCross - " + secretCross);
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
function checkFill(e) {
  let currentCell = e.target.closest(".cell");
  let chosenCell;
  if (currentCell.classList.contains("filled")) {
    chosenCell = currentCell.classList.value.slice(8, -7).split("_");
  } else if (currentCell.classList.contains("crossed")) {
    chosenCell = currentCell.classList.value.slice(8, -8).split("_");
  } else {
    chosenCell = currentCell.classList.value.slice(8).split("_");
  }
  if (chosenPuzzle[chosenCell[0] - 1][chosenCell[1] - 1] === 1) {
    if (currentCell.classList.contains("filled")) {
      if (prevType === "crossed") {
        guessCross = guessCross > 0 ? guessCross - 1 : 0;
      }
      guessFill += 1;
      checkWin();
    } else {
      guessFill = guessFill > 0 ? guessFill - 1 : 0;
      checkWin();
    }
  } else {
    if (prevType === "filled") {
      guessCross++;
      checkWin();
    } else if (prevType === "empty") {
      guessCross = guessCross > 0 ? guessCross - 1 : 0;
    }
    checkWin();
  }
}

function checkCross(e) {
  let currentCell = e.target.closest(".cell");
  let chosenCell;
  if (currentCell.classList.contains("filled")) {
    chosenCell = currentCell.classList.value.slice(8, -7).split("_");
  } else if (currentCell.classList.contains("crossed")) {
    chosenCell = currentCell.classList.value.slice(8, -8).split("_");
  } else {
    chosenCell = currentCell.classList.value.slice(8).split("_");
  }
  if (chosenPuzzle[chosenCell[0] - 1][chosenCell[1] - 1] === 1) {
    if (currentCell.classList.contains("crossed")) {
      if (prevType === "filled") {
        guessFill = guessFill > 0 ? guessFill - 1 : 0;
        guessCross++;
        checkWin();
      } else {
        guessCross++;
        checkWin();
      }
    } else {
      if (prevType === "crossed" && currentType === "empty") {
        guessCross = guessCross > 0 ? guessCross - 1 : 0;
        checkWin();
      } else {
        guessCross++;
        checkWin();
      }
    }
  } else {
    if (prevType === "filled") {
      guessCross++;
      checkWin();
    }
  }
}

function checkWin() {
  if (guessFill === secretFill && guessCross === secretCross) {
    gameOver();
  }
}

function gameOver() {
  isGameOver = true;
  body.classList.add("no-scroll");
  body.classList.remove("adapt-scroll");
  setTimeout(() => {
    modal.classList.add("visible");
    modalGreet.innerText = `"You WIN!"`;
  }, 250);
}

loadDraft("easy");
modalImg.src = `./img/puzzles/0_0.png`;
fillDraft();
function disablecontext() {
  return false;
}
function disableRMB() {
  const game = document.querySelector(".game");
  game.oncontextmenu = disablecontext;
}
disableRMB();
clearCells();
