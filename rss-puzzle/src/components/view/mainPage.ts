import { Words } from '../types';
import { createElement } from '../controller/functions';
import './mainPage.css';

const SOURCE_RAW =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';
const PUZZLE_ROWS = 10;
let PUZZLE_DIV_WIDTH = 750;
let PUZZLE_DIV_HEIGHT = 500;
let ID_WORD = 0;
let ID_LEVEL = 0;

const words: Words[] = [];

const puzzleDiv = createElement('div', ['puzzle-div']);
const { body } = document;

const sourceDiv = createElement('div', ['source-div']);
const buttonsDiv = createElement('div', ['buttons-div']);
const sourceField = createElement('div', ['source-field']);
const nextButton = createElement('button', ['next', 'hidden'], 'Continue');
const checkButton = createElement('button', ['check', 'hidden'], 'Check');

const generatePuzzleRows = (puzzle: HTMLDivElement): void => {
  for (let i = 0; i < PUZZLE_ROWS; i += 1) {
    const puzzleRow = createElement('div', ['puzzle-row'], '', puzzle);
    puzzleRow.dataset.id = `row_${i}`;
  }
  body.append(puzzle);
};

function determineEmptyRow(): HTMLElement | undefined {
  const childElements = puzzleDiv.children;
  let emptyChild;
  for (let i = 0; i < childElements.length; i += 1) {
    if (childElements[i].textContent === '') {
      emptyChild = childElements[i];
      break;
    }
  }
  return emptyChild as HTMLElement;
}

function reverseClick(clickedElement: HTMLElement): void {
  clickedElement.addEventListener('click', (event) => {
    const card = event.target as HTMLElement;
    const puzzleRow = card.closest('.puzzle-row');
    if (card && card.parentElement === puzzleRow) {
      card.style.opacity = '0';
      card.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        const children = Array.from(sourceField.children);
        const firstEmptyIndex = children.findIndex((child) => child.textContent?.match(/ /g));
        console.log(firstEmptyIndex);
        if (firstEmptyIndex === -1) {
          sourceField.appendChild(card);
        } else {
          sourceField.insertBefore(card, children[firstEmptyIndex]);
        }
        card.classList.add('source-field-word');
        card.classList?.remove('puzzle-row-word', 'wrong');
        card.style.opacity = '1';
        card.style.transition = 'opacity 0.5s ease';
        const emptyEl = sourceField.querySelector('.emptyEl');
        if (emptyEl) sourceField.removeChild(emptyEl);
      }, 400);
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
    // const example = words[ID_WORD].textExample.split(' ').join('');
    const textArr: string[] = [];
    children.forEach((child) => {
      if (child.textContent) textArr.push(child.textContent);
    });
    console.log(textArr);
    if (textArr.length === exArr.length) {
      checkButton.classList?.remove('hidden');
      checkButton.addEventListener('click', () => {
        if (exArr.every((element, index) => element === textArr[index])) {
          children.forEach((child) => {
            child.classList.add('filled-row');
            child.classList.remove('wrong');
          });
          nextButton.classList?.remove('hidden');
        } else {
          nextButton.classList.add('hidden');
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

function clickSourceFieldItems(
  data: Words[],
  ID: number,
  sortedStr: {
    text: string;
    id: number;
    newId: number;
  }[]
): void {
  const empty = determineEmptyRow();
  sourceField.querySelectorAll('.source-field-word').forEach((element, id) => {
    const el = element as HTMLElement;
    el.dataset.newId = `${sortedStr[id].newId}`;
    element.addEventListener('click', (event) => {
      const clickedElement = event.target as HTMLElement;
      if (clickedElement && clickedElement.parentElement === sourceField) {
        clickedElement.style.opacity = '0';
        clickedElement.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          empty?.appendChild(clickedElement);
          clickedElement.classList?.remove('source-field-word');
          clickedElement.classList.add('puzzle-row-word');
          clickedElement.style.opacity = '1';
          reverseClick(clickedElement);
          checkRow(empty, data, ID);
          const emptyEl = createElement('div', ['source-field-word', 'emptyEl'], '', sourceField);
          emptyEl.textContent = clickedElement.textContent?.replace(/[\w\W]+/g, ' ') as string;
          emptyEl.style.width = clickedElement.style.width;
          emptyEl.style.height = clickedElement.style.height;
        }, 400);
      }
    });
  });
}

function generateSourceItem(data: Words[], ID: number): void {
  const strings = data[ID].textExample.split(' ');
  const dataObject = strings.map((text, id) => ({ text, id, newId: 0 }));
  sourceField.style.width = `${PUZZLE_DIV_WIDTH}px`;
  const lettersWidth = strings.join('').length;
  const letter = PUZZLE_DIV_WIDTH / lettersWidth;
  const sortedStr = dataObject.sort(() => Math.random() - 0.5);
  // sortedStr.forEach((str, id) => {
  //   str.newId = id;
  // });
  console.log(sortedStr);
  sortedStr.forEach((str) => {
    const width = str.text.length * letter;
    const element = createElement('div', ['source-field-word'], str.text, sourceField);
    element.style.width = `${width}px`;
    element.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
  });
  clickSourceFieldItems(data, ID, sortedStr);
  buttonsDiv.append(checkButton, nextButton);
  sourceDiv.append(sourceField, buttonsDiv);
  body.append(sourceDiv);
}

export async function fetchData(id: number): Promise<void> {
  try {
    const response = await fetch(SOURCE_RAW);
    const data = await response.json();
    Object.assign(words, data.rounds[id].words);
    deleteItems(puzzleDiv as HTMLDivElement, '.puzzle-row');
    generatePuzzleRows(puzzleDiv as HTMLDivElement);
    generateSourceItem(words, ID_WORD);
    console.log(words);
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
  if (words[ID_WORD + 1]) {
    ID_WORD += 1;
    generateSourceItem(words, ID_WORD);
    nextButton.classList.add('hidden');
  } else {
    ID_WORD = 0;
    ID_LEVEL += 1;
    fetchData(ID_LEVEL);
  }
}

nextButton.addEventListener('click', continueNextLevel, false);
