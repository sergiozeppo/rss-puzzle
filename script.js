const virtualKeyboard = document.querySelector(".virtual-keyboard");
const guess = document.querySelector(".guess-part b");
const answerHidden = document.querySelector(".answer-hide");
const alienHangman = document.querySelector(".gallows-part img");

let currentQuestion;
let wrongTry = 0;
let maxTry = 6;

function randomiser() {
  const { answer, hint } = questions[~~(Math.random() * questions.length)];
  console.log(answer);
  currentQuestion = answer;
  console.log(currentQuestion);
  document.querySelector(".hint-part b").innerText = hint;
  answerHidden.innerHTML = answer
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
}
function buttonCheck(button, letterClicked) {
  if (currentQuestion.includes(letterClicked)) {
    let current = answerHidden.querySelectorAll("li");
    [...currentQuestion].forEach((letter, index) => {
      if(letter === letterClicked) {
          current[index].innerText = letter;
          current[index].classList.add("correct");
      }
  });
  } else {
    wrongTry++;
    alienHangman.src = `./images/gallows-${wrongTry}.png`;
  }
  guess.innerText = `${wrongTry} / ${maxTry}`;
  button.disabled = true;
}
for (i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  virtualKeyboard.appendChild(button);
  button.addEventListener("click", (e) => buttonCheck(e.target, button.innerText.toLowerCase()));
}
randomiser();
