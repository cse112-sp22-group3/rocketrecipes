/* eslint-disable import/extensions */
const FIREBASE_SIGNUP_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
const FIREBASE_LOGIN_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
const FIREBASE_KEY = 'AIzaSyCSXC0gS7gdHANxVdisyYg1eRg18znec_k';

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
  }
  return response;
}

export async function logOut() {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  window.location.href = '../html/index.html';
}
