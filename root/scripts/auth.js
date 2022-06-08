/* eslint-disable import/extensions */
import {
  signUp,
  login,
} from './authUtils.js';

const loginBtn = document.getElementById('login');
const signUpBtn = document.getElementById('signup');

const loginForm = document.getElementById('login-user');
const signUpForm = document.getElementById('signup-user');

const LOCAL_STORAGE_USER_KEY = 'uuid';

loginBtn.addEventListener('click', (e) => {
  const parent = e.target.parentNode.parentNode;
  signUpBtn.parentNode.classList.add('slide-up');
  parent.classList.remove('slide-up');
});

signUpBtn.addEventListener('click', (e) => {
  const parent = e.target.parentNode;
  loginBtn.parentNode.parentNode.classList.add('slide-up');
  parent.classList.remove('slide-up');
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  login(email, password).then((response) => {
    if (response.localId) { // successful
      window.location.href = '../html/index.html';
    }
  });
});

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  signUp(email, password).then((response) => {
    if (response.localId) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, response.localId);
      loginBtn.style.display = 'none';
      signUpBtn.style.display = 'none';
      loginForm.style.display = 'none';
      signUpForm.style.display = 'none';

      window.location.href = '../html/survey.html';
    }
  });
});
