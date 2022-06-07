/* eslint-disable linebreak-style */
// import {  } from './utils.js';

function surveySubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());

  value.preferences = data.getAll('surveyPreference');
}

const form = document.querySelector('form');
form.addEventListener('submit', surveySubmit);
