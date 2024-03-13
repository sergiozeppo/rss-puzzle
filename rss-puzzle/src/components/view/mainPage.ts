import { Words } from '../types';
import './mainPage.css';

const SOURCE_RAW =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';
const PUZZLE_ROWS = 10;
let PUZZLE_DIV_WIDTH = 750;
let PUZZLE_DIV_HEIGHT = 500;
let ID_WORD = 0;
let ID_LEVEL = 0;

const words: Words[] = [];

const puzzleDiv = document.createElement('div');
puzzleDiv.classList.add('puzzle-div');
const { body } = document;

const sourceDiv = document.createElement('div');
sourceDiv.classList.add('source-div');
const sourceField = document.createElement('div');
sourceField.classList.add('source-field');
const nextButton = document.createElement('button');
nextButton.classList.add('next', 'hidden');
nextButton.textContent = 'Continue';

const generatePuzzleRows = (puzzle: HTMLDivElement): void => {
  for (let i = 0; i < PUZZLE_ROWS; i += 1) {
    const puzzleRow = document.createElement('div');
    puzzleRow.classList.add('puzzle-row');
    puzzleRow.dataset.id = `row_${i}`;
    puzzle.append(puzzleRow);
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
        card.classList?.remove('puzzle-row-word');
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

function checkRow(puzzleRow: HTMLElement | undefined): void {
  if (puzzleRow) {
    const children = Array.from(puzzleRow.children);
    const text = children.reduce((total, child) => total + child.textContent, '');
    console.log(text);
    const example = words[ID_WORD].textExample.split(' ').join('');
    console.log(example);
    if (text === example) {
      children.forEach((child) => {
        child.classList.add('filled-row');
      });
      nextButton.classList?.remove('hidden');
    }
  }
}

function generateSourceItem(data: Words[], ID: number): void {
  const strings = data[ID].textExample.split(' ');
  sourceField.style.width = `${PUZZLE_DIV_WIDTH}px`;
  const lettersWidth = strings.join('').length;
  const letter = PUZZLE_DIV_WIDTH / lettersWidth;
  const sortedStr = strings.sort(() => Math.random() - 0.5);
  sortedStr.forEach((str) => {
    const width = str.length * letter;
    const element = document.createElement('div');
    element.classList.add('source-field-word');
    element.textContent = str;
    element.style.width = `${width}px`;
    element.style.height = `${PUZZLE_DIV_HEIGHT / 10}px`;
    sourceField.append(element);
    const empty = determineEmptyRow();
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
          checkRow(empty);
          const emptyEl = document.createElement('div');
          emptyEl.classList.add('source-field-word', 'emptyEl');
          emptyEl.textContent = clickedElement.textContent?.replace(/[\w\W]+/g, ' ') as string;
          emptyEl.style.width = clickedElement.style.width;
          emptyEl.style.height = clickedElement.style.height;
          sourceField.append(emptyEl);
        }, 400);
      }
    });
  });
  sourceDiv.append(sourceField, nextButton);
  body.append(sourceDiv);
}

export async function fetchData(id: number): Promise<void> {
  try {
    const response = await fetch(SOURCE_RAW);
    const data = await response.json();
    Object.assign(words, data.rounds[id].words);
    deleteItems(puzzleDiv, '.puzzle-row');
    generatePuzzleRows(puzzleDiv);
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
  deleteItems(sourceField, '.emptyEl');
  if (words[ID_WORD + 1]) {
    ID_WORD += 1;
    generateSourceItem(words, ID_WORD);
    console.log(ID_WORD);
    nextButton.classList.add('hidden');
  } else {
    ID_WORD = 0;
    ID_LEVEL += 1;
    fetchData(ID_LEVEL);
    console.log('AYAKTALDY');
  }
}
nextButton.addEventListener('click', continueNextLevel, false);
