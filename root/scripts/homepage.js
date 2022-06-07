// eslint-disable-next-line import/extensions
import { getAllRecipes } from './utils.js';

let allRecipes = {};

function createRecommendedRecipes() {
  // fetch data for recommended recipes
  // manually fetching for now until the backend functions are done
  // fetch div for recommended recipes
  const recommendedRecipeContainer = document.getElementById('recommendedRecipeContainer');

  const numRecipes = 8;
  const randomNumber = Math.floor(Math.random() * (allRecipes.length - numRecipes - 1));

  // integrate user preferences
  const userPreferences = JSON.parse(localStorage.getItem('user-preferences'));
  let numAdded = 0;

  if (userPreferences != null) {
    const index = Math.floor(Math.random() * allRecipes.length - 1);
    for (let i = index; i < allRecipes.length && numAdded < 8; i += 1) {
      const recipe = allRecipes[i];
      if (userPreferences.some((preference) => recipe[`${preference}`])) {
        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = recipe;
        recommendedRecipeContainer.appendChild(recipeCard);
        numAdded += 1;
      }
    }

    for (let i = 0; i < index && i < allRecipes.length && numAdded < 8; i += 1) {
      const recipe = allRecipes[i];

      if (userPreferences.some((preference) => recipe[`${preference}`])) {
        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = recipe;
        recommendedRecipeContainer.appendChild(recipeCard);
        numAdded += 1;
      }
    }
  } else if (numAdded < numRecipes) {
    for (let i = 0; numAdded < 8; i += 1) {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = allRecipes[randomNumber + i];

      recommendedRecipeContainer.appendChild(recipeCard);
      numAdded += 1;
    }
  }
}

async function init() {
  allRecipes = await getAllRecipes();
  createRecommendedRecipes();
}

window.addEventListener('DOMContentLoaded', init);
