const body = document.querySelector("body");

let currentAnswer;
let previousAnswer;
let wrongTry = 0;
let maxTry = 6;
let lettersCorrect = [];
let sound = false;
let isGameOver = false;

// Initialization game function
function initGame() {
  body.classList.add("no-scroll");

  // Declaring generating variables
  const modalCreate = document.createElement("div");
  const resultCreate = document.createElement("div");
  const alienCreate = document.createElement("img");
  const alienCryCreate = document.createElement("audio");
  const alienBackCreate = document.createElement("audio");
  const alienIconCreate = document.createElement("img");
  const greetCreate = document.createElement("h3");
  const textCreate = document.createElement("p");
  const buttonCreate = document.createElement("button");
  const wrapperCreate = document.createElement("main");
  const gallowsCreate = document.createElement("div");
  const quizWrapperCreate = document.createElement("div");
  const quizCreate = document.createElement("div");
  const answerHideCreate = document.createElement("ul");
  const hintCreate = document.createElement("h3");
  const guessCreate = document.createElement("h3");
  const virtualKeyboardCreate = document.createElement("div");

  // Adding background music and icon
  alienIconCreate.src = `images/off.png`;
  alienIconCreate.classList.add("alien-icon");
  body.appendChild(alienBackCreate);
  body.appendChild(alienIconCreate);

  // Adding classes to QUIZ section
  wrapperCreate.classList.add("wrapper");
  gallowsCreate.classList.add("gallows-part");
  gallowsCreate.innerHTML = `<img alt="Gallows"/>`;
  alienCryCreate.innerHTML = `<source type="audio/mpeg">`;
  alienCryCreate.setAttribute("autoplay", "true");

  quizWrapperCreate.classList.add("quiz-wrapper");
  quizCreate.classList.add("quiz-part");
  answerHideCreate.classList.add("answer-hide");

  hintCreate.classList.add("hint-part");
  hintCreate.innerHTML = "Hint: <b></b>";

  guessCreate.classList.add("guess-part");
  guessCreate.innerHTML = "Incorrect guesses: <b></b>";

  virtualKeyboardCreate.classList.add("virtual-keyboard");

  // Adding classes to MODAL section
  modalCreate.classList.add("modal");
  resultCreate.classList.add("result");
  greetCreate.classList.add("hint-part");
  textCreate.innerHTML = "<p><b></b></p>";
  buttonCreate.classList.add("retry");
  buttonCreate.innerText = "Play again";

  // Generating the HTML-page
  body.appendChild(wrapperCreate);
  wrapperCreate.appendChild(gallowsCreate);
  gallowsCreate.appendChild(alienCryCreate);
  wrapperCreate.appendChild(quizWrapperCreate);
  quizWrapperCreate.appendChild(quizCreate);
  quizCreate.appendChild(answerHideCreate);
  quizCreate.appendChild(hintCreate);
  quizCreate.appendChild(guessCreate);
  quizCreate.appendChild(virtualKeyboardCreate);

  // Generating MODAL
  body.appendChild(modalCreate);
  modalCreate.appendChild(resultCreate);
  resultCreate.appendChild(alienCreate);
  resultCreate.appendChild(greetCreate);
  resultCreate.appendChild(textCreate);
  resultCreate.appendChild(buttonCreate);
}
initGame();

// Declaring variables after generating
const virtualKeyboard = document.querySelector(".virtual-keyboard");
const guess = document.querySelector(".guess-part b");
const answerHidden = document.querySelector(".answer-hide");
const alienHangman = document.querySelector(".gallows-part img");
const alienIcon = document.querySelector(".alien-icon");

const modal = document.querySelector(".modal");
const modalImg = modal.querySelector("img");
const modalGreet = modal.querySelector("h3");
const modalText = modal.querySelector("p");
const retryButton = document.querySelector(".retry");

// Reset game function
function reset() {
  wrongTry = 0;
  lettersCorrect = [];
  isGameOver = false;
  modal.classList.remove("visible");
  answerHidden.querySelectorAll("li").forEach(function (elem) {
    elem.parentNode.removeChild(elem);
  });
  for (i = 0; i < currentAnswer.length; i++) {
    const hiddenLetter = document.createElement("li");
    answerHidden.appendChild(hiddenLetter);
    hiddenLetter.classList.add("letter");
  }
  alienHangman.src = `./images/gallows-${wrongTry}.png`;
  guess.innerText = `${wrongTry} / ${maxTry}`;
  virtualKeyboard
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = false));
  previousAnswer = currentAnswer;
  if (isTablet === true) {
    body.classList.remove("no-scroll");
    body.classList.add("adapt-scroll");
  } else {
    body.classList.add("no-scroll");
    body.classList.remove("adapt-scroll");
  }
}

// First in-game function to get random question
function randomiser() {
  const { answer, hint } = questions[~~(Math.random() * questions.length)];
  currentAnswer = answer;
  if (currentAnswer === previousAnswer) randomiser();
  console.log(currentAnswer);
  document.querySelector(".hint-part b").innerText = hint;
  reset();
}

// gameOver function which shows MODAL after end
function gameOver(isWin) {
  isGameOver = true;
  body.classList.add("no-scroll");
  body.classList.remove("adapt-scroll");
  setTimeout(() => {
    modal.classList.add("visible");
    modalImg.src = `./images/${isWin ? "victory" : "lost"}.png`;
    modalGreet.innerText = `${isWin ? "You WIN!" : "You lost!"}`;
    modalText.innerHTML = `${
      isWin ? "You guessed the word correctly: " : "The correct answer was: "
    } <b>${currentAnswer}</b>`;
    if (isWin) alienTaDaaa();
  }, 250);
}

// Function for check clicked button
function buttonCheck(button, letterClicked) {
  if (isGameOver === false) {
    if (currentAnswer.includes(letterClicked)) {
      let current = answerHidden.querySelectorAll("li");
      [...currentAnswer].forEach((letter, index) => {
        if (letter === letterClicked) {
          current[index].innerText = letter;
          current[index].classList.add("correct");
          lettersCorrect.push(letter);
        }
      });
    } else {
      wrongTry++;
      alienHangman.src = `./images/gallows-${wrongTry}.png`;
      if (sound === true) {
        alienCry();
      }
    }
    guess.innerText = `${wrongTry} / ${maxTry}`;
    button.disabled = true;
    if (wrongTry === maxTry) return gameOver(false);
    if (lettersCorrect.length === currentAnswer.length) return gameOver(true);
  }
}

// Function for check keyboard keys pressed
function keyboardCheck(event) {
  if (isGameOver === false) {
    buttons = virtualKeyboard.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++) {
      if (buttons[i].innerHTML === event.key.toLowerCase()) {
        if (buttons[i].disabled === false) {
          buttons[i].disabled = true;
          if (currentAnswer.includes(event.key.toLowerCase())) {
            let current = answerHidden.querySelectorAll("li");
            [...currentAnswer].forEach((letter, index) => {
              if (letter === event.key.toLowerCase()) {
                current[index].innerText = letter;
                current[index].classList.add("correct");
                lettersCorrect.push(letter);
              }
            });
          } else {
            wrongTry++;
            alienHangman.src = `./images/gallows-${wrongTry}.png`;
            if (sound === true) {
              alienCry();
            }
          }
          guess.innerText = `${wrongTry} / ${maxTry}`;
        }
      }
    }
    if (wrongTry === maxTry) return gameOver(false);
    if (lettersCorrect.length === currentAnswer.length) return gameOver(true);
  }
}

// Function for generating letters of virtual Keyboard
function generateLetters() {
  for (i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    virtualKeyboard.appendChild(button);
    button.addEventListener("click", (e) =>
      buttonCheck(e.target, button.innerText.toLowerCase())
    );
  }
}

// Function for playing sounds after alien's hits
function alienCry() {
  const gallows = document.querySelector(".gallows-part");
  const alien = gallows.querySelector("audio");
  if (alien) gallows.removeChild(alien);
  const newAlien = document.createElement("audio");
  newAlien.setAttribute("autoplay", "true");
  newAlien.innerHTML = `<source src="sounds/audio-${~~(
    Math.random() * 12 +
    1
  )}.mp3" type="audio/mpeg">`;
  gallows.appendChild(newAlien);
}

// Function for happy ending xD
function alienTaDaaa() {
  const modal = document.querySelector(".modal");
  const alienHappy = modal.querySelector("audio");
  if (alienHappy) modal.removeChild(alienHappy);
  const newAlienHappy = document.createElement("audio");
  newAlienHappy.setAttribute("autoplay", "true");
  newAlienHappy.innerHTML = `<source src="sounds/tada.mp3" type="audio/mpeg">`;
  modal.appendChild(newAlienHappy);
}

function checkSound(event) {
  let alienBack = document.querySelector("audio");
  if (sound === true) {
    sound = false;
    event.src = `images/off.png`;
    alienBack.innerHTML = ``;
    alienBack.removeAttribute("autoplay");
    alienBack.removeAttribute("loop");
    alienBack.currentTime = 0;
    alienBack.pause();
  } else {
    sound = true;
    event.src = `images/on.png`;
    alienBack.innerHTML = `<source src="sounds/back.mp3" type="audio/mpeg">`;
    alienBack.setAttribute("autoplay", "true");
    alienBack.setAttribute("loop", "true");
    alienBack.currentTime = 0;
    alienBack.play();
  }
}

// determining adaptive screen or not
let isTablet = window.innerWidth > 800 ? false : true;

function resizeNumber() {
  if (isTablet != window.innerWidth <= 800) {
    if (!(window.innerWidth > 800 === true)) {
      isTablet = true;
      body.classList.remove("no-scroll");
      body.classList.add("adapt-scroll");
    } else {
      isTablet = false;
      body.classList.add("no-scroll");
      body.classList.remove("adapt-scroll");
    }
  }
}

randomiser();
generateLetters();
document.addEventListener("keypress", keyboardCheck);
retryButton.addEventListener("click", randomiser);
alienIcon.addEventListener("click", (e) => checkSound(e.target));
window.addEventListener("resize", resizeNumber, true);
