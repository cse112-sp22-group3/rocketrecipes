/* eslint-disable import/extensions */
/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
import { getAllRecipeID, readRecipe } from './utils.js';

let allRecipeIDS = {};

async function createRecommendedRecipes() {
    const recommendedRecipeContainer = document.getElementById('recommendedRecipeContainer');

    const numRecipes = 8;
    const randomNumber = Math.floor(Math.random() * (allRecipeIDS.length - numRecipes - 1));

    // integrate user preferences
    const userPreferences = JSON.parse(localStorage.getItem('user-preferences'));
    let numAdded = 0;
    if (userPreferences != null && userPreferences.length > 0) {
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
    }
    if (numAdded < numRecipes) {
        for (let i = 0; numAdded < numRecipes; i += 1) {
            const recipeCard = document.createElement('recipe-card');
            recipeCard.data = allRecipes[randomNumber + i];

            recommendedRecipeContainer.appendChild(recipeCard);
            numAdded += 1;
        }
    }
}

async function init() {
    allRecipeIDS = await getAllRecipeID();

    await createRecommendedRecipes();
}

// test function for event-listener when closing the window
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