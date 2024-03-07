import './login.css';

export function LoginPage(): void {
  const form = document.createElement('form');

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'firstname';
  nameInput.placeholder = 'First Name';
  nameInput.required = true;

  const surnameInput = document.createElement('input');
  surnameInput.type = 'text';
  surnameInput.name = 'surname';
  surnameInput.placeholder = 'Surname';
  surnameInput.required = true;

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Login';
  submitButton.disabled = true;

  form.appendChild(nameInput);
  form.appendChild(surnameInput);
  form.appendChild(submitButton);

  const body = document.querySelector('body');
  body?.appendChild(form);

  function checkInputs(): void {
    if (nameInput.value === '' || surnameInput.value === '') {
      submitButton.disabled = true;
    } else submitButton.disabled = false;
  }
  nameInput.addEventListener('keyup', checkInputs);
  surnameInput.addEventListener('keyup', checkInputs);
}
