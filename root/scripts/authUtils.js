/* eslint-disable import/extensions */
import {
  AUTH, FIREBASE_DATABASE_USER,
} from './database.js';

const FIREBASE_SIGNUP_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
const FIREBASE_LOGIN_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
const FIREBASE_KEY = 'AIzaSyCSXC0gS7gdHANxVdisyYg1eRg18znec_k';
const USER_PREFERENCES_STRING = 'userPreferences.json';

const LOCAL_STORAGE_USER_KEY = 'uuid';

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function signUp(email, password) {
  const url = `${FIREBASE_SIGNUP_URL}?key=${FIREBASE_KEY}`;
  const body = { email, password, returnSecureKey: true };

  const response = await postData(url, body);
  if (response.localId) {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, response.localId);
  }
  return response;
}

export async function login(email, password) {
  const url = `${FIREBASE_LOGIN_URL}?key=${FIREBASE_KEY}`;
  const body = { email, password, returnSecureKey: true };

  const response = await postData(url, body);
  if (response.localId) {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, response.localId);

    // fetch user preferences if they exist

    const userId = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    const preferencesUrl = `${FIREBASE_DATABASE_USER}${userId}/${USER_PREFERENCES_STRING}${AUTH}`;
    const preference = await fetch(preferencesUrl).then((preferences) => preferences.json());

    if (preference != null) {
      localStorage.setItem('user-preferences', JSON.stringify(preference));
    }
  }
  return response;
}

export async function logOut() {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  localStorage.removeItem('user-preferences');
  window.location.href = '../html/index.html';
}
