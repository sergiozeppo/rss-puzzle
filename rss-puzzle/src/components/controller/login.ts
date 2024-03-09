import './login.css';

export const form = document.createElement('form');
export const nameInput = document.createElement('input');
export const surnameInput = document.createElement('input');
export const submitButton = document.createElement('button');

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function LoginPage(): void {
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

  const body = document.querySelector('body');
  body?.appendChild(form);
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
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    name: nameInput.value,
    surname: surnameInput.value,
  };
  localStorage.setItem('user', JSON.stringify(user));
  form.submit();
});
