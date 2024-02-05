import matrix from "./matrix.js";
import matrixNames from "./matrixNames.js";

const body = document.querySelector("body");
const headerCreate = document.createElement("header");
const titleCreate = document.createElement("h1");
const switchCreate = document.createElement("div");
switchCreate.classList.add("switch");
const soundCreate = document.createElement("div");
soundCreate.classList.add("sound");
const soundOnCreate = document.createElement("button");
const soundOnCreateImg = document.createElement("img");
soundOnCreate.style.opacity = 1;
soundOnCreate.classList.add("sound_on");
soundOnCreateImg.src = "./img/assets/sound_on_light.png";
soundOnCreateImg.alt = "";
const soundOffCreate = document.createElement("button");
const soundOffCreateImg = document.createElement("img");
soundOffCreate.style.opacity = 0;
soundOffCreate.classList.add("sound_off");
soundOffCreateImg.src = "./img/assets/sound_off_light.png";
soundOffCreateImg.alt = "";
const themeCreate = document.createElement("div");
themeCreate.classList.add("theme");
const themeLCreate = document.createElement("button");
const themeLCreateImg = document.createElement("img");
themeLCreate.style.opacity = 1;
themeLCreate.classList.add("light");
themeLCreateImg.src = "./img/assets/theme_light.png";
themeLCreateImg.alt = "";
const themeDCreate = document.createElement("button");
const themeDCreateImg = document.createElement("img");
themeDCreate.style.opacity = 0;
themeDCreate.classList.add("dark");
themeDCreateImg.src = "./img/assets/theme_dark.png";
themeDCreateImg.alt = "";
const mainCreate = document.createElement("main");
const containerCreate = document.createElement("div");
containerCreate.classList.add("container");
const settCreate = document.createElement("div");
settCreate.classList.add("settings");
const levelsCreate = document.createElement("div");
levelsCreate.classList.add("levels");
const buttonsBottomCreate = document.createElement("div");
buttonsBottomCreate.classList.add("buttons-bottom");
const gameCreate = document.createElement("div");
gameCreate.classList.add("game-container");
const timerCreate = document.createElement("p");
timerCreate.classList.add("timer");
timerCreate.textContent = "00:00";
const easyCreate = document.createElement("button");
const normalCreate = document.createElement("button");
const hardCreate = document.createElement("button");
const modalCreate = document.createElement("div");
const closeMCreate = document.createElement("button");
const puzzleCreate = document.createElement("img");
const resultCreate = document.createElement("div");
const greetCreate = document.createElement("h3");
const textCreate = document.createElement("p");
const resetCreate = document.createElement("button");
const solutionCreate = document.createElement("button");
const randomCreate = document.createElement("button");
const saveCreate = document.createElement("button");
const contCreate = document.createElement("button");

// Adding classes to MODAL section
modalCreate.classList.add("modal");
resultCreate.classList.add("result");
greetCreate.classList.add("hint-part");
textCreate.innerHTML = "<p><b></b></p>";
closeMCreate.classList.add("close-modal");
closeMCreate.innerHTML = "&times;";

// Generating Header
headerCreate.classList.add("header-menu");
headerCreate.appendChild(titleCreate);
titleCreate.innerText = "Nonograms";

// Generating header buttons
body.appendChild(headerCreate);
headerCreate.appendChild(switchCreate);
switchCreate.appendChild(soundCreate);
soundCreate.appendChild(soundOnCreate);
soundOnCreate.appendChild(soundOnCreateImg);
soundCreate.appendChild(soundOffCreate);
soundOffCreate.appendChild(soundOffCreateImg);
switchCreate.appendChild(themeCreate);
themeCreate.appendChild(themeLCreate);
themeCreate.appendChild(themeDCreate);
themeLCreate.appendChild(themeLCreateImg);
themeDCreate.appendChild(themeDCreateImg);

// Generating buttons
easyCreate.classList.add("button", "level-item", "level-item-active");
easyCreate.innerText = "Easy";
easyCreate.dataset.level = "easy";
normalCreate.classList.add("button", "level-item");
normalCreate.innerText = "Normal";
normalCreate.dataset.level = "normal";
hardCreate.classList.add("button", "level-item");
hardCreate.innerText = "Hard";
hardCreate.dataset.level = "hard";
resetCreate.classList.add("button");
resetCreate.innerText = "Reset game";
resetCreate.addEventListener("click", resetGame);
solutionCreate.classList.add("button");
solutionCreate.innerText = "Show solution";
solutionCreate.addEventListener("click", showSolution);
randomCreate.classList.add("button");
randomCreate.innerText = "Random game";
randomCreate.addEventListener("click", randomGame);
saveCreate.classList.add("button");
saveCreate.innerText = "Save game";
contCreate.classList.add("button");
contCreate.innerText = "Continue last game";

// Generating MODAL
body.appendChild(modalCreate);
modalCreate.appendChild(resultCreate);
resultCreate.appendChild(closeMCreate);
resultCreate.appendChild(puzzleCreate);
resultCreate.appendChild(greetCreate);
resultCreate.appendChild(textCreate);

// Generating
body.appendChild(mainCreate);
mainCreate.appendChild(containerCreate);
containerCreate.appendChild(settCreate);
settCreate.appendChild(levelsCreate);
levelsCreate.appendChild(easyCreate);
levelsCreate.appendChild(normalCreate);
levelsCreate.appendChild(hardCreate);
levelsCreate.appendChild(randomCreate);
containerCreate.appendChild(gameCreate);
gameCreate.appendChild(timerCreate);
containerCreate.appendChild(buttonsBottomCreate);
buttonsBottomCreate.appendChild(resetCreate);
buttonsBottomCreate.appendChild(solutionCreate);
buttonsBottomCreate.appendChild(saveCreate);
buttonsBottomCreate.appendChild(contCreate);

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-modal");
const modalImg = modal.querySelector("img");
const modalGreet = modal.querySelector("h3");
// const retryButton = document.querySelector(".retry");

let currentType = "";
let prevType = "";
let chosenPuzzle = matrix[0][0];
let secretFill = 0;
let secretCross = 0;
let guessFill = 0;
let guessCross = 0;
let isGameOver = false;
let sound = true;
let light = true;
let isTimer = false;
let seconds = 0;
let interval;

function clearCells() {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.classList?.remove("filled", "crossed");
    cell.onclick = fillCell;
    cell.oncontextmenu = fillCross;
  }
}

function clearClues() {
  const clues = document.querySelectorAll(".clue");
  for (let i = 0; i < clues.length; i++) {
    clues[i].textContent = "";
  }
}

function fillCell(e) {
  if (!isGameOver) {
    if (!isTimer) {
      isTimer = true;
      startTimer();
    }
    if (this.classList.contains("filled")) {
      this.classList?.remove("filled");
      prevType = "filled";
      currentType = "empty";
      if (sound === true) {
        const empty = body.querySelector("audio");
        if (empty) body.removeChild(empty);
        const newEmpty = document.createElement("audio");
        newEmpty.setAttribute("autoplay", "true");
        newEmpty.innerHTML = `<source src="./audio/empty.mp3" type="audio/mpeg">`;
        body.appendChild(newEmpty);
      }
    } else if (this.classList.contains("crossed")) {
      this.classList?.remove("crossed");
      prevType = "crossed";
      this.classList.add("filled");
      currentType = "filled";
      if (sound === true) {
        const fill = body.querySelector("audio");
        if (fill) body.removeChild(fill);
        const newFill = document.createElement("audio");
        newFill.setAttribute("autoplay", "true");
        newFill.innerHTML = `<source src="./audio/fill.mp3" type="audio/mpeg">`;
        body.appendChild(newFill);
      }
    } else {
      this.classList.add("filled");
      currentType = "filled";
      prevType = "empty";
      if (sound === true) {
        const fill = body.querySelector("audio");
        if (fill) body.removeChild(fill);
        const newFill = document.createElement("audio");
        newFill.setAttribute("autoplay", "true");
        newFill.innerHTML = `<source src="./audio/fill.mp3" type="audio/mpeg">`;
        body.appendChild(newFill);
      }
    }
    checkFill(e);
  }
}

function fillCross(e) {
  if (!isGameOver) {
    if (this.classList.contains("filled")) {
      this.classList.remove("filled");
      prevType = "filled";
      this.classList.add("crossed");
      currentType = "crossed";
      if (sound === true) {
        const cross = body.querySelector("audio");
        if (cross) body.removeChild(cross);
        const newCross = document.createElement("audio");
        newCross.setAttribute("autoplay", "true");
        newCross.innerHTML = `<source src="./audio/cross.mp3" type="audio/mpeg">`;
        body.appendChild(newCross);
      }
    } else if (this.classList.contains("crossed")) {
      this.classList.remove("crossed");
      prevType = "crossed";
      currentType = "empty";
      if (sound === true) {
        const empty = body.querySelector("audio");
        if (empty) body.removeChild(empty);
        const newEmpty = document.createElement("audio");
        newEmpty.setAttribute("autoplay", "true");
        newEmpty.innerHTML = `<source src="./audio/empty.mp3" type="audio/mpeg">`;
        body.appendChild(newEmpty);
      }
    } else {
      this.classList.add("crossed");
      currentType = "crossed";
      prevType = "empty";
      if (sound === true) {
        const cross = body.querySelector("audio");
        if (cross) body.removeChild(cross);
        const newCross = document.createElement("audio");
        newCross.setAttribute("autoplay", "true");
        newCross.innerHTML = `<source src="./audio/cross.mp3" type="audio/mpeg">`;
        body.appendChild(newCross);
      }
    }
    checkCross(e);
  }
}

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
      loadPuzzles(draft);
    } else if (level.classList.contains("level-item-active")) {
      level.classList.remove("level-item-active");
    }
  });
  loadDraft(draft);
}

function loadDraft(draft) {
  const createTable = document.createElement("table");
  const createTbody = document.createElement("tbody");
  createTable.appendChild(createTbody);
  createTable.classList.add("game");
  if (draft === "easy") {
    if (document.querySelector(".game")) {
      gameCreate.removeChild(document.querySelector(".game"));
    }
    gameCreate.appendChild(createTable);
    for (let i = 0; i < 6; i++) {
      if (i === 0) {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 6; j++) {
          const th = parent.document.createElement("th");
          if (light) {
            th.classList.add("clue", `th_${i}_${j}`);
          } else {
            th.classList.add("clue", "dark-theme", `th_${i}_${j}`);
          }
          tr.appendChild(th);
        }
        createTbody.appendChild(tr);
      } else {
        const tr = parent.document.createElement("tr");

        for (let j = 0; j < 6; j++) {
          if (j === 0) {
            const th = parent.document.createElement("th");
            if (light) {
              th.classList.add("clue", `th_${i}_${j}`);
            } else {
              th.classList.add("clue", "dark-theme", `th_${i}_${j}`);
            }
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
      gameCreate.removeChild(document.querySelector(".game"));
    }
    gameCreate.appendChild(createTable);
    for (let i = 0; i < 11; i++) {
      if (i === 0) {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 11; j++) {
          const th = parent.document.createElement("th");
          if (light) {
            th.classList.add("clue", `th_${i}_${j}`);
          } else {
            th.classList.add("clue", "dark-theme", `th_${i}_${j}`);
          }
          tr.appendChild(th);
        }
        createTbody.appendChild(tr);
      } else {
        const tr = parent.document.createElement("tr");
        for (let j = 0; j < 11; j++) {
          if (j === 0) {
            const th = parent.document.createElement("th");
            if (light) {
              th.classList.add("clue", `th_${i}_${j}`);
            } else {
              th.classList.add("clue", "dark-theme", `th_${i}_${j}`);
            }
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
      gameCreate.removeChild(document.querySelector(".game"));
    }
    gameCreate.appendChild(createTable);
    for (let i = 0; i < 16; i++) {
      if (i === 0) {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 16; j++) {
          const th = parent.document.createElement("th");
          if (light) {
            th.classList.add("clue", `th_${i}_${j}`);
          } else {
            th.classList.add("clue", "dark-theme", `th_${i}_${j}`);
          }
          tr.appendChild(th);
        }
        createTbody.appendChild(tr);
      } else {
        const tr = parent.document.createElement("tr");
        tr.classList.add(`tr_${i}_0`);
        for (let j = 0; j < 16; j++) {
          if (j === 0) {
            const th = parent.document.createElement("th");
            if (light) {
              th.classList.add("clue", `th_${i}_${j}`);
            } else {
              th.classList.add("clue", "dark-theme", `th_${i}_${j}`);
            }
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
  const settings = document.querySelector(".settings");
  const levels = document.querySelector(".levels");
  const puzzlesCont = parent.document.createElement("div");
  if (light) {
    puzzlesCont.classList.add("puzzles-list");
  } else {
    puzzlesCont.classList.add("puzzles-list", "dark-theme");
  }
  const createPuzzleList = parent.document.createElement("ul");
  if (draft === "easy") {
    if (document.querySelector(".puzzles-list")) {
      settings.removeChild(document.querySelector(".puzzles-list"));
    }

    for (let i = 0; i < matrixNames[0].length; i++) {
      const puzzleItem = parent.document.createElement("li");
      createPuzzleList.appendChild(puzzleItem);
      puzzleItem.dataset.level = 0;
      puzzleItem.dataset.puzzle = i;
      puzzleItem.textContent = matrixNames[0][i];
    }

    createPuzzleList.classList.add("menu");
    puzzlesCont.appendChild(createPuzzleList);
    settings.appendChild(puzzlesCont);
  }
  if (draft === "normal") {
    if (document.querySelector(".puzzles-list")) {
      settings.removeChild(document.querySelector(".puzzles-list"));
    }

    for (let i = 0; i < matrixNames[1].length; i++) {
      const puzzleItem = parent.document.createElement("li");
      createPuzzleList.appendChild(puzzleItem);
      puzzleItem.dataset.level = 1;
      puzzleItem.dataset.puzzle = i;
      puzzleItem.textContent = matrixNames[1][i];
    }

    createPuzzleList.classList.add("menu");
    puzzlesCont.appendChild(createPuzzleList);
    settings.appendChild(puzzlesCont);
  }
  if (draft === "hard") {
    if (document.querySelector(".puzzles-list")) {
      settings.removeChild(document.querySelector(".puzzles-list"));
    }

    for (let i = 0; i < matrixNames[2].length; i++) {
      const puzzleItem = parent.document.createElement("li");
      createPuzzleList.appendChild(puzzleItem);
      puzzleItem.dataset.level = 2;
      puzzleItem.dataset.puzzle = i;
      puzzleItem.textContent = matrixNames[2][i];
    }

    createPuzzleList.classList.add("menu");
    puzzlesCont.appendChild(createPuzzleList);
    settings.appendChild(puzzlesCont);
  }
  document.querySelectorAll("li").forEach((el) => {
    el.addEventListener("click", fillDraft);
  });
}

function fillDraft(e) {
  clearClues();
  clearCells();
  stopTimer();
  resetTimer();
  secretFill = 0;
  secretCross = 0;
  guessFill = 0;
  guessCross = 0;
  solutionCreate.disabled = false;
  if (document.querySelector(".title"))
    gameCreate.removeChild(document.querySelector(".title"));
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
  console.log(chosenPuzzle);
  const titleGameCreate = document.createElement("p");
  if (light) {
    titleGameCreate.classList.add("title");
  } else {
    titleGameCreate.classList.add("title", "dark-theme");
  }
  titleGameCreate.innerHTML = e
    ? `You are currently playing puzzle: <b>${
        matrixNames[currentLevel.dataset.level][currentLevel.dataset.puzzle]
      }</b>`
    : `You are currently playing puzzle: <b>${matrixNames[0][0]}</b>`;
  gameCreate.prepend(titleGameCreate);
  fill(chosenPuzzle);
}

function fill(matr) {
  const game = document.querySelector(".game");
  for (let i = 0; i < matr.length; i++) {
    const clueSum = [];
    let clue = 0;
    for (let j = 0; j < matr.length; j++) {
      if (matr[i][j] === 1) {
        clue += 1;
      }
      if (matr[i][j] === 0 || j === matr.length - 1) {
        if (clue !== 0) {
          clueSum.push(clue);
          clue = 0;
          const span = document.createElement("span");
          span.textContent = clueSum[clueSum.length - 1];
          game.querySelector(`.th_${i + 1}_0`).appendChild(span);
        }
      }
    }
  }
  const matrRev = matr[0].map((_, indexCol) =>
    matr.map((row) => row[indexCol])
  );
  for (let i = 0; i < matrRev.length; i++) {
    const clueSum = [];
    let clue = 0;
    for (let j = 0; j < matrRev.length; j++) {
      if (matrRev[i][j] === 1) {
        clue += 1;
      }
      if (matrRev[i][j] === 0 || j === matrRev.length - 1) {
        if (clue !== 0) {
          clueSum.push(clue);
          clue = 0;
          const span = document.createElement("span");
          const br = document.createElement("br");
          span.textContent = clueSum[clueSum.length - 1];
          game.querySelector(`.th_0_${i + 1}`).appendChild(span);
          game.querySelector(`.th_0_${i + 1}`).appendChild(br);
        }
      }
    }
  }
  isGameOver = false;
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
  if (!isGameOver) {
    if (guessFill === secretFill && guessCross === secretCross) {
      gameOver();
    }
  }
}

function gameOver() {
  isGameOver = true;
  stopTimer();
  solutionCreate.disabled = true;
  body.classList.add("no-scroll");
  body.classList.remove("adapt-scroll");
  const fill = body.querySelector("audio");
  if (fill) body.removeChild(fill);
  if (sound === true) {
    const tada = modal.querySelector("audio");
    if (tada) modal.removeChild(tada);
    const newTada = document.createElement("audio");
    newTada.setAttribute("autoplay", "true");
    newTada.innerHTML = `<source src="./audio/tada.mp3" type="audio/mpeg">`;
    modal.appendChild(newTada);
    setTimeout(() => {
      modal.classList.add("visible");
      modalGreet.innerText = `Great! You have solved the nonogram in ${seconds} seconds!`;
    }, 1000);
    setTimeout(() => {
      modal.removeChild(newTada);
    }, 2500);
  } else {
    setTimeout(() => {
      modal.classList.add("visible");
      modalGreet.innerText = `Great! You have solved the nonogram in ${seconds} seconds!`;
    }, 250);
  }
}

function showSolution() {
  clearCells();
  stopTimer();
  isGameOver = true;
  for (let i = 0; i < chosenPuzzle.length; i++) {
    for (let j = 0; j < chosenPuzzle.length; j++) {
      if (chosenPuzzle[i][j] === 1) {
        const td = document.querySelector(`.td_${i + 1}_${j + 1}`);
        td.classList.add("filled");
      }
    }
  }
}

function resetGame() {
  clearCells();
  guessCross = secretCross;
  guessFill = 0;
  isGameOver = false;
  stopTimer();
  resetTimer();
}

function randomGame() {
  clearClues();
  clearCells();
  stopTimer();
  resetTimer();
  secretFill = 0;
  secretCross = 0;
  guessFill = 0;
  guessCross = 0;
  isGameOver = false;
  solutionCreate.disabled = false;
  if (document.querySelector(".title"))
    gameCreate.removeChild(document.querySelector(".title"));
  let a = ~~(Math.random() * 3);
  const b = ~~(Math.random() * matrix[a].length);
  chosenPuzzle = matrix[a][b];
  secretFill = chosenPuzzle.flat().reduce((acc, value) => acc + value);
  secretCross = chosenPuzzle.length ** 2 - secretFill;
  guessCross = secretCross;
  modalImg.src = `./img/puzzles/${a}_${b}.png`;
  console.log(chosenPuzzle);
  const titleGameCreate = document.createElement("p");
  if (light) {
    titleGameCreate.classList.add("title");
  } else {
    titleGameCreate.classList.add("title", "dark-theme");
  }
  titleGameCreate.innerHTML = `You are currently playing puzzle: <b>${matrixNames[a][b]}</b>`;
  gameCreate.prepend(titleGameCreate);
  let draft;
  a === 0 ? (a = "easy") : a === 1 ? (a = "normal") : (a = "hard");
  levels.forEach((level) => {
    if (level.dataset.level === a) {
      level.classList.add("level-item-active");
      draft = level.dataset.level;
      loadPuzzles(draft);
    } else if (level.classList.contains("level-item-active")) {
      level.classList.remove("level-item-active");
    }
  });
  loadDraft(draft);
  fill(chosenPuzzle);
}

function toggleSound(e) {
  if (sound === true) {
    sound = false;
    soundOnCreate.style.opacity = 0;
    soundOffCreate.style.opacity = 1;
  } else {
    sound = true;
    soundOnCreate.style.opacity = 1;
    soundOffCreate.style.opacity = 0;
  }
}

function toggleTheme() {
  if (light === true) {
    light = false;
    themeLCreate.style.opacity = 0;
    themeDCreate.style.opacity = 1;
    body.classList.add("dark-theme");
    headerCreate.classList.add("dark-theme");
    titleCreate.classList.add("dark-theme");
    soundOffCreateImg.src = "./img/assets/sound_off_dark.png";
    soundOnCreateImg.src = "./img/assets/sound_on_dark.png";
    document.querySelector(".title").classList.add("dark-theme");
    document.querySelector(".puzzles-list")?.classList?.add("dark-theme");
    timerCreate.classList.add("dark-theme");
    document.querySelectorAll(".button").forEach((button) => {
      button.classList.add("dark-theme");
    });
    document.querySelectorAll(".clue").forEach((clue) => {
      clue.classList?.remove("dark-theme");
      clue.classList.add("dark-theme");
    });
  } else {
    light = true;
    themeLCreate.style.opacity = 1;
    themeDCreate.style.opacity = 0;
    body.classList?.remove("dark-theme");
    headerCreate.classList?.remove("dark-theme");
    titleCreate.classList?.remove("dark-theme");
    soundOffCreateImg.src = "./img/assets/sound_off_light.png";
    soundOnCreateImg.src = "./img/assets/sound_on_light.png";
    document.querySelector(".title").classList?.remove("dark-theme");
    document.querySelector(".puzzles-list")?.classList?.remove("dark-theme");
    timerCreate.classList?.remove("dark-theme");
    document.querySelectorAll(".button").forEach((button) => {
      button.classList?.remove("dark-theme");
    });
    document.querySelectorAll(".clue").forEach((clue) => {
      clue.classList?.remove("dark-theme");
    });
  }
}

function startTimer() {
  if (isTimer) {
    interval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  seconds++;
  const minutes = Math.floor(seconds / 60);
  const minusSeconds = seconds % 60;
  const time = `${String(minutes).padStart(2, "0")}:${String(
    minusSeconds
  ).padStart(2, "0")}`;
  document.querySelector(".timer").textContent = time;
}

function stopTimer() {
  isTimer = false;
  interval = clearInterval(interval);
}

function resetTimer() {
  document.querySelector(".timer").textContent = "00:00";
  seconds = 0;
}
const closeModal = function () {
  modal.classList.remove("visible");
  body.classList.remove("no-scroll");
  body.classList.add("adapt-scroll");
};

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
modal.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);
soundCreate.addEventListener("click", toggleSound);
themeCreate.addEventListener("click", toggleTheme);
