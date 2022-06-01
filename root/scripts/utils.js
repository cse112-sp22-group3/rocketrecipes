/** @module utils */
/* eslint-disable no-mixed-operators */
import {
  getAllRecipesDatabase, getAllRecipeIDDatabase, readRecipeDatabase, getFavoritedRecipesDatabase, getUserAllCreatedRecipesDatabase, addFavoriteRecipeDatabase, deleteFavoriteRecipeDatabase, ableToDeleteDatabase, ableToPublishDatabase, publishRecipeDatabase, updateRecipeDatabase, isFavoritedDatabase, deleteRecipeDatabase,
} from './database.js';

/**
 * This function gets an array of all recipes from database.
 * @async
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getAllRecipes() {
  const allRecipes = await getAllRecipesDatabase();
  const tempArr = [];

  // retrive all recipes from fireabse realtime datasbase put them into an array, since other functions calling it assuming recipes are stored in an array
  Object.entries(allRecipes).forEach(([key, value]) => {
    tempArr.push(value);
  });

  return tempArr;
}

/**
 *
 * get all recipes ID from local storage;
 * if local storage has not been set, set local storage
 * When user has created an recipe and publish this recipe, we want to refresh the ids. //@TODO
 * @async
 */
export async function getAllRecipeID() {
  return await getAllRecipeIDDatabase();
}

/**
 * Gets all recipes a user has favorited from database.
 * @async
 * @returns {RecipeObject} an object contain all recipes
 */
export async function getFavoriteRecipes() {
  return await getFavoritedRecipesDatabase();
}

/**
 * Determines if the given recipe in a user's favorite list
 * @async
 * @param {recipeId} id - recipeId to check
 * @returns {Boolean} true-> favorited, false -> not favorited
 */
export async function isFavorite(id) {
  return await isFavoritedDatabase(id);
}

/**
 * Adds recipe with given id to a user's list of favorite recipes
 * @async
 * @param {recipeId} id of recipe to add
 * @returns {recipeObj}
 */
export async function addFavoriteRecipe(id) {
  return await addFavoriteRecipeDatabase(id);
}

/**
 * @async
 * Deletes recipe with given id from the user's list of favorite recipes
 * @param {recipeId} id of the recipe to be deleted
 * @returns {Boolean} true if the operation was successful, false if it was not
 */
export async function deleteFavoriteRecipe(id) {
  return await deleteFavoriteRecipeDatabase(id);
}

/**
 * Gets all recipes a user has created
 * @async
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getUserRecipes() {
  return await getUserAllCreatedRecipesDatabase();
}

/**
 * Priority List:
 * 1. user created recipe
 * 2. user favorited recipe
 * 3. database recipe
 *
 * @async
 * @param {recipeID} recipeID id of the recipe
 * @return {recipeObject} corresponding to the id that was passed in. If the recipe
 * does not exist, returns null
 */
export async function readRecipe(id) {
  return await readRecipeDatabase(id);
}

/**
 * @async
 * Delete a recipe when the recipe belongs to the user.
 * if user is logged in, and recipe is user created, it will delete recipe from user created recipes list and from the whole database
 * if user is logged in, and recipe is not user created, delete button would not work
 * @param {recipeId} id of the recipe to be deleted
 * @returns {Boolean} true if the operation was successful, false otherwise
 */
export async function deleteRecipe(id) {
  await deleteRecipeDatabase(id);
}

export async function ableToDelete(id) {
  return await ableToDeleteDatabase(id);
}

/**
 * Updates the contents of the recipe corresponding to the given recipe's id
 * Update recipe is only called when editing page, therefore, no need to insert to whole database
 * need to generate new id for the edited recipe
 * @param {recipeObj} newRecipe - the recipe whose contents will be updated
 * @returns true if this operation is successful, false otherwise
 */
export async function updateRecipe(newRecipe) {
  return await updateRecipeDatabase(newRecipe);
}

/**
 * Creates the given recipe object
 * create recipes based on user, therefore, user actually owns the recipe.
 * In order to publish a recipe(push to whole database), has to use publish recipe method
 * does not assume the newRecipe object already has an unique id, meaning use generatekey() function to get an unique id.
 * @param {recipeObj} newRecipe - the recipe to be created
 * @returns true if the operation was successful, false otherwise
 */
export async function createRecipe(newRecipe) {
  return await createRecipeDatabawe(newRecipe);
}

/**
 * publish an recipe, meaning the user's private created recipes are now copied over whole database
 * @param {newRecipe} newRecipe object
 * @returns
 */
export async function publishRecipe(newRecipe) {
  return await publishRecipeDatabase(newRecipe);
}

export async function ableToPublish(recipeid) {
  return await ableToPublishDatabase(recipeid);
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
 * A helper function to validate form contents
 * @param {Object} recipe recipe object to validate
 * @returns {Object} object containing values for if the form is valid, and error messages otherwise
 */
export function validateForm(recipe) {
  if (recipe.title === '' || recipe.summary === '') {
    return { valid: false, errorMessage: 'Title is empty' };
  }
  if (recipe.summary === '') {
    return { valid: false, errorMessage: 'Summary is empty' };
  }
  if (recipe.servings === '') {
    return { valid: false, errorMessage: 'Servings field is empty' };
  }
  if (recipe.readyInMinutes === '') {
    return { valid: false, errorMessage: 'Time field is empty' };
  }
  if (recipe.image !== '' && !validURL(recipe.image)) {
    return { valid: false, errorMessage: 'Image is not a valid link' };
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
