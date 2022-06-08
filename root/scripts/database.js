/** @module database */
/* eslint-disable  no-return-await */
/* eslint-disable  no-restricted-syntax */
/* eslint-disable  no-await-in-loop */

export const AUTH = '?auth=DkCjtMgbGLJNFLVxTMzfZdrXGGiDbZPwKhn8yKMo';
export const LOCAL_STORAGE_USER_KEY = 'uuid';
export const LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY = 'allRecipesKeys';

// retrive all information about database
export const FIREBASE_ALL_RECIPES = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/recipes.json?auth=DkCjtMgbGLJNFLVxTMzfZdrXGGiDbZPwKhn8yKMo';

export const FIREBASE_DATABASE_USER = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/user/';

// retrive favorited recipes
const USER_FAVORITED_RECIPES = '/favoritedRecipes.json';
const USER_FAVORITED_SINGLE_RECIPE = '/favoritedRecipes/';
const LOCAL_STORAGE_FAVORITED_RECIPES_KEY = 'favoritedRecipes';

// single recipe from whole database
const SINGLE_RECIPE = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/recipes/';

// created recipes
const USER_CREATED_RECIPES = '/createdRecipes.json';
const USER_CREATED_SINGLE_RECIPE = '/createdRecipes/';
const NO_LOGIN_MY_RECIPES_LOCAL_STORAGE = 'createdRecipes';

export async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function deleteData(url = '') {
  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function isUserLoggedIn() {
  if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) !== null) {
    return true;
  }
  return false;
}

/**
 * get recipe from userCreatedRecipe
 * @param {id} id
 * @returns {recipeObject}
 */
async function putUserCreatedRecipe(recipeObj) {
  const response = await putData(
    `${
      FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_CREATED_SINGLE_RECIPE
      + recipeObj.id
    }.json${AUTH}`,
    recipeObj,
  );
  return response;
}

/**
 * get recipe from userCreatedRecipe
 * @param {id} id
 * @returns {recipeObject}
 */
async function getUserCreatedRecipe(id) {
  const recipe = await fetch(
    `${
      FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_CREATED_SINGLE_RECIPE
      + id
    }.json${AUTH}`,
  ).then((response) => response.json());
  return recipe;
}

/**
 * get all user created recipes
 * @returns {allRecipes}
 */
async function getUserAllCreatedRecipes() {
  const allRecipes = await fetch(
    FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_CREATED_RECIPES
      + AUTH,
  ).then((response) => response.json());
  return allRecipes;
}

/**
 * delete an recipe from user created
 * @param {} id
 */
async function deleteUserCreatedRecipe(id) {
  const response = await deleteData(
    `${
      FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_CREATED_SINGLE_RECIPE
      + id
    }.json${AUTH}`,
  );
  return response;
}

/**
 * insert a recipe object inside user's favorited
 * @param {*} recipeObj
 * @returns {recipeObj}
 */
async function putUserFavoriteRecipe(recipeObj) {
  const response = await putData(
    `${
      FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_FAVORITED_SINGLE_RECIPE
      + recipeObj.id
    }.json${AUTH}`,
    recipeObj,
  );
  return response;
}

/**
 * get recipe from userFavoritedRecipe
 * @param {id} id
 * @returns {recipeObject}
 */
async function getUserFavoritedRecipe(id) {
  const recipe = await fetch(
    `${
      FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_FAVORITED_SINGLE_RECIPE
      + id
    }.json${AUTH}`,
  ).then((response) => response.json());
  return recipe;
}

/**
 * get all favorited recipes from user
 * @returns {allRecieps} Object
 */
async function getUserAllFavoritedRecipes() {
  const allRrecipes = await fetch(
    FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_FAVORITED_RECIPES
      + AUTH,
  ).then((response) => response.json());
  return allRrecipes;
}

/**
 * delete a recipe id from user's favorited
 * @param {} id
 * @returns {recipeObj}
 */
async function deleteUserFavoriteRecipe(id) {
  const response = await deleteData(
    `${
      FIREBASE_DATABASE_USER
      + localStorage.getItem(LOCAL_STORAGE_USER_KEY)
      + USER_FAVORITED_SINGLE_RECIPE
      + id
    }.json${AUTH}`,
  );
  return response;
}

async function putDatabaseRecipe(recipeObj) {
  const response = await putData(`${SINGLE_RECIPE + recipeObj.id}.json${AUTH}`, recipeObj);
  return response;
}

/**
 * get recipe from database
 * @param {id} id
 * @returns {recipeObject}
 */
async function getDatabaseRecipe(id) {
  const recipe = await fetch(`${SINGLE_RECIPE + id}.json${AUTH}`).then((response) => response.json());
  return recipe;
}

/**
 * delete an recipe from the whole database
 * @param {id} id
 * @returns {promise}
 */
async function deleteDatabaseRecipe(id) {
  const response = await deleteData(`${SINGLE_RECIPE + id}.json${AUTH}`);
  return response;
}

export async function getAllRecipesDatabase() {
  const fetchedRecipes = await fetch(FIREBASE_ALL_RECIPES).then((response) => response.json());
  return fetchedRecipes;
}

export async function getAllRecipeIDDatabase() {
  if (localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY) !== null) {
    const recipesKeys = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY));
    return recipesKeys;
  }

  const fetchedRecipes = await getAllRecipesDatabase();
  const recipeIDArr = [];
  for (const key of Object.keys(fetchedRecipes)) {
    recipeIDArr.push(key);
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY, JSON.stringify(recipeIDArr));
  } catch (e) {
    console.log('an error has occured inside getAllRecipeIDDatabase()');
    console.log(e);
  }
  return recipeIDArr;
}

/**
 * Gets all recipes a user has favorited from database.
 * @async
 * @returns {RecipeObject} an object contain all recipes, null when contain nothing
 */
export async function getFavoritedRecipesDatabase() {
  if (isUserLoggedIn()) {
    const allRecipes = await getUserAllFavoritedRecipes();
    return allRecipes;
  }
  if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
    const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
    return favoritedRecipes;
  }
  return null;
}

/**
 * Determines if the given recipe in a user's favorite list
 * @async
 * @param {recipeId} id - recipeId to check
 * @returns {Boolean} true-> favorited, false -> not favorited
 */
export async function isFavoritedDatabase(id) {
  if (isUserLoggedIn()) {
    const recipe = await getUserFavoritedRecipe(id);
    if (recipe !== null) {
      return true;
    }
    return false;
  }
  if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
    const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
    if (id in favoritedRecipes) {
      return true;
    }
  }
  return false;
}

/**
 * Priority List:
 * 1. user created recipe
 * 2. user favorited recipe
 * 3. database recipe
 *
 * @async
 * @param {recipeID} recipeID id of the recipe
 * @return {recipeObject} recipeObject corresponding to the id that was passed in. If the recipe
 * does not exist, returns null
 */
export async function readRecipeDatabase(recipeID) {
  if (isUserLoggedIn()) {
    const userCreated = await getUserCreatedRecipe(recipeID);
    if (userCreated !== null) {
      return userCreated;
    }
    const userFavorited = await getUserFavoritedRecipe(recipeID);
    if (userFavorited !== null) {
      return userFavorited;
    }
  } else {
    const userCreatedLocal = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
    if (userCreatedLocal !== null && recipeID in userCreatedLocal) {
      return userCreatedLocal[recipeID];
    }
  }
  // when user if not logged in or
  // when recipe does not exist in userCreatedRecipe or userFavoritedRecipe
  const recipe = await getDatabaseRecipe(recipeID);
  return recipe;
}

/**
 * Adds recipe with given id to a user's of favorited recipes
 * @async
 * @param {recipeId} id of recipe to add
 * @returns {recipeObj} recipeObj when successful, null unsuccessful
 */
export async function addFavoriteRecipeDatabase(id) {
  const recipe = await readRecipeDatabase(id);
  if (recipe === null) {
    return null;
  }

  if (isUserLoggedIn()) {
    const response = await putUserFavoriteRecipe(recipe);
    return response;
  }
  if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
    const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
    favoritedRecipes[id] = recipe;
    localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes));
    return recipe;
  }
  const tempObj = {};
  tempObj[id] = recipe;
  localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(tempObj));
  return recipe;
}

/**
 * Deletes recipe with given id from the user's list of favorite recipes
 * @async
 * @param {recipeId} id of the recipe to be deleted
 * @returns {Boolean} true if the operation was successful, false if it was not
 */
export async function deleteFavoriteRecipeDatabase(id) {
  if (isUserLoggedIn()) {
    await deleteUserFavoriteRecipe(id);
    return true;
  }
  if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
    const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
    if (id in favoritedRecipes) {
      delete favoritedRecipes[id];
    }
    localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes));
    return true;
  }
  return false;
}

/**
 * Gets all recipes a user has created
 * @async
 * @returns {recipeObj} object containnin all user craeted recipes
 */
export async function getUserAllCreatedRecipesDatabase() {
  if (isUserLoggedIn()) {
    const allRecipes = await getUserAllCreatedRecipes();
    return allRecipes;
  }
  if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) !== null) {
    return JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
  }
  return null;
}

/**
 * check if the recipe id already exist in the whole database and user created recipes
 * @param {id} id
 * @returns true -> no conflict, false -> conflict
 */
async function isConflict(id) {
  const recipeDatabase = await getDatabaseRecipe(id);
  if (isUserLoggedIn()) {
    const userRecipe = await getUserCreatedRecipe(id);
    const userFavoriteRecipe = await getUserFavoritedRecipe(id);
    if (recipeDatabase == null && userRecipe == null && userFavoriteRecipe == null) {
      return false;
    }
  } else if (recipeDatabase == null) {
    return false;
  }
  return true;
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
 * generate an ID that is not used in the whole database
 * @param {id} userGeneratedID
 * @returns a key
 */
async function generateKey(userGeneratedID) {
  let id = userGeneratedID;
  while (await isConflict(id)) {
    id = createId(id);
  }
  return id;
}

/**
 * Creates the given recipe object
 * create recipes based on user, therefore, user actually owns the recipe.
 * In order to publish a recipe(push to whole database), has to use publish recipe method
 * does not assume the newRecipe object already has an unique id,
 * meaning use generatekey() function to get an unique id.
 * @param {recipeObj} newRecipe - the recipe to be created
 * @returns recipeObj create successful. null create unsuccessful
 */
export async function createRecipeDatabase(newRecipe) {
  const id = await generateKey(newRecipe.id);
  const newRecipe2 = JSON.parse(JSON.stringify(newRecipe));
  newRecipe2.id = id;
  if (isUserLoggedIn()) {
    const response = await putUserCreatedRecipe(newRecipe2);
    return response;
  }
  if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) !== null) {
    const myRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
    myRecipes[newRecipe2.id] = newRecipe2;
    localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(myRecipes));
    return newRecipe2;
  }
  const tempObj = {};
  tempObj[newRecipe2.id] = newRecipe2;
  localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(tempObj));
  return newRecipe2;
}

/**
 * if the user owns a recipe, the use can delte it.
 * if the user has already published recipe, it will also get deleted from whole database.
 * when the user is not logged in, only delete at local storage, can not delete at whole database
 * @param {recipdID} id
 * @returns true-> able to delete, false-> unable to delete
 */
export async function ableToDeleteDatabase(id) {
  if (isUserLoggedIn()) {
    const recipe = await getUserCreatedRecipe(id);
    if (recipe !== null) {
      return true;
    }
  } else if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) !== null) {
    const createdRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
    if (id in createdRecipes) {
      return true;
    }
  }
  return false;
}

/**
 * Delete a recipe when the recipe belongs to the user.
 * if user is logged in, and recipe is user created,
 * it will delete recipe from user created recipes list and from the whole database if it exists.
 * if user is logged in, and recipe is not user created, delete button would not work.
 * if user not logged in, it will only delte at local storage.
 * @param {recipeId} id of the recipe to be deleted
 * @returns {recipeObj} true if the operation was successful, false otherwise
 */
export async function deleteRecipeDatabase(id) {
  if (isUserLoggedIn()) {
    const userCreatedRecipe = await getUserCreatedRecipe(id);
    if (userCreatedRecipe !== null) {
      await deleteUserCreatedRecipe(id);
      await deleteDatabaseRecipe(id); // automically fail when user does not own this reipe
      return true;
    }
  } else if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) !== null) {
    const createdRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
    if (id in createdRecipes) {
      delete createdRecipes[id];
      localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(createdRecipes));
    }
  }
  return false;
}

/**
 * if the recipe id is ownber by the user and recipeid does not present in the whole database,
 * that means it is able to be published.
 * always return false if the user is not logged in.
 * @param {recipdid} recipeid
 * @returns ture -> able to publish, false ->unable to publish
 */
export async function ableToPublishDatabase(recipeid) {
  if (isUserLoggedIn()) {
    const recipe = await getDatabaseRecipe(recipeid);
    if (recipe === null) {
      return true;
    }
  }
  return false;
}

/**
 * publish an recipe, meaning the user's private created recipes are now copied over whole database.
 * does not work when user is not logged in.
 * @param {newRecipe} newRecipe object
 * @returns recipeObj successful, null -> unsuccessful
 */
export async function publishRecipeDatabase(newRecipe) {
  if (isUserLoggedIn()) {
    const response = await putDatabaseRecipe(newRecipe);
    return response;
  }
  return null;
}

/**
 * updates the contents of recipe into paramenter newRecipe from user created recipes.
 * update recipe is only called when editing page, therefore,
 * update the whole database if the same recipe if presented.
 * @param {recipeObj} newRecipe - the recipe whose contents will be updated
 * @returns recipe Obj if updates is successful, null if unsuccessful
 */
export async function updateRecipeDatabase(newRecipe) {
  const newRecipe2 = JSON.parse(JSON.stringify(newRecipe));
  if (isUserLoggedIn()) {
    const duplicateRecipe = await getUserCreatedRecipe(newRecipe2.id);
    if (duplicateRecipe !== null) {
      await putUserCreatedRecipe(newRecipe2);
    } else {
      // overwrite duplicate recipes
      // no dulicate must not present in whole database
      const generatedID = await generateKey(newRecipe2.id);
      newRecipe2.id = generatedID;
      return await putUserCreatedRecipe(newRecipe2);
    }
    // check for if the recipe is in the big database
    // the user publish the recipe to the whole database,
    // meaning the recipe is owned by one user
    // update if it exists
    const databaseDuplicate = getDatabaseRecipe(newRecipe2.id);
    if (databaseDuplicate !== null) {
      return await putDatabaseRecipe(newRecipe2);
    }
  } else {
    // update only at locally created when not logged in, do not sync with whole database
    if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) !== null) {
      const myRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
      // when the new recipe already exists in local storage
      myRecipes[newRecipe2.id] = newRecipe2;
      localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(myRecipes));
      return newRecipe2;
    }
    return null;
  }
  return null;
}
