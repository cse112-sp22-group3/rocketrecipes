/** @module database */
const AUTH = '?auth=DkCjtMgbGLJNFLVxTMzfZdrXGGiDbZPwKhn8yKMo';
const LOCAL_STORAGE_USER_KEY = 'uuid';
const LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY = 'allRecipesKeys';


// retrive all information about database
const FIREBASE_ALL_RECIPES = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/recipes.json?auth=DkCjtMgbGLJNFLVxTMzfZdrXGGiDbZPwKhn8yKMo';

const FIREBASE_DATABASE_USER = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/user/';

// retrive favorited recipes
const USER_FAVORITED_RECIPES = "/favoritedRecipes.json";
const USER_FAVORITED_SINGLE_RECIPE = '/favoritedRecipes/';
const LOCAL_STORAGE_FAVORITED_RECIPES_KEY = 'favoritedRecipes';

// single recipe from whole database
const SINGLE_RECIPE = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/recipes/';

// created recipes
const USER_CREATED_RECIPES = "/createdRecipes.json";
const USER_CREATED_SINGLE_RECIPE = "/createdRecipes/";
const NO_LOGIN_MY_RECIPES_LOCAL_STORAGE = 'createdRecipes';

async function putData(url = '', data = {}) {
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
    return await putData(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_CREATED_SINGLE_RECIPE + recipeObj.id + ".json" + AUTH, recipeObj);
}

/**
 * get recipe from userCreatedRecipe 
 * @param {id} id 
 * @returns {recipeObject}
 */
async function getUserCreatedRecipe(id) {
    let recipe = await fetch(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_CREATED_SINGLE_RECIPE + id + ".json" + AUTH).then((response) => response.json());
    return recipe;
}
/**
 * get all user created recipes
 * @returns 
 */
async function getUserAllCreatedRecipes() {
    let allRecipes = await fetch(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_CREATED_RECIPES + AUTH).then((response) => response.json());
    return allRecipes;
}

/**
 * delete an recipe from user created 
 * @param {} id 
 */
async function deleteUserCreatedRecipe(id) {
    return await deleteData(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_CREATED_SINGLE_RECIPE + id + ".json" + AUTH);
}

/**
 * insert a recipe object inside user's favorited
 * @param {*} recipeObj 
 * @returns 
 */
async function putUserFavoriteRecipe(recipeObj) {
    return await putData(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_FAVORITED_SINGLE_RECIPE + recipeObj.id + ".json" + AUTH, recipeObj);
}

/**
 * get recipe from userFavoritedRecipe 
 * @param {id} id 
 * @returns {recipeObject}
 */
async function getUserFavoritedRecipe(id) {
    let recipe = await fetch(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_FAVORITED_SINGLE_RECIPE + id + ".json" + AUTH).then((response) => response.json());
    return recipe;
}

/**
 * get all favorited recipes from user
 * @returns 
 */
async function getUserAllFavoritedRecipes() {
    let allRrecipes = await fetch(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_FAVORITED_RECIPES + AUTH).then((response) => response.json());
    return allRrecipes;
}

/**
 * delete a recipe id from user's favorited
 * @param {} id 
 * @returns 
 */
async function deleteUserFavoriteRecipe(id) {
    return await deleteData(FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_FAVORITED_SINGLE_RECIPE + id + ".json" + AUTH);
}

async function putDatabaseRecipe(recipeObj) {
    return await putData(SINGLE_RECIPE + recipeObj.id + ".json" + AUTH, recipeObj);
}

/**
 * get recipe from database 
 * @param {id} id 
 * @returns {recipeObject}
 */
async function getDatabaseRecipe(id) {
    let recipe = await fetch(SINGLE_RECIPE + id + ".json" + AUTH).then((response) => response.json());
    return recipe;
}

/**
 * delete an recipe from the whole database
 * @param {} id 
 * @returns 
 */
async function deleteDatabaseRecipe(id) {
    return await deleteData(SINGLE_RECIPE + id + ".json" + AUTH);
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

    let fetchedRecipes = await getAllRecipesDatabase();
    const recipeIDArr = [];
    Object.entries(fetchedRecipes).forEach(([key, value]) => {
        recipeIDArr.push(key);
    });

    try {
        localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY, JSON.stringify(recipeIDArr));
    } catch (e) {
        console.log('an error has occured inside getAllRecipeIDDatabase()');
        console.log(e);
    }
    return recipeIDArr;
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
    }
    // when user if not logged in or when recipe does not exist in userCreatedRecipe or userFavoritedRecipe
    const recipe = await getDatabaseRecipe(recipeID);
    return recipe;
}

export async function getFavoritedRecipesDatabase() {
    if (isUserLoggedIn()) {
        let allRecipes = await getUserAllFavoritedRecipes();
        return allRecipes;
    } else {
        if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
            const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
            return favoritedRecipes;
        }
        return {};
    }
}

export async function isFavoritedDatabase(id) {
    if (isUserLoggedIn()) {
        let recipe = await getUserFavoritedRecipe(id);
        if (recipe !== null) {
            return true;
        }
        return false;
    } else {
        if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
            const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
            if (favoritedRecipes[id] !== null) {
                return true;
            }
            return false;
        }
    }
}

export async function addFavoriteRecipeDatabase(id) {
    let recipe = await readRecipeDatabase(id);
    if (recipe === null) { return null };

    if (isUserLoggedIn()) {
        return await putUserFavoriteRecipe(recipe);
    } else {
        if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
            const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
            favoritedRecipes[recipe.id] = recipe;
            localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes))
            return recipe;
        }
    }
}

export async function deleteFavoriteRecipeDatabase(id) {
    if (isUserLoggedIn()) {
        await deleteUserFavoriteRecipe(id);
        return true;
    } else {
        if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
            const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
            delete favoritedRecipes[recipe.id];
            localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes))
            return true;
        }
    }
}

export async function getUserAllCreatedRecipesDatabase() {
    if (isUserLoggedIn()) {
        let allRecipes = await getUserAllCreatedRecipes();
        return allRecipes;
    } else {
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) !== null) {
            return JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
        }
        return {};
    }
}

async function isConflict(id) {
    let recipeDatabase = await getDatabaseRecipe(id);
    if (isUserLoggedIn()) {
        let userRecipe = await getUserCreatedRecipe(id);
        let userFavoriteRecipe = await getUserFavoritedRecipe(id);
        if (recipeDatabase == null && userRecipe == null && userFavoriteRecipe == null) {
            return false;
        }
    } else {
        if (recipeDatabase == null) {
            return false;
        }
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
 * @returns 
 */
async function generateKey(userGeneratedID) {
    let id = userGeneratedID;
    while (await isConflict(id)) {
        id = createId(id);
    }
    return id;
}

export async function createRecipeDatabase(newRecipe) {
    const id = await generateKey(newRecipe.id);
    newRecipe.id = id;
    if (isUserLoggedIn()) {
        return await putUserCreatedRecipe(newRecipe);
    } else {
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) != null) {
            myRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
            myRecipes[newRecipe.id] = newRecipe;
            localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(myRecipes));
            return newRecipe;
        }
        return {};
    }
}

export async function ableToDeleteDatabase(id) {
    if (isUserLoggedIn()) {
        let recipe = await getUserCreatedRecipe(id);
        if (recipe !== null) {
            return true;
        }
    } else {
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) != null) {
            let createdRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
            if (createdRecipes[id] !== null) {
                return true;
            }
        }
    }
    return false;
}

export async function deleteRecipeDatabase(id) {
    if (isUserLoggedIn()) {
        let userCreatedRecipe = await getUserCreatedRecipe(id);
        if (userCreatedRecipe != null) {
            const reponseUserRecipes = await deleteUserCreatedRecipe(id);
            const responeDatabase = await deleteDatabaseRecipe(id); // automically fail when user does not own this reipe
        }
    } else {
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) != null) {
            let createdRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
            delete createdRecipes[id] !== null;
            localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(createdRecipes));
        }
    }
}

export async function ableToPublishDatabase(recipeid) {
    if (isUserLoggedIn()) {
        let recipe = await getDatabaseRecipe(recipeid);
        if (recipe === null) {
            return true;
        }
    }
    return false;
}

export async function publishRecipeDatabase(newRecipe) {
    if (isUserLoggedIn()) {
        return await putDatabaseRecipe(newRecipe);
    }
    return null;
}

export async function updateRecipeDatabase(newRecipe) {
    if (isUserLoggedIn()) {
        let duplicateRecipe = await getUserCreatedRecipe(newRecipe.id);
        if (duplicateRecipe !== null) { await putUserCreatedRecipe(newRecipe); } // overwrite duplicate recipes
        else {
            // no dulicate must not present in whole database
            let generatedID = await generateKey(newRecipe.id);
            newRecipe.id = generatedID;
            return await putUserCreatedRecipe(newRecipe);
        }
        // check for if the recipe is in the big database(the user publish the recipe to the whole database, meaning the recipe is owned by one user), update if it exists 
        let databaseDuplicate = getDatabaseRecipe(newRecipe.id);
        if (databaseDuplicate !== null) {
            return await putDatabaseRecipe(newRecipe)
        }
    } else {
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) !== null) {
            let myRecipes = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
            // when the new recipe already exists in local storage
            myRecipes[newRecipe.id] = newRecipe;
            return newRecipe;
        }
    }
}