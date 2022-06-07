/* eslint-disable linebreak-style */
// import { getAllPreferences } from './utils.js';
const surveyForm = document.getElementById('survey-user');

function saveSurvey(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  let object = {};
  data.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  object = object.surveyPreference;
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
