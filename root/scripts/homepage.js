// eslint-disable-next-line import/extensions
import { syncWithDatabaseUser, getAllRecipes } from './utils.js';

let allRecipes = {};

function createRecommendedRecipes() {
  // fetch data for recommended recipes
  // manually fetching for now until the backend functions are done
  // fetch div for recommended recipes
  const recommendedRecipeContainer = document.getElementById('recommendedRecipeContainer');

  const numRecipes = 8;
  const randomNumber = Math.floor(Math.random() * (allRecipes.length - numRecipes - 1));

  for (let i = 0; i < numRecipes; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = allRecipes[randomNumber + i];

    recommendedRecipeContainer.appendChild(recipeCard);
  }
}

async function init() {
  await syncWithDatabaseUser();
  allRecipes = await getAllRecipes();

  createRecommendedRecipes();
}

// async function close() {
//     let response = await syncFavoriteWithDatabase();
//     flushFavoriteRecipes();
//     localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
// }

// const beforeUnloadListener = (event) => {
//     event.preventDefault();

// };

// addEventListener('beforeunload', beforeUnloadListener);

window.addEventListener('DOMContentLoaded', init);
