/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const fs = require('fs').promises;
const axios = require('axios');

const filename = 'recipes.json';

async function readJSON() {
  const file = await fs.readFile(filename);
  const arr = JSON.parse(file);
  return arr;
}

async function checkImage(url) {
  if (url == null) {
    return false;
  }
  let imageExists = false;
  await axios.get(url, {
  })
    .then(() => {
      imageExists = true;
    })
    .catch(() => {
      imageExists = false;
    });

  return imageExists;
}

async function validateRecipes() {
  const recipes = await readJSON();
  // delete duplicate recipes
  const set = new Set();

  for (let i = 0; i < recipes.length; i += 1) {
    // check for duplicates
    if (set.has(recipes[i].title)) {
      // remove current
      recipes.splice(i, 1);
      i -= 1;
    } else {
      set.add(recipes[i].title);
    }
  }

  // checking null fields
  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i];
    let invalidRecipe = false;
    if (recipe.title == null || recipe.id == null || recipe.readyInMinutes == null
      || recipe.servings == null || recipe.image == null || recipe.uploader == null
      || recipe.vegetarian == null || recipe.vegan
      || recipe.glutenFree == null || recipe.isFromInternet == null || recipe.dairyFree == null
      || recipe.quickEat == null || recipe.fiveIngredientsOrLess == null
      || recipe.summary == null) {
      invalidRecipe = true;
    }
    // check ingredients
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.name == null || ingredient.amount == null || ingredient.unit == null) {
        invalidRecipe = true;
      }
    });

    // check steps
    recipe.steps.forEach((step) => {
      if (step.number == null || step.step == null) {
        invalidRecipe = true;
      }
    });

    if (invalidRecipe) {
      recipes.splice(i, 1);
    }
  }

  for (let i = 0; i < recipes.length; i += 1) {
    const imageExists = await checkImage(recipes[i].image);
    if (!imageExists) {
      recipes.splice(i, 1);
    }
  }

  // remove html
  for (let i = 0; i < recipes.length; i += 1) {
    recipes[i].summary = recipes[i].summary.replace(/<[^>]*>?/gm, '');
  }
  await fs.writeFile(filename, JSON.stringify(recipes));
}

validateRecipes();
