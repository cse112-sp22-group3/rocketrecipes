/* eslint-disable linebreak-style */
// import { getAllPreferences } from './utils.js';

function saveSurvey(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const object = [];
  data.forEach((value) => {
    object.push(value);
  });
  // set in local storage
  localStorage.setItem('user-preferences', JSON.stringify(object));
  window.location.href = '../html/index.html';
  // need to still add in firebase!!
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
