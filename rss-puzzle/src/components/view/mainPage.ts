import { Words } from '../types';
import { createElement, classListHandle } from '../controller/functions';
import './mainPage.css';

const SOURCE_RAW =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';
const SOURCE_AUDIO =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/';
const PUZZLE_ROWS = 10;
let PUZZLE_DIV_WIDTH = 750;
let PUZZLE_DIV_HEIGHT = 500;
let ID_WORD = 0;
let ID_LEVEL = 0;
let PERCENT = 0;
let PERCENT_STEP = 0;
let textFlag = false;
let currText = '';
let audioFlag = false;
let currAudio = '';
let isGameOver = false;

const words: Words[] = [];

const puzzleCont = createElement('div', ['puzzle-container']);
const puzzleDiv = createElement('div', ['puzzle-div']);
const { body } = document;

const sourceDiv = createElement('div', ['source-div']);
const buttonsDiv = createElement('div', ['buttons-div']);
const sourceField = createElement('div', ['source-field']);
const checkButton = createElement('button', ['check', 'hidden'], 'Check');
const autoButton = createElement('button', ['autocomplete'], 'Auto-Complete');

const generatePuzzleRows = (puzzle: HTMLDivElement): void => {
  for (let i = 0; i < PUZZLE_ROWS; i += 1) {
    const puzzleRow = createElement('div', ['puzzle-row'], '', puzzle);
    puzzleRow.dataset.id = `row_${i}`;
  }
  puzzleCont.append(puzzle);
  body.append(puzzleCont);
};

function determineEmptyRow(): HTMLElement | undefined {
  const rows = puzzleDiv.children;
  let emptyChild;
  for (let i = 0; i < rows.length; i += 1) {
    if (PERCENT === 0) {
      if (rows[i]?.children?.length === 0) {
        emptyChild = rows[i];
        break;
      }
    } else if (rows[i]?.children?.length > 0 && rows[i + 1]?.children?.length === 0)
      emptyChild = rows[i];
    else if (rows[i]?.children?.length > 0 && !rows[i + 1]) {
      emptyChild = rows[i];
    }
  }
  return emptyChild as HTMLElement;
}

function reverseClick(clickedElement: HTMLElement, arr: string[]): void {
  clickedElement.addEventListener('click', (event) => {
    const card = event.target as HTMLElement;
    const puzzleRow = card.closest('.puzzle-row');
    if (card && card.parentElement === puzzleRow) {
      card.style.opacity = '0';
      card.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        const children = Array.from(sourceField.children);
        const firstEmptyIndex = arr.findIndex((child) => child.match(/ /g));
        console.log(firstEmptyIndex);
        if (firstEmptyIndex === -1) {
          sourceField.appendChild(card);
          card.style.width = correctWidth(arr, card.textContent);
          PERCENT -= PERCENT_STEP;
          console.log(PERCENT);
          if (PERCENT < 0) PERCENT = 0;
        } else {
          card.style.width = correctWidth(arr, card.textContent);
          sourceField.insertBefore(card, children[firstEmptyIndex]);
          arr.pop();
          PERCENT -= PERCENT_STEP;
          console.log(PERCENT);
          if (PERCENT < 0) PERCENT = 0;
        }
        classListHandle(card, ['source-field-word'], ['puzzle-row-word', 'wrong']);
        card.style.width = correctWidth(arr, card.textContent);
        card.style.opacity = '1';
        card.style.transition = 'opacity 0.5s ease';
        const emptyEl = sourceField.querySelector('.emptyEl');
        if (emptyEl) sourceField.removeChild(emptyEl);
      }, 200);
    }
  });
}

function deleteItems(div: HTMLDivElement, tag: string): void {
  const cards = div.querySelectorAll(tag);
  for (let i = 0; i < cards.length; i += 1) {
    cards[i].remove();
  }
}

function checkRow(puzzleRow: HTMLElement | undefined, data: Words[], ID: number): void {
  const exArr = data[ID].textExample.split(' ');
  // const objectsArray = exArr.map((text, id) => ({ text, id }));
  if (puzzleRow) {
    const children = Array.from(puzzleRow.children);
    const textArr: string[] = [];
    children.forEach((child) => {
      if (child.textContent) textArr.push(child.textContent);
    });
    console.log(textArr);
    if (textArr.length === exArr.length) {
      classListHandle(checkButton, [], ['hidden']);
      checkButton.addEventListener('click', () => {
        if (exArr.every((element, index) => element === textArr[index])) {
          isGameOver = true;
          showTextHint(currText);
          children.forEach((child) => {
            classListHandle(child as HTMLElement, ['filled-row'], ['wrong']);
          });
          classListHandle(checkButton, ['next', 'accept'], ['check'], 'Continue');
          checkButton.addEventListener('click', continueNextLevel, false);
        } else {
          const negative: number[] = [];
          for (let i = 0; i < exArr.length; i += 1) {
            if (exArr[i] !== textArr[i]) {
              negative.push(i);
            }
          }
          console.log(negative);
          negative.forEach((id) => {
            children[id].classList.add('wrong');
          });
          negative.splice(0, negative.length);
          textArr.splice(0, textArr.length);
        }
      });
    }
  }
}

function clickSourceFieldItems(data: Words[], ID: number): void {
  const empty = determineEmptyRow();
  sourceField.querySelectorAll('.source-field-word').forEach((element) => {
    element.addEventListener('click', (event) => {
      const clickedElement = event.target as HTMLElement;
      if (clickedElement && clickedElement.parentElement === sourceField) {
        clickedElement.style.opacity = '0';
        clickedElement.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          empty?.appendChild(clickedElement);
          PERCENT += PERCENT_STEP;
          classListHandle(clickedElement, ['puzzle-row-word'], ['source-field-word']);
          clickedElement.style.opacity = '1';
          const emptyEl = createElement('div', ['source-field-word', 'emptyEl'], '', sourceField);
          emptyEl.textContent = clickedElement.textContent?.replace(/[\w\W]+/g, ' ') as string;
          emptyEl.style.width = clickedElement.style.width;
          emptyEl.style.height = clickedElement.style.height;
          const arr: string[] = [];
          const children = Array.from(sourceField.children);
          children.forEach((child) => {
            if (child.textContent) arr.push(child.textContent);
          });
          reverseClick(clickedElement, arr);
          checkRow(empty, data, ID);
        }, 400);
      }
    });
  });
}

function correctWidth(strings: string[], str: string | null): string {
  const lettersWidth = strings.join('').length;
  const letter = PUZZLE_DIV_WIDTH / lettersWidth;
  const width = str ? str.length * letter : 3;
  return `${width}px`;
}

function clearHints(): void {
  if (document.querySelector('.hint-cont')) document.querySelector('.hint-cont')?.remove();
}

function showTextHint(current: string): void {
  if (textFlag || isGameOver) {
    clearHints();
    const hintDiv = createElement('div', ['hint-cont']);
    const hintImg = createElement('img', ['hint-img']) as HTMLImageElement;
    hintImg.src = './src/components/view/buttons/hinticon.svg';
    const hint = createElement('h2', ['hint'], current);
    hintDiv.append(hintImg, hint);
    puzzleCont.prepend(hintDiv);
  }
}

function clearAudio(): void {
  if (document.querySelector('.audio-hint-cont'))
    document.querySelector('.audio-hint-cont')?.remove();
}

function playAudioHint(current: string): void {
  if (audioFlag) {
    clearAudio();
    const audioHintDiv = createElement('div', ['audio-hint-cont']);
    const hint = createElement('audio', ['audio-hint']);
    hint.setAttribute('autoplay', 'true');
    hint.innerHTML = `<source src="${SOURCE_AUDIO + current}" type="audio/mpeg">`;
    audioHintDiv.append(hint);
    body.append(audioHintDiv);
  }
}

function generateSourceItem(data: Words[], ID: number): void {
  currText = data[ID].textExampleTranslate;
  currAudio = data[ID].audioExample;
  const strings = data[ID].textExample.split(' ');
  const dataObject = strings.map((text, id) => ({ text, id, newId: 0 }));
  sourceField.style.width = `${PUZZLE_DIV_WIDTH}px`;
  const sortedStr = dataObject.sort(() => Math.random() - 0.5);
  const sortedStrArr = strings.sort(() => Math.random() - 0.5);
  PERCENT_STEP = +(100 / sortedStrArr.length).toFixed(2);
  console.log(sortedStr);
  sortedStrArr.forEach((str) => {
    const element = createElement('div', ['source-field-word'], str, sourceField);
    element.style.width = correctWidth(sortedStrArr, str);
    element.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
  });
  clickSourceFieldItems(data, ID);
  buttonsDiv.append(autoButton, checkButton);
  sourceDiv.append(sourceField, buttonsDiv);
  body.append(sourceDiv);
  showTextHint(currText);
  // playAudioHint(currAudio);
}

function fillEmptySourceField(): void {
  const children = Array.from(sourceField.children);
  children.forEach((child) => {
    if (child) child.remove();
    const emptyEl = createElement('div', ['source-field-word', 'emptyEl'], ' ', sourceField);
    emptyEl.style.width = `${PUZZLE_DIV_WIDTH / children.length}px`;
    sourceField.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
  });
}

export function logout(): void {
  if (localStorage.user) {
    const modal = createElement('div', ['modal', 'visible'], '');
    const resultCreate = createElement('div', ['result'], '', modal);
    const greetCreate = createElement('h3', ['greeting'], `Are you sure you want to log out?`);
    resultCreate.appendChild(greetCreate);
    const acceptButton = createElement('button', [], `Yes`, resultCreate);
    const declineButton = createElement('button', [], `No`, resultCreate);
    body?.appendChild(modal);
    acceptButton.addEventListener('click', () => {
      modal.classList?.remove('visible');
      delete localStorage.user;
      const bodyChild = Array.from(document.body.children);
      bodyChild.forEach((child) => document.body.removeChild(child));
      // location.reload();
    });
    declineButton.addEventListener('click', () => {
      modal.classList?.remove('visible');
      body?.removeChild(modal);
    });
  }
}

function toggleTextHints(): void {
  const hint: HTMLDivElement | null = document.querySelector('.texthint-off');
  if (hint) {
    textFlag = true;
    hint.classList.add('texthint-on');
    hint.classList.remove('texthint-off');
    showTextHint(currText);
  } else {
    const hint2: HTMLDivElement | null = document.querySelector('.texthint-on');
    if (hint2) {
      textFlag = false;
      hint2.classList.add('texthint-off');
      hint2.classList.remove('texthint-on');
      clearHints();
    }
  }
}

function toggleAudioHints(): void {
  // const hint: HTMLDivElement | null = document.querySelector('.audio-hint-off');
  if (!audioFlag) {
    audioFlag = true;
    // hint.classList.add('audio-hint-on');
    // hint.classList.remove('audio-hint-off');
    playAudioHint(currAudio);
    audioFlag = false;
  }
  // else {
  //   // const hint2: HTMLDivElement | null = document.querySelector('.audio-hint-on');
  //   // if (hint2) {
  //   audioFlag = false;
  //   // hint2.classList.add('audio-hint-off');
  //   // hint2.classList.remove('audio-hint-on');
  //   clearAudio();
  // }
}
// }

function createNav(): void {
  const navbar = createElement('nav', ['navbar'], '');
  const userArr = JSON.parse(localStorage.user);
  const greet = createElement('h2', ['great-greet'], '');
  greet.textContent = `Welcome, ${userArr.name} ${userArr.surname}!`;
  navbar.append(greet);
  const hintsDiv = createElement('div', ['buttons-div'], '');
  navbar.appendChild(hintsDiv);
  body.appendChild(navbar);
  const audioHint = createElement('button', ['audio-hint-off'], '', hintsDiv);
  audioHint.addEventListener('click', toggleAudioHints, false);
  const textHint = createElement('button', ['texthint-off'], '', hintsDiv);
  textHint.addEventListener('click', toggleTextHints, false);
  const logOut = createElement('button', ['exit'], '', hintsDiv);
  logOut.addEventListener('click', () => {
    logout();
  });
}

function prepareGen(): void {
  deleteItems(puzzleDiv as HTMLDivElement, '.puzzle-row');
  deleteItems(sourceField as HTMLDivElement, '.emptyEl');
  createNav();
  generatePuzzleRows(puzzleDiv as HTMLDivElement);
}

export async function fetchData(id: number): Promise<void> {
  try {
    const response = await fetch(SOURCE_RAW);
    const data = await response.json();
    Object.assign(words, data.rounds[id].words);
    prepareGen();
    generateSourceItem(words, ID_WORD);
    autoButton.addEventListener('click', () => {
      isGameOver = true;
      showTextHint(currText);
      const exArr = words[ID_WORD].textExample.split(' ');
      const emptyRow = determineEmptyRow();
      const emptyChildren = emptyRow?.children;
      if (emptyChildren) {
        for (let i = 0; i < exArr.length; i += 1) {
          if (emptyChildren[i]) {
            emptyChildren[i].textContent = exArr[i];
            emptyChildren[i].classList.add('filled-row');
            const element = emptyChildren[i] as HTMLElement;
            element.style.width = correctWidth(exArr, element.textContent);
            element.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
          } else {
            const element = createElement('div', ['puzzle-row-word', 'filled-row'], `${exArr[i]}`);
            emptyRow.append(element);
            element.style.width = correctWidth(exArr, element.textContent);
            element.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
          }
        }
      }
      fillEmptySourceField();
      classListHandle(checkButton, ['next', 'accept'], ['check', 'hidden'], 'Continue');
      checkButton.addEventListener('click', continueNextLevel, false);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
}

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth < 850) {
    PUZZLE_DIV_WIDTH = 750;
  } else if (document.documentElement.clientWidth < 1000) {
    PUZZLE_DIV_WIDTH = document.documentElement.clientWidth - 100;
    PUZZLE_DIV_HEIGHT = Math.floor(PUZZLE_DIV_WIDTH / 1.5);
    sourceField.style.width = `${PUZZLE_DIV_WIDTH}px`;
    sourceField.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
    let lettersWidth = 0;
    let letter = 0;
    sourceField.querySelectorAll('.source-field-word').forEach((card) => {
      if (card instanceof HTMLDivElement && card.textContent) {
        lettersWidth += card.textContent.length;
      }
    });
    letter = PUZZLE_DIV_WIDTH / lettersWidth;
    sourceField.querySelectorAll('.source-field-word').forEach((card) => {
      const card1 = card;
      if (card1 instanceof HTMLDivElement && card1.textContent) {
        card1.style.width = `${card1.textContent.length * letter}px`;
        card1.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
      }
    });
    puzzleDiv.style.width = `${PUZZLE_DIV_WIDTH}px`;
    puzzleDiv.style.height = `${PUZZLE_DIV_HEIGHT}px`;
    puzzleDiv.querySelectorAll('.puzzle-row-word').forEach((word) => {
      const word1 = word;
      if (word1 instanceof HTMLDivElement && word1.textContent) {
        word1.style.width = `${word1.textContent.length * letter}px`;
        word1.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
      }
    });
  }
});

function continueNextLevel(): void {
  deleteItems(sourceField as HTMLDivElement, '.emptyEl');
  clearHints();
  isGameOver = false;
  if (words[ID_WORD + 1]) {
    ID_WORD += 1;
    PERCENT = 0;
    PERCENT_STEP = 0;
    generateSourceItem(words, ID_WORD);
    classListHandle(checkButton, ['check', 'hidden'], ['next', 'accept'], 'Check');
    checkButton.removeEventListener('click', continueNextLevel, false);
  } else {
    ID_WORD = 0;
    ID_LEVEL += 1;
    PERCENT = 0;
    PERCENT_STEP = 0;
    checkButton.removeEventListener('click', continueNextLevel, false);
    fetchData(ID_LEVEL);
  }
}
