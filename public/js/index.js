console.log('hello from parcel');
import { login, logout } from './login';
import { updateSettings, uupdateSettings } from './updateSettings';
import { bookTour } from './stripe';

const loginForm = document.querySelector('.form--login');
const updateDataFrom = document.querySelector('.form-user-data');
const updatePasswordFrom = document.querySelector('.form-user-settings');
const btnLogOut = document.querySelector('.nav__el--logout');
const btnBook = document.querySelector('#book-tour');
const multer = require('multer');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}

if (btnLogOut) {
  btnLogOut.addEventListener('click', logout);
}
if (updateDataFrom) {
  updateDataFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (updatePasswordFrom) {
  updatePasswordFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm =
      document.getElementById('password-confirm').value;
    updateSettings({ password, newPassword, newPasswordConfirm }, 'password');
  });
}

if (btnBook) {
  btnBook.addEventListener('click', async (e) => {
    e.target.textContent = 'Processing...';
    await bookTour(e.target.dataset.tourId);
  });
}
