/* eslint-disable import/extensions */
import {
  getAllRecipes, readRecipe, updateRecipe, validateForm, trimRecipe,
} from './utils.js';
/* eslint-disable prefer-destructuring */
// const crypto = require('crypto');

// const createRecipe = document.querySelector(document.getElementById('Create'));
// const deleteRecipe = document.querySelector(document.getElementById('Delete'));
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

async function fillRecipePage(recipeId) {
  const recipe = await readRecipe(recipeId);
  const header = document.getElementById('header');
  header.innerHTML = 'Edit Your Recipe!';
  const name = document.getElementById('name');
  name.value = recipe.title;
  const imageLink = document.getElementById('image');
  imageLink.value = recipe.image;
  const summary = document.querySelector('.descrip');
  summary.value = recipe.summary.replace(/<[^>]+>/g, '');
  const servings = document.getElementById('serving');
  servings.value = recipe.servings;
  const time = document.getElementById('time');
  time.value = recipe.readyInMinutes;
  for (let j = 1; j < recipe.ingredients.length + 1; j += 1) {
    addIng();
    const ingredientName = document.getElementById(`ing${j.toString()}`);
    const amount = document.getElementById(`amount${j.toString()}`);
    const unit = document.getElementById(`units${j.toString()}`);
    amount.value = recipe.ingredients[j - 1].amount;
    ingredientName.value = recipe.ingredients[j - 1].name;
    unit.value = recipe.ingredients[j - 1].unit;
  }

  for (let k = 1; k <= recipe.steps.length; k += 1) {
    addStep();
    const stepVal = document.getElementsByClassName('step')[k - 1];
    stepVal.value = recipe.steps[k - 1].step;
  }

  document.getElementById('cheap').checked = recipe.cheap;
  document.getElementById('vegetarian').checked = recipe.vegetarian;
  document.getElementById('vegan').checked = recipe.vegan;
  document.getElementById('glutenFree').checked = recipe.glutenFree;
  document.getElementById('dairyFree').checked = recipe.dairyFree;
  document.getElementById('quickEat').checked = recipe.quickEat;
  document.getElementById('easyCook').checked = recipe.easyCook;
}

async function init() {
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);
  const recipeId = searchParams.get('id');
  await fillRecipePage(recipeId);

  const addIngredient = document.getElementById('addIngredient');
  addIngredient.addEventListener('click', addIng);

  const deleteIngredient = document.getElementById('deleteIngredient');
  deleteIngredient.addEventListener('click', deleteIng);

  const button = document.getElementById('plus');
  button.addEventListener('click', addStep);

  const deleteButton = document.getElementById('Delete');
  deleteButton.addEventListener('click', deleteStep);

  await getAllRecipes();
  document.getElementById('edit-button').addEventListener('click', async () => {
    const userGenRecipe = {};
    userGenRecipe.id = recipeId; // crypto.randomBytes(16).toString('hex');
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
    userGenRecipe.easyCook = document.getElementById('easyCook').checked;

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
      await updateRecipe(trimmedRecipe);
      window.location = `${window.location.origin}/root/html/RecipePage.html?id=${trimmedRecipe.id}`;
    } else {
      // eslint-disable-next-line no-alert
      alert(
        `Your recipe was not updated due to invalid inputs. \n\nError message: ${formValidateObject.errorMessage}`,
      );
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
