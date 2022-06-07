/* eslint-disable linebreak-style */
// import { getAllPreferences } from './utils.js';

function saveSurvey(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());

  value.preferences = data.getAll('surveyPreference');
//   console.log({ value });
  localStorage.setItem('value', JSON.stringify(value));
}

const form = document.querySelector('form');
form.addEventListener('submit', saveSurvey);

// function restoreSurvey(elts) {
//   // eslint-disable-next-line one-var
//   let checkStates = localStorage.getItem('value'), i;
//   if (checkStates) {
//     checkStates = JSON.parse(checkStates);
//     for (i=0 ; i<elts.length ; i+=1) {
//       if (checkStates.hasOwnProperty(elts[i].name)) {
//         elts[i].checked = true;
//       }
//     }
//   }
// }
