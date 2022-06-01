/* eslint-disable import/extensions */
import {
  getUserRecipes,
  getFavoriteRecipes,
} from './utils.js';

async function createFavoriteRecipes(favoriteRecipes) {
  const Favorite = document.getElementsByClassName('FavoriteFood')[0];
  Favorite.style.display = 'flex';
  Favorite.style.maxWidth = '100%';
  Favorite.style.flexWrap = 'wrap';
  if (favoriteRecipes !== null) {
    for (const [key, value] of Object.entries(favoriteRecipes)) {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = value;
      Favorite.appendChild(recipeCard);
    }
  }
}

async function createMyRecipes(userRecipes) {
  const foodList = document.getElementsByClassName('foodList')[0];
  foodList.style.display = 'flex';
  foodList.style.maxWidth = '100%';
  foodList.style.flexWrap = 'wrap';

  if (userRecipes !== null) {
    for (const [key, value] of Object.entries(userRecipes)) {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = value;
      foodList.appendChild(recipeCard);
    }
  }
}

async function init() {
  const favoriteRecipes = await getFavoriteRecipes();
  const userRecipes = await getUserRecipes();

  await createMyRecipes(userRecipes);
  await createFavoriteRecipes(favoriteRecipes);
}

window.addEventListener('DOMContentLoaded', init);
