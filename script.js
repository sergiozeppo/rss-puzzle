const body = document.querySelector("body");
const virtualKeyboard = document.querySelector(".virtual-keyboard");
const guess = document.querySelector(".guess-part b");
const answerHidden = document.querySelector(".answer-hide");
const alienHangman = document.querySelector(".gallows-part img");
const modal = document.querySelector(".modal");
const modalImg = modal.querySelector("img");
const modalGreet = modal.querySelector("h3");
const modalText = modal.querySelector("p");
const modalAnswer = modalText.querySelector("b");

let currentAnswer;
let wrongTry = 0;
let maxTry = 6;
const lettersCorrect = [];

function randomiser() {
  const { answer, hint } = questions[~~(Math.random() * questions.length)];
  console.log(answer);
  currentAnswer = answer;
  console.log(currentAnswer);
  document.querySelector(".hint-part b").innerText = hint;
  answerHidden.innerHTML = answer
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
}
function gameOver(isWin) {
  setTimeout(()=> {
    modal.classList.add("visible");
    modalImg.src = `./images/${isWin? "victory" : "lost"}.png`;
    modalGreet.innerText = `${isWin? "You WIN!" : "You lost!"}`;
    modalText.innerHTML = `${isWin? "You guessed the word correctly: " : "The correct answer was: "} <b>${currentAnswer}</b>`;}, 250)
}
function buttonCheck(button, letterClicked) {
  if (currentAnswer.includes(letterClicked)) {
    let current = answerHidden.querySelectorAll("li");
    [...currentAnswer].forEach((letter, index) => {
      if(letter === letterClicked) {
          current[index].innerText = letter;
          current[index].classList.add("correct");
          lettersCorrect.push(letter);
      }
  });
  } else {
    wrongTry++;
    alienHangman.src = `./images/gallows-${wrongTry}.png`;
  }
  guess.innerText = `${wrongTry} / ${maxTry}`;
  button.disabled = true;
  if (wrongTry===maxTry) return gameOver(false);
  if (lettersCorrect.length===currentAnswer.length) return gameOver(true);
}
for (i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  virtualKeyboard.appendChild(button);
  button.addEventListener("click", (e) => buttonCheck(e.target, button.innerText.toLowerCase()));
}
randomiser();
