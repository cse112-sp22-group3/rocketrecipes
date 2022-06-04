/** @module utils */
/* global DOMPurify */
/* eslint-disable no-mixed-operators */
// eslint-disable-next-line import/extensions
import './purify.js';

const COMMUNITY_HALF_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_2.json';
const COMMUNITY_THIRD_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_3.json';
const COMMUNITY_QUARTER_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_4.json';
const COMMUNITY_TENTH_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_10.json';
const LOCAL_STORAGE_ALL_RECIPES_KEY = 'allRecipes';
const LOCAL_STORAGE_FAVORITED_RECIPES_KEY = 'favoritedRecipes';
const SPOONACULAR_API_KEY = 'c6ae2142af6b40ba99198aa307725180';

/**
 * @async
 * This function gets all recipes from localStorage.
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getAllRecipes() {
  if (localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY) !== null) {
    const localStorageRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY));
    return localStorageRecipes;
  }
  let fetchedRecipes = await fetch(COMMUNITY_HALF_RECIPE_URL)
    .then((response) => response.json())
    .then((data) => data);

  try {
    localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(fetchedRecipes));
  } catch (fe) {
    try {
      fetchedRecipes = await fetch(COMMUNITY_THIRD_RECIPE_URL)
        .then((response) => response.json())
        .then((data) => data);

      localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(fetchedRecipes));
    } catch (e) {
      try {
        fetchedRecipes = await fetch(COMMUNITY_QUARTER_RECIPE_URL)
          .then((response) => response.json())
          .then((data) => data);

        localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(fetchedRecipes));
      } catch (se) {
        try {
          fetchedRecipes = await fetch(COMMUNITY_TENTH_RECIPE_URL)
            .then((response) => response.json())
            .then((data) => data);

          localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(fetchedRecipes));
        } catch (te) {
          return null;
        }
      }
    }
  }
  return fetchedRecipes;
}

/**
 * @async
 * Gets all recipes a user has favorited from localStorage.
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getFavoriteRecipes() {
  if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
    const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
    return favoritedRecipes;
  }

  const blankFavoritedRecipes = [];
  try {
    localStorage.setItem(
      LOCAL_STORAGE_FAVORITED_RECIPES_KEY,
      JSON.stringify(blankFavoritedRecipes),
    );
  } catch (e) {
    return false;
  }
  return blankFavoritedRecipes;
}

/**
 * Determines if the given recipe in a user's favorite list
 * @param {recipeId} id - recipeId to check
 * @returns {Boolean}
 */
export async function isFavorite(id) {
  const favoritedRecipes = await getFavoriteRecipes();
  for (let i = 0; i < favoritedRecipes.length; i += 1) {
    if (favoritedRecipes[i] === id) {
      return true;
    }
  }
  return false;
}

/**
 * @async
 * Gets all recipes a user has created
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getUserRecipes() {
  const allRecipes = await getAllRecipes();
  const userRecipes = [];
  for (let i = 0; i < allRecipes.length; i += 1) {
    if (!allRecipes[i].isFromInternet) {
      userRecipes.push(allRecipes[i]);
    }
  }
  return userRecipes;
}

/**
 * @async
 * Adds recipe with given id to a user's list of favorite recipes
 * @param {recipeId} id of recipe to add
 * @returns {Boolean} true if the operation was successful, false if it was not
 */
export async function addFavoriteRecipe(id) {
  const allRecipes = await getAllRecipes();
  let recipeExists = false;

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === id) {
      recipeExists = true;
    }
  }

  if (!recipeExists) {
    return false;
  }

  const favoritedRecipes = await getFavoriteRecipes();

  for (let i = 0; i < favoritedRecipes.length; i += 1) {
    if (favoritedRecipes[i] === id) {
      return false;
    }
  }
  favoritedRecipes.push(id);
  localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes));
  return true;
}

/**
 * @async
 * Deletes recipe with given id from the user's list of favorite recipes
 * @param {recipeId} id of the recipe to be deleted
 * @returns {Boolean} true if the operation was successful, false if it was not
 */
export async function deleteFavoriteRecipe(id) {
  const favoritedRecipes = await getFavoriteRecipes();

  for (let i = 0; i < favoritedRecipes.length; i += 1) {
    if (favoritedRecipes[i] === id) {
      favoritedRecipes.splice(i, 1);
      localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes));
      return true;
    }
  }
  return false;
}

/**
 * @async
 * A faster method to read multiple recipes at once. Note: this method requires the input
 * to be an object with all desired recipeId's as keys. The function recipeIdArrayToObject()
 * can be used to convert an array of recipeIds into the desired format.
 *
 * @param {recipeIdObj} recipeIds of the form {'id1':true, 'id2':true,...}
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getBulkRecipes(recipeIds) {
  const allRecipes = await getAllRecipes();
  const recipes = [];

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (recipeIds[allRecipes[i].id]) {
      recipes.push(allRecipes[i]);
    }
  }
  return recipes;
}

/**
 * @async
 * Reads the recipe with the given id
 * @param {recipeId} id of the recipe to be read
 * @returns {recipeObject} corresponding to the id that was passed in. If the recipe
 * does not exist, returns null
 */
export async function readRecipe(id) {
  const allRecipes = await getAllRecipes();
  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === id) {
      return allRecipes[i];
    }
  }
  // recipe id was not found, return null
  return null;
}

/**
 * @async
 * Deletes the recipe corresponding to the given recipeId.
 * @param {recipeId} id of the recipe to be deleted
 * @returns {Boolean} true if the operation was successful, false otherwise
 */
export async function deleteRecipe(id) {
  const allRecipes = await getAllRecipes();

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === id) {
      allRecipes.splice(i, 1);
      localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(allRecipes));
      return true;
    }
  }
  return false;
}

/**
 * Generates a unique id
 * @returns {String} a unique id
 */
export function createId() {
  // eslint-disable-next-line no-bitwise
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

/**
 * Updates the contents of the recipe corresponding to the given recipe's id
 * @param {recipeObj} newRecipe - the recipe whose contents will be updated
 * @returns true if this operation is successful, false otherwise
 */
export async function updateRecipe(newRecipe) {
  const allRecipes = await getAllRecipes();

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === newRecipe.id) {
      allRecipes[i] = newRecipe;
      localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(allRecipes));
      return true;
    }
  }
  return false;
}

/**
 * Creates the given recipe object
 * @param {recipeObj} newRecipe - the recipe to be created
 * @returns true if the operation was successful, false otherwise
 */
export async function createRecipe(newRecipe) {
  const allRecipes = await getAllRecipes();
  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === newRecipe.id) {
      return false;
    }
  }

  allRecipes.push(newRecipe);
  localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(allRecipes));
  return true;
}

/**
 * A helper function to convert an array of recipe ids to an object with ids as keys
 * @param {Array} arr array of recipeIds
 * @returns an object with recipeIds as keys
 */
export function recipeIdArrayToObject(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    obj[arr[i]] = true;
  }
  return obj;
}

/**
 * Searches all recipes, matches title/ingredients by query and tags
 * @param {String} searchQuery - a text query
 * @param {Array} tags - an array of tags (must correspond to the schema format)
 * @returns An array of recipeObjects that matches the search parameters
 */
export async function search(searchQuery, tags) {
  // Ignore recipe if query matches less than this percent of title
  const MIN_MATCHING_THRESHOLD = 0.5;
  const allRecipes = await getAllRecipes();
  const query = searchQuery.toLowerCase();
  const tokenizedQuery = [...new Set(query.trim().split(/\s+/))]; // regex matches one or more spaces
  const minNumMatchingTokens = Math.ceil(tokenizedQuery.length * MIN_MATCHING_THRESHOLD);

  let searchResults = [];

  for (let i = 0; i < allRecipes.length; i += 1) {
    const recipe = allRecipes[i];
    let recipeMatches = true;
    try {
      // Check that recipe matches tags, reject if it doesn't
      tags.forEach((tag) => {
        if (!recipe[`${tag}`]) {
          recipeMatches = false;
        }
      });

      // Create a search score for the title
      let numMatchingTokens = 0;
      let mostRecentMatch = tokenizedQuery.length;
      let numMatchingCharacters = 0;
      let searchScore = 0;
      const { title } = recipe;
      if (title) {
        for (let j = tokenizedQuery.length - 1; j >= 0; j -= 1) {
          if (title.toLowerCase().includes(tokenizedQuery[j])) {
            numMatchingTokens += 1;
            mostRecentMatch = j;
            numMatchingCharacters += tokenizedQuery[j].length;
          }
        }
        // 1st: pick titles with more matching tokens over less matching tokens
        // 2nd: pick titles that match with the first tokens in the search query
        // 3rd: pick titles which have a large percentage of charaters that match with query
        searchScore = numMatchingTokens * (tokenizedQuery.length ** 2)
                    + (tokenizedQuery.length - mostRecentMatch - 1) * tokenizedQuery.length
                    + (numMatchingCharacters / title.length) * tokenizedQuery.length;
      }
      if (numMatchingTokens < minNumMatchingTokens) {
        recipeMatches = false;
      }

      if (recipeMatches) {
        searchResults.push({ recipe, score: searchScore });
      }
    } catch (e) {
      // remove recipe from results if an error thrown
      if (searchResults.some((a) => a.recipe === recipe)) {
        searchResults = searchResults.filter((a) => a.recipe !== recipe);
      }
    }
  }
  searchResults.sort((a, b) => b.score - a.score); // put a before b if a.score > b.score

  return searchResults.map((a) => a.recipe);
}

/**
 * A helper function to check if a string is a valid link
 * @param {String} link
 * @returns {Boolean} true if the string is a link
 */
export function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

/**
 * A helper function to purify potential HTML
 * @param {String} dirty dirty code
 * @returns {String} purified code
 */
export function purifyDOM(dirty) {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
}

/**
 * A helper function to remove whitespace
 * @param {String} dirty dirty inputs
 * @returns {String} whitespaced stripped text
 */
export function whitespaceTrimmer(dirty) {
  return dirty.replace(/\s+/g, ' ').trim();
}

/**
 * A helper function to validate form contents
 * @param {Object} recipe recipe object to validate
 * @returns {Object} object containing values for if the form is valid, and error messages otherwise
 */
export function validateForm(recipe) {
  if (!recipe.title || recipe.title === '' || /\d/.test(recipe.title)) {
    return { valid: false, errorMessage: 'Title is invalid' };
  }
  if (!recipe.summary || recipe.summary === '') {
    return { valid: false, errorMessage: 'Summary is invalid' };
  }
  if (!recipe.servings || recipe.servings === '' || Number.isNaN(recipe.servings)) {
    return { valid: false, errorMessage: 'Servings field is invalid' };
  }
  if (!recipe.readyInMinutes || recipe.readyInMinutes === ''
    || Number.isNaN(recipe.readyInMinutes)) {
    return { valid: false, errorMessage: 'Time field is invalid' };
  }
  if (recipe.image !== '' && !validURL(recipe.image)) {
    return { valid: false, errorMessage: 'Image is not a valid link' };
  }
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    return { valid: false, errorMessage: 'Must have at least 1 ingredient' };
  }

  let index = 0;
  for (index = 0; index < recipe.ingredients.length; index += 1) {
    const ingredient = recipe.ingredients[index];
    if (!ingredient.amount || ingredient.amount === '' || Number.isNaN(ingredient.amount)) {
      return { valid: false, errorMessage: `Ingredient ${index + 1} amount is not valid` };
    }
    if (!ingredient.name || ingredient.name.length === 0 || /\d/.test(ingredient.name)) {
      return { valid: false, errorMessage: `Ingredient ${index + 1} name is not valid` };
    }
    if (!ingredient.unit || ingredient.unit.length === 0 || /\d/.test(ingredient.unit)) {
      return { valid: false, errorMessage: `Ingredient ${index + 1} unit is not valid` };
    }
  }

  if (!recipe.steps || recipe.steps.length === 0) {
    return { valid: false, errorMessage: 'Must have at least 1 step' };
  }
  for (index = 0; index < recipe.steps.length; index += 1) {
    const step = recipe.steps[index];
    if (!step || step.length === 0) {
      return { valid: false, errorMessage: `Step ${index + 1} cannot be empty` };
    }
  }

  return { valid: true, errorMessage: '' };
}

/**
 * A helper function to prune empty ingredients and steps from a recipe
 * @param {Object} recipe recipe object to prune
 * @returns {Object} recipe object without unneeded steps and ingredients
 */
export function trimRecipe(recipe) {
  const adjustedRecipe = recipe;

  const recipeIngredients = recipe.ingredients.filter(
    (ing) => ing.name !== '' && ing.amount !== '',
  );
  const recipeSteps = recipe.steps.filter((s) => s.step !== '');

  adjustedRecipe.ingredients = recipeIngredients;
  adjustedRecipe.steps = recipeSteps;

  // add default image if field is blank
  if (adjustedRecipe.image === '') {
    adjustedRecipe.image = 'https://media.istockphoto.com/photos/white-plate-wooden-table-tablecloth-rustic-wooden-clean-copy-freepik-picture-id1170315961?k=20&m=1170315961&s=612x612&w=0&h=nCCDMyt_1sMF3PdDurLw2pcTPgu7YBzjCaZO6z78CxE=';
  }
  return adjustedRecipe;
}

async function parseRecipe(baseRecipe) {
  const scrapedRecipe = baseRecipe;
  const minutesToPrepare = scrapedRecipe.readyInMinutes;
  const numIngredients = scrapedRecipe.extendedIngredients.length;

  const numSteps = scrapedRecipe.analyzedInstructions[0].steps.length;
  const isEasy = numSteps <= 5 && numIngredients <= 5 && minutesToPrepare <= 60;

  const parsedRecipe = {};
  parsedRecipe.id = createId();
  parsedRecipe.title = scrapedRecipe.title;
  parsedRecipe.readyInMinutes = scrapedRecipe.readyInMinutes;
  parsedRecipe.servings = scrapedRecipe.servings;
  parsedRecipe.image = scrapedRecipe.image;
  parsedRecipe.uploader = 'From the Internet';
  parsedRecipe.isFromInternet = true;
  parsedRecipe.vegetarian = scrapedRecipe.vegetarian;
  parsedRecipe.vegan = scrapedRecipe.vegan;
  parsedRecipe.glutenFree = scrapedRecipe.glutenFree;
  parsedRecipe.dairyFree = scrapedRecipe.dairyFree;
  parsedRecipe.quickEat = minutesToPrepare > 30;
  parsedRecipe.fiveIngredientsOrLess = numIngredients <= 5;
  parsedRecipe.easyCook = isEasy;

  parsedRecipe.ingredients = [];

  const scrapedIngredients = scrapedRecipe.extendedIngredients;

  for (let i = 0; i < scrapedIngredients.length; i += 1) {
    const currIngredient = {};
    currIngredient.name = scrapedIngredients[i].nameClean;
    currIngredient.amount = scrapedIngredients[i].amount;
    currIngredient.unit = scrapedIngredients[i].unit;

    parsedRecipe.ingredients.push(currIngredient);
  }

  parsedRecipe.summary = scrapedRecipe.summary;
  const scrapedSteps = scrapedRecipe.analyzedInstructions[0].steps;

  parsedRecipe.steps = [];

  for (let i = 0; i < scrapedSteps.length; i += 1) {
    const currStep = {};

    currStep.number = scrapedSteps[i].number;
    currStep.step = scrapedSteps[i].step;

    parsedRecipe.steps.push(currStep);
  }
  return parsedRecipe;
}

export async function getRecipeByUrl(url) {
  const requestUrl = `https://api.spoonacular.com/recipes/extract?url=${url}&apiKey=${SPOONACULAR_API_KEY}`;
  const response = await fetch(requestUrl);
  const json = await response.json();
  // parse response into our format
  let recipe = await parseRecipe(json);
  recipe = JSON.parse(JSON.stringify(recipe).replace(/:null/gi, ':""'));
  if (await createRecipe(recipe)) {
    return recipe.id;
  }

  return false;
}
