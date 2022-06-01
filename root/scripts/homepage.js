// eslint-disable-next-line import/extensions
import { getAllRecipeID, readRecipe } from './utils.js';

let allRecipeIDS = {};

async function createRecommendedRecipes() {
    const recommendedRecipeContainer = document.getElementById('recommendedRecipeContainer');

    const numRecipes = 8;
    const randomNumber = Math.floor(Math.random() * (allRecipeIDS.length - numRecipes - 1));

    for (let i = 0; i < numRecipes; i += 1) {
        const recipeCard = document.createElement('recipe-card');
        const recipeData = await readRecipe(allRecipeIDS[randomNumber + i]);
        recipeCard.data = recipeData;

        recommendedRecipeContainer.appendChild(recipeCard);
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