import './mainPage.css';

const SOURCE_RAW =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';
const PUZZLE_ROWS = 10;
let PUZZLE_DIV_WIDTH = 750;
let PUZZLE_DIV_HEIGHT = 500;

const puzzleDiv = document.createElement('div');
puzzleDiv.classList.add('puzzle-div');
const { body } = document;

const sourceField = document.createElement('div');
sourceField.classList.add('source-field');

const generatePuzzleRows = (puzzle: HTMLDivElement): void => {
  for (let i = 0; i < PUZZLE_ROWS; i += 1) {
    const puzzleRow = document.createElement('div');
    puzzleRow.classList.add('puzzle-row');
    puzzle.append(puzzleRow);
    puzzleDiv.append(puzzleRow);
  }
  body.append(puzzleDiv);
};

function determineEmptyRow(): HTMLElement | undefined {
  const childElements = puzzleDiv.children;
  let emptyChild;
  for (let i = 0; i < childElements.length; i += 1) {
    if (childElements[i].textContent === '') {
      emptyChild = childElements[i];
    }
  }
  return emptyChild as HTMLElement;
}

function eventRow(clickedElement: HTMLElement): void {
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

function generateSourceItem(strings: string[]): void {
  sourceField.style.width = `${PUZZLE_DIV_WIDTH}px`;
  const divWidth = PUZZLE_DIV_WIDTH;
  const divHeight = PUZZLE_DIV_HEIGHT / 10;
  const lettersWidth = strings.join('').length;
  const letter = divWidth / lettersWidth;
  const sortedStr = strings.sort(() => Math.random() - 0.5);
  sortedStr.forEach((str) => {
    const width = str.length * letter;
    const element = document.createElement('div');
    element.classList.add('source-field-word');
    element.textContent = str;
    element.style.width = `${width}px`;
    element.style.height = `${divHeight}px`;
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
          clickedElement.style.transition = 'opacity 0.5s ease';
          eventRow(clickedElement);
          const emptyEl = document.createElement('div');
          emptyEl.classList.add('source-field-word', 'emptyEl');
          emptyEl.textContent = clickedElement.textContent?.replace(/[a-zA-z]/g, ' ') as string;
          emptyEl.style.width = clickedElement.style.width;
          emptyEl.style.height = clickedElement.style.height;
          sourceField.append(emptyEl);
        }, 400);
      }
    });
  });
  body.append(sourceField);
}

export async function fetchData(): Promise<void> {
  try {
    const response = await fetch(SOURCE_RAW);
    const data = await response.json();
    const { words } = data.rounds[0];
    generatePuzzleRows(puzzleDiv);
    generateSourceItem(data.rounds[0].words[0].textExample.split(' '));
    console.log(words);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
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
