/* eslint-disable import/extensions */
import {
  getAllRecipes,
  createRecipe,
  createId,
  validateForm,
  trimRecipe,
  syncWithDatabaseUser,
} from './utils.js';
/* eslint-disable prefer-destructuring */
// const crypto = require('crypto');

let i = 1; // instructions counter
let ingCount = 1; // Ingredient Counter

function addStep() {
  const instructions = document.querySelector('.instructions');
  const steps = document.createElement('input');
  steps.setAttribute('class', 'step');
  steps.setAttribute('type', 'text');
  steps.setAttribute('placeholder', `Step ${i.toString()}`);
  steps.setAttribute('id', `Step${i.toString()}`);
  instructions.appendChild(steps);
  i += 1;
}

function deleteStep() {
  i -= 1;
  if (i < 2) {
    i = 2;
  }
  const stepStr = `Step${i.toString()}`;
  const lastStep = document.getElementById(stepStr);
  lastStep.remove();
}

function addIng() {
  const ingredSteps = document.querySelector('.ingredSteps');
  const amount = document.createElement('input');
  amount.setAttribute('type', 'text');
  amount.setAttribute('class', 'Ingre');
  amount.setAttribute('placeholder', 'Amount');
  amount.setAttribute('id', `amount${ingCount.toString()}`);

  const units = document.createElement('input');
  units.setAttribute('type', 'text');
  units.setAttribute('class', 'unit');
  units.setAttribute('placeholder', 'Units');
  units.setAttribute('id', `units${ingCount.toString()}`);

  const steps = document.createElement('input');
  steps.setAttribute('type', 'text');
  steps.setAttribute('class', 'Ingredient');
  steps.setAttribute('placeholder', `Ingredient ${ingCount.toString()}`);
  steps.setAttribute('id', `ing${ingCount.toString()}`);

  // const breakline = document.createElement('br');

  ingredSteps.appendChild(amount);
  ingredSteps.appendChild(units);
  ingredSteps.appendChild(steps);
  // ingredSteps.appendChild(breakline);
  ingCount += 1;
}

function deleteIng() {
  ingCount -= 1;
  if (ingCount < 2) {
    ingCount = 2;
  }
  const ingStep = document.getElementById(`ing${ingCount.toString()}`);
  const amountStep = document.getElementById(`amount${ingCount.toString()}`);
  const unitStep = document.getElementById(`units${ingCount.toString()}`);
  unitStep.remove();
  ingStep.remove();
  amountStep.remove();
}

async function init() {
  await syncWithDatabaseUser();
  const addIngredient = document.getElementById('addIngredient');
  addIngredient.addEventListener('click', addIng);

  const deleteIngredient = document.getElementById('deleteIngredient');
  deleteIngredient.addEventListener('click', deleteIng);

  const button = document.getElementById('plus');
  button.addEventListener('click', addStep);

  const deleteButton = document.getElementById('Delete');
  deleteButton.addEventListener('click', deleteStep);

  await getAllRecipes();

  document.getElementById('Create').addEventListener('click', async () => {
    const userGenRecipe = {};
    userGenRecipe.id = createId(); // crypto.randomBytes(16).toString('hex');
    userGenRecipe.title = document.getElementById('name').value;
    userGenRecipe.readyInMinutes = document.getElementsByClassName('amount')[1].value;
    userGenRecipe.servings = document.getElementsByClassName('amount')[0].value;
    userGenRecipe.image = document.getElementById('image').value;
    userGenRecipe.uploader = 'From the User';

    // Need to add tags to CreateRecipe.html so that the user can manually select which tags
    // associate with their recipe.
    userGenRecipe.isFromInternet = false;
    userGenRecipe.vegetarian = document.getElementById('vegetarian').checked;
    userGenRecipe.vegan = document.getElementById('vegan').checked;
    userGenRecipe.cheap = document.getElementById('cheap').checked;
    userGenRecipe.glutenFree = document.getElementById('glutenFree').checked;
    userGenRecipe.dairyFree = document.getElementById('dairyFree').checked;
    userGenRecipe.quickEat = document.getElementById('quickEat').checked;
    userGenRecipe.easyCook = document.getElementById('easy').checked;

    userGenRecipe.ingredients = [];
    let numIngredients = 0;
    for (let j = 0; j < document.getElementsByClassName('Ingre').length; j += 1) {
      const ingredientInfo = {};
      ingredientInfo.name = document.getElementsByClassName('Ingredient')[j].value;
      ingredientInfo.amount = document.getElementsByClassName('Ingre')[j].value;
      ingredientInfo.unit = document.getElementsByClassName('unit')[j].value;
      userGenRecipe.ingredients.push(ingredientInfo);
      numIngredients += 1;
    }

    userGenRecipe.fiveIngredientsOrLess = numIngredients <= 5;
    userGenRecipe.summary = document.getElementsByClassName('descrip')[0].value;

    userGenRecipe.steps = [];
    for (let k = 0; k < document.getElementsByClassName('step').length; k += 1) {
      const currStep = {};
      currStep.number = k;
      currStep.step = document.getElementsByClassName('step')[k].value;
      userGenRecipe.steps.push(currStep);
    }
    // validate form, if it is valid then create recipe
    const formValidateObject = validateForm(userGenRecipe);
    if (formValidateObject.valid) {
      const trimmedRecipe = trimRecipe(userGenRecipe);
      await createRecipe(trimmedRecipe);
      window.location = `${window.location.origin}/root/html/RecipePage.html?id=${trimmedRecipe.id}`;
    } else {
      // eslint-disable-next-line no-alert
      alert(
        `Your recipe was not created due to invalid inputs. \n\nError message: ${formValidateObject.errorMessage}`,
      );
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
