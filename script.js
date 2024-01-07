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
const retryButton = document.querySelector(".retry");

let currentAnswer;
let wrongTry = 0;
let maxTry = 6;
let lettersCorrect = [];

function reset() {
  wrongTry = 0;
  lettersCorrect = [];
  answerHidden.querySelectorAll("li").forEach(function(elem){
      elem.parentNode.removeChild(elem);
    });
  for (i=0; i<currentAnswer.length; i++) {
    const hiddenLetter = document.createElement("li");
    answerHidden.appendChild(hiddenLetter);
    hiddenLetter.classList.add("letter");
  };
  modal.classList.remove("visible");
  alienHangman.src = `./images/gallows-${wrongTry}.png`;
  guess.innerText = `${wrongTry} / ${maxTry}`;
  virtualKeyboard.querySelectorAll("button").forEach(button => button.disabled = false);
}

function randomiser() {
  const { answer, hint } = questions[~~(Math.random() * questions.length)];
  currentAnswer = answer;
  console.log(currentAnswer);
  document.querySelector(".hint-part b").innerText = hint;
  reset();
}
function gameOver(isWin) {
  setTimeout(()=> {
    modal.classList.add("visible");
    modalImg.src = `./images/${isWin? "victory" : "lost"}.png`;
    modalGreet.innerText = `${isWin? "You WIN!" : "You lost!"}`;
    modalText.innerHTML = `${isWin? "You guessed the word correctly: " : "The correct answer was: "} <b>${currentAnswer}</b>`;}, 250);
    // answerHidden.querySelectorAll(".letter").remove();
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
retryButton.addEventListener("click",randomiser);