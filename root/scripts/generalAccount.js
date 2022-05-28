/* eslint-disable import/extensions */
import {
  getUserRecipes,
  getFavoriteRecipes,
  getOneRecipe,
  syncWithDatabaseUser,
} from './utils.js';

let favoriteRecipes = [];
const userRecipes = [];

async function createFavoriteRecipes() {
  const Favorite = document.getElementsByClassName('FavoriteFood')[0];
  Favorite.style.display = 'flex';
  Favorite.style.maxWidth = '100%';
  Favorite.style.flexWrap = 'wrap';

  for (let i = 0; i < favoriteRecipes.length; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    const recipeData = await getOneRecipe(favoriteRecipes[i]);
    recipeCard.data = recipeData;
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

  const userRecipesObj = await getUserRecipes();
  Object.entries(userRecipesObj).forEach(([key, value]) => { userRecipes.push(value); });

  await createMyRecipes();
  await createFavoriteRecipes();
}

window.addEventListener('DOMContentLoaded', init);
