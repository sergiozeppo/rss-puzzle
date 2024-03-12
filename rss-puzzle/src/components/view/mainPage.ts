import './mainPage.css';

const SOURCE_RAW =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';
const PUZZLE_ROWS = 10;

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

function generateSourceItem(strings: string[]): void {
  const sortedStr = strings.sort(() => Math.random() - 0.5);
  sortedStr.forEach((str) => {
    const element = document.createElement('div');
    element.classList.add('source-field-word');
    element.textContent = str;
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
