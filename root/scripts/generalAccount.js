/* eslint-disable import/extensions */
import {
  getUserRecipes,
  getFavoriteRecipes,
  recipeIdArrayToObject,
  getBulkRecipes,
  syncWithDatabaseUser,
} from './utils.js';

let favoriteRecipes = [];
let userRecipes = [];

async function createFavoriteRecipes() {
  const Favorite = document.getElementsByClassName('FavoriteFood')[0];
  Favorite.style.display = 'flex';
  Favorite.style.maxWidth = '100%';
  Favorite.style.flexWrap = 'wrap';

  const favoriteRecipesObj = recipeIdArrayToObject(favoriteRecipes);
  const allFavoriteRecipes = await getBulkRecipes(favoriteRecipesObj);

  for (let i = 0; i < allFavoriteRecipes.length; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    const rec = allFavoriteRecipes[i];
    recipeCard.data = rec;
    Favorite.appendChild(recipeCard);
  }
}

async function createMyRecipes() {
  const foodList = document.getElementsByClassName('foodList')[0];
  foodList.style.display = 'flex';
  foodList.style.maxWidth = '100%';
  foodList.style.flexWrap = 'wrap';

  for (let i = 0; i < userRecipes.length; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = userRecipes[i];
    foodList.appendChild(recipeCard);
  }
}

async function init() {
  await syncWithDatabaseUser();
  favoriteRecipes = await getFavoriteRecipes();

  userRecipes = await getUserRecipes();

  await createMyRecipes();
  await createFavoriteRecipes();
}

window.addEventListener('DOMContentLoaded', init);
