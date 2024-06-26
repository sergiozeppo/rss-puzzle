import { logout, fetchData } from '../view/mainPage';
import { createElement } from './functions';
import './login.css';
import './startPage.css';

export const form = document.createElement('form');
export const nameInput = document.createElement('input');
export const surnameInput = document.createElement('input');
export const submitButton = document.createElement('button');
export const body = document.querySelector('body');

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const div = document.createElement('div');
const h1Element = document.createElement('h1');
const h2Element = document.createElement('h2');
const startButton = createElement('button', ['start-button']);
const logoutButton = document.createElement('button');
const greet = document.createElement('h1');
const fio = document.createElement('span');

export function startPage(): void {
  if (localStorage.user) {
    const userArr = JSON.parse(localStorage.user);
    greet.classList.add('great-greet');
    fio.textContent = `${userArr.name} ${userArr.surname}!`;
    fio.classList.add('fio-animation');
    greet.innerText = `Welcome, `;
    greet.appendChild(fio);
    div.appendChild(greet);
    div.classList.add('start-page');
    h1Element.textContent = 'ENGLISH PUZZLE';
    div.appendChild(h1Element);
    h2Element.textContent =
      'Click on words, collect phrases. Words can be drag and drop. Select tooltips in the menu.';
    div.appendChild(h2Element);
    startButton.textContent = 'Start';
    div.appendChild(startButton);
    logoutButton.textContent = 'Logout';
    div.appendChild(logoutButton);
    body?.appendChild(div);
    userArr.length = 0;
  }
}

export function LoginPage(): void {
  if (localStorage.user) startPage();
  else {
    nameInput.type = 'text';
    nameInput.minLength = 3;
    nameInput.name = 'firstname';
    nameInput.placeholder = 'First Name';
    nameInput.pattern = '^[A-Z][\\-a-zA-z]{2,}$';
    nameInput.required = true;

    surnameInput.type = 'text';
    surnameInput.minLength = 4;
    surnameInput.name = 'surname';
    surnameInput.placeholder = 'Surname';
    surnameInput.pattern = '^[A-Z][\\-a-zA-z]{3,}$';
    surnameInput.required = true;

    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    submitButton.disabled = true;

    form.appendChild(nameInput);
    form.appendChild(surnameInput);
    form.appendChild(submitButton);
    body?.appendChild(form);
  }
}

function checkDisableButton(): void {
  if (nameInput.value === '' || surnameInput.value === '') {
    submitButton.disabled = true;
  } else submitButton.disabled = false;
}

function validateError(dest: HTMLInputElement, input: string): void {
  const nameError = new ValidationError(input);
  dest.insertAdjacentHTML('afterend', `<p class="error-message">${nameError.message}</p>`);
  setTimeout(() => {
    const deleteError = document.querySelector('.error-message');
    form?.removeChild(deleteError as Node);
  }, 3000);
  submitButton.disabled = true;
}

function checkName(): void {
  if (!nameInput.value) validateError(nameInput, `Please, enter ${nameInput.placeholder}`);
  if (nameInput.validity.tooShort) {
    const min = nameInput.getAttribute('minLength');
    validateError(nameInput, `The minimum length should be ${min}`);
  }
  if (!nameInput.value.match(/^[A-Z]/g)) validateError(nameInput, `First letter should be capital`);
  if (!nameInput.value.match(/[a-zA-z]/g))
    validateError(nameInput, `Only latin letters and hyphen allowed`);
  checkDisableButton();
}

function checkSurname(): void {
  if (!surnameInput.value) validateError(surnameInput, `Please, enter ${nameInput.placeholder}`);
  if (surnameInput.validity.tooShort) {
    const min = surnameInput.getAttribute('minLength');
    validateError(surnameInput, `The minimum length should be ${min}`);
  }
  if (!surnameInput.value.match(/^[A-Z]/g))
    validateError(surnameInput, `First letter should be capital`);
  if (!surnameInput.value.match(/[a-zA-z]/g))
    validateError(surnameInput, `Only latin letters and hyphen allowed`);
  checkDisableButton();
}

form.addEventListener('keyup', checkDisableButton);
nameInput.addEventListener('focusout', checkName);
surnameInput.addEventListener('focusout', checkSurname);
form.addEventListener('submit', () => {
  const user = {
    name: nameInput.value,
    surname: surnameInput.value,
  };
  localStorage.setItem('user', JSON.stringify(user));
  form.submit();
  body?.removeChild(form);
  startPage();
});

logoutButton.addEventListener('click', () => logout());

startButton.addEventListener('click', () => {
  if (localStorage.user) {
    body?.removeChild(div);
    fetchData(0);
  }
});
