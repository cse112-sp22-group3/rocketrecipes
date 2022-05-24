/* eslint-disable import/extensions */
import {
  signUp,
  login,
} from './authUtils.js';

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

const loginForm = document.getElementById('login-user');
const signUpForm = document.getElementById('signup-user');

const LOCAL_STORAGE_USER_KEY = 'uuid';

loginBtn.addEventListener('click', (e) => {
  const parent = e.target.parentNode.parentNode;
  signupBtn.parentNode.classList.add('slide-up');
  parent.classList.remove('slide-up');
});

signupBtn.addEventListener('click', (e) => {
  signUp('hello', 'world');
  const parent = e.target.parentNode;
  loginBtn.parentNode.parentNode.classList.add('slide-up');
  parent.classList.remove('slide-up');
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  console.log(email);
  console.log(password);

  login(email, password).then((response) => {
    if (response.localId) {
      // successful
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, response.localId);
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
      window.location.href = '../html/index.html';
    }
  });
});
