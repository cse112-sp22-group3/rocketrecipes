/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
import {
  putData, AUTH, FIREBASE_DATABASE_USER, LOCAL_STORAGE_USER_KEY,
} from './database.js';

const USER_PREFERENCES_STRING = 'userPreferences.json';

async function saveSurvey(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const object = [];
  data.forEach((value) => {
    object.push(value);
  });
  // set in local storage
  localStorage.setItem('user-preferences', JSON.stringify(object));

  if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) != null) {
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    const url = `${FIREBASE_DATABASE_USER}${userId}/${USER_PREFERENCES_STRING}${AUTH}`;
    await putData(url, object);
  }

  window.location.href = '../html/index.html';
}

function restoreSurvey() {
  if (localStorage.getItem('user-preferences') != null) {
    const preferences = JSON.parse(localStorage.getItem('user-preferences'));

    preferences.forEach((preference) => {
      const val = document.querySelector(`#${preference}`);
      val.checked = true;
    });
  }
}

const form = document.querySelector('form');

form.addEventListener('submit', saveSurvey);
window.addEventListener('load', restoreSurvey);
