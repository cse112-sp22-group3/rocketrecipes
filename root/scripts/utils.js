/** @module utils */
/* eslint-disable no-mixed-operators */
// const COMMUNITY_HALF_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_2.json';
// const COMMUNITY_THIRD_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_3.json';
// const COMMUNITY_QUARTER_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_4.json';
// const COMMUNITY_TENTH_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json_10.json';
const auth = 'DkCjtMgbGLJNFLVxTMzfZdrXGGiDbZPwKhn8yKMo';
const LOCAL_STORAGE_USER_KEY = 'uuid';

const FIREBASE_ALL_RECIPES = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/recipes.json?auth=DkCjtMgbGLJNFLVxTMzfZdrXGGiDbZPwKhn8yKMo';
const LOCAL_STORAGE_ALL_RECIPES_KEY = 'allRecipes';
const LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY = 'allRecipesKeys';

const FIREBASE_DATABASE_USER = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/user/';
const FIREBASE_DATABASE_USER_FAVORITE = `/favoriteRercipes.json?auth=${auth}`;

const SINGLE_RECIPE = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/recipes/';
const SINGLE_RECIPE_AUTH = `?auth=${auth}`;

const LOCAL_STORAGE_FAVORITED_RECIPES_KEY = 'favoritedRecipes';

// store created recipes for a specific user
const USER_CREATED_RECIPES_PATH = 'https://rocketrecipes-6c192-default-rtdb.firebaseio.com/user/';
const USER_CREATED_RECIPES = `/createdRecipes.json?auth=${auth}`;

const NO_LOGIN_MY_RECIPES_LOCAL_STORAGE = 'tempMyRecipes';

/**
 * @async
 * This function gets all recipes from database.
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getAllRecipes() {
    const fetchedRecipes = await fetch(FIREBASE_ALL_RECIPES)
        .then((response) => response.json())
        .then((data) => data);

    const tempArr = [];

    // retrive all recipes from fireabse realtime datasbase put them into an array, since other functions calling it assuming recipes are stored in an array
    Object.entries(fetchedRecipes).forEach(([key, value]) => {
        // console.log(`${key} : ${value}`);
        tempArr.push(value);
    });

    return tempArr;
}

/**
 * @async
 * get all recipes ID and put them into local strage
 * When user has created an recipe and publish this recipe, we want to refresh the ids. //@TODO
 */
export async function getAllRecipeID() {
    if (localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY) !== null) {
        const recipesKeys = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY));
        return recipesKeys;
    }

    const fetchedRecipes = await fetch(FIREBASE_ALL_RECIPES)
        .then((response) => response.json())
        .then((data) => data);

    const recipeIDArr = [];
    // retrive all recipes from fireabse realtime datasbase and buffer them into local storage
    Object.entries(fetchedRecipes).forEach(([key, value]) => {
        recipeIDArr.push(key);
    });

    try {
        localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY_ONLY, JSON.stringify(recipeIDArr));
    } catch (e) {
        console.log('an error has occured inside getAllRecipeID()');
        console.log(e);
    }
    return recipeIDArr;
}

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

/**
 * null -> data does not exist
 * @param {*} id recipe id
 * @returns null -> data does not exist, json -> actual data
 */
export async function getOneRecipe(id) {
    const url = `${SINGLE_RECIPE + id}.json${SINGLE_RECIPE_AUTH}`;
    const response = await fetch(url);
    return response.json();
}

/**
 * Gets all recipes a user has favorited from localStorage.
 * @returns {Array} An array of recipe objects, following the given schema
 */
export function getFavoriteRecipes() {
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

/** *************************************************************************************
 * Whenever a user logged in, flush the favorite recipes to accomdate current user
 * favorite recipes will be set to empty whenever a user logged in
 * then populate favorited recipes from firebase
 * Whenever the user log out, sync the local storage favorite recipes with database
 */
export function flushFavoriteRecipes() {
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) !== null) {
        localStorage.removeItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY);
    }
}

export async function populateFavoriteRecipes() {
    flushFavoriteRecipes();
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) !== null) {
        const url = FIREBASE_DATABASE_USER +
            localStorage.getItem(LOCAL_STORAGE_USER_KEY) +
            FIREBASE_DATABASE_USER_FAVORITE;
        console.log('favorited url = ', url);

        const userFavorites = await fetch(url)
            .then((response) => response.json())
            .then((data) => data);
        if (userFavorites !== null) {
            localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(userFavorites));
        }
    }
}

export async function syncFavoriteWithDatabase() {
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) !== null) {
        const url = FIREBASE_DATABASE_USER +
            localStorage.getItem(LOCAL_STORAGE_USER_KEY) +
            FIREBASE_DATABASE_USER_FAVORITE;
        console.log(url);

        const tempArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
        console.log(tempArr);

        const response = await putData(url, tempArr);
        return response;
    }
    return null;
}

export async function syncWithDatabaseUser() {
    await syncFavoriteWithDatabase();
    // possible other syncing function for further development
}
/** ************************************************************************************* */

/**
 * Determines if the given recipe in a user's favorite list
 * @param {recipeId} id - recipeId to check
 * @returns {Boolean}
 */
export function isFavorite(id) {
    const favoritedRecipes = getFavoriteRecipes();
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
    // when the user is not logged in, insert newRecipe in local storage
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) == null) { // not logged in
        const tempArr = [];
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) != null) {
            return JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
        }
        return tempArr;
    }
    const url = USER_CREATED_RECIPES_PATH + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + USER_CREATED_RECIPES;

    const curData = await fetch(url).then((response) => response.json());
    return curData;
}

/**
 * @async
 * Adds recipe with given id to a user's list of favorite recipes
 * @param {recipeId} id of recipe to add
 * @returns {Boolean} true if the operation was successful, false if it was not
 */
export async function addFavoriteRecipe(id) {
    const favoriteRecipe = await getOneRecipe(id);

    // recipe does not exist
    if (favoriteRecipe == null) {
        return false;
    }

    const favoritedRecipes = getFavoriteRecipes();

    // recipe alreay in favorited recipes
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
    const favoritedRecipes = getFavoriteRecipes();

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
 * Due to ES-lint, we must not have an await keyword inside for loop, use promise.all() function @TODO
 * 
 * @param {recipeIdObj} recipeIds of the form {'id1':true, 'id2':true,...}
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getBulkRecipes(recipeIds) {
    const recipes = [];
    for (let i = 0; i < recipeIds.lengnth; i += 1) {
        const recipe = await getOneRecipe(recipeIds[1]);
        recipes.push(recipe);
    }
    return recipes;
}

/**
 * @async
 * Reads the recipe with the given id from database in the following order 
 * 1. if recipe exist in userCreatedRecipes, return this 
 * 2. if recipe exist in userFavorited Recipes, return this @TODO
 * 3. return recipe from whole database
 * @param {recipeId} id of the recipe to be read
 * @returns {recipeObject} corresponding to the id that was passed in. If the recipe
 * does not exist, returns null
 */
export async function readRecipe(id) {
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) != null) {
        let urlUserCreatedRecipe = USER_CREATED_RECIPES_PATH + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + "/createdRecipes/" + id + ".json" + SINGLE_RECIPE_AUTH;
        let userCreatedRecipe = await fetch(urlUserCreatedRecipe).then((response) => response.json());
        if (userCreatedRecipe != null) {
            return userCreatedRecipe;
        }
    }
    const recipe = await getOneRecipe(id);
    return recipe;
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
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) == null) {
        tempArr = []
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) != null) {
            tempArr = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
            for (let i = 0; i < tempArr.length; i++) {
                if (tempArr[i].id == id) {
                    tempArr.splice(i, 1);
                }
            }
        }
        localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(tempArr));
    } else {
        let userCreatedRecipes = await getUserRecipes();
        if (userCreatedRecipes[id] != null) { // delete when user created recipes exists
            let urlCreatedRecipe = FIREBASE_DATABASE_USER + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + "/createdRecipes/" + id + ".json" + SINGLE_RECIPE_AUTH;
            const reponseUserRecipes = deleteData(urlCreatedRecipe);

            let url = SINGLE_RECIPE + id + ".json" + SINGLE_RECIPE_AUTH; //delete from whole database
            const respone_delete = deleteData(url);
            console.log(respone_delete);
        }
    }
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
 * Update recipe is only called when editing page, therefore, no need to insert to whole database
 * need to generate new id for the edited recipe
 * @param {recipeObj} newRecipe - the recipe whose contents will be updated
 * @returns true if this operation is successful, false otherwise
 */
export async function updateRecipe(newRecipe) {
    // when the user is not logged in, insert newRecipe in local storage
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) == null) {
        let tempArr = [];
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) != null) {
            tempArr = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
            // when the new recipe already exists in local storage
            alreadyExistinLocal = False
            for(let i = 0; i < tempArr.length; i ++){
              if(tempArr[i].id == newRecipe.id){
                tempArr[i] = newRecipe; 
                alreadyExsitinLocal = true; 
                break; 
              }
            }
            if(alreadyExistinLocal == False){tempArr.push(newRecipe)};
        }
        localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(tempArr));
        return true;
    } else {
        // check for duplicates
        let urlCheckforDuplicate = USER_CREATED_RECIPES_PATH + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + "/createdRecipes/" + newRecipe.id + ".json" + SINGLE_RECIPE_AUTH;
        let duplicateRecipe = await fetch(urlCheckforDuplicate).then((response) => response.json());
        if (duplicateRecipe != null) { // duplicate exists already in userCreatedRecipes
            let updateRecipeResponse = await putData(urlCheckforDuplicate, newRecipe); // update inside userCreatedRecipes
        // check for if the recipe is in the big database(the user publish the recipe to the whole database, meaning the recipe is owned by one user), update if it exists 
        } else { // duplicate does not exist
            let generatedID = generateKey(newRecipe.id);
            let urlNewRecipe = USER_CREATED_RECIPES_PATH + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + "/createdRecipes/" + generatedID + ".json" + SINGLE_RECIPE_AUTH;
            let newRecipe = await putData(urlCheckforDuplicate, newRecipe); // newly created recipe
        }
        let urlDatabase = SINGLE_RECIPE + newRecipe.id + ".json" + SINGLE_RECIPE_AUTH; 
        let recipeDatabase = await fetch(urlDatabase).then((response) => response.json()); 
        if (recipeDatabase != null){
          let recipeDatabaseResponse = await putData(urlDatabase, newRecipe); 
        }
        return true; 
    }
}

/**
 * Creates the given recipe object
 * create recipes based on user, therefore, user actually owns the recipe. In order to publish a recipe, has to use publish recipe method
 * does not assume the newRecipe object already has an unique id, meaning use generatekey() function to get an unique id. 
 * @param {recipeObj} newRecipe - the recipe to be created
 * @returns true if the operation was successful, false otherwise
 */
export async function createRecipe(newRecipe) {
    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) == null) { // not logged in
        let tempArr = [];
        if (localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE) != null) {
            tempArr = JSON.parse(localStorage.getItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE));
            tempArr.push(newRecipe);
        }
        localStorage.setItem(NO_LOGIN_MY_RECIPES_LOCAL_STORAGE, JSON.stringify(tempArr));
        return newRecipe;
    }
    const id = await generateKey(newRecipe.id);
    newRecipe.id = id;
    let urlCreatedRecipe = USER_CREATED_RECIPES_PATH + localStorage.getItem(LOCAL_STORAGE_USER_KEY) + "/createdRecipes/" + newRecipe.id + ".json" + SINGLE_RECIPE_AUTH;
    let craeteRecipe = await putData(urlCreatedRecipe, newRecipe); 

}

/**
 * publish an recipe, meaning the user's private created recipes are now copied over whole database
 * assumes the newRecipe already calls
 * @param {newRecipe} newRecipe object
 * @returns 
 */
export async function publishRecipe(newRecipe){
  if (localStorage.getItem(LOCAL_STORAGE_USER_KEY) != null) { //user must be logged in to use this functionality
    const id = await generateKey(newRecipe.id);
    newRecipe.id = id;
    let url = SINGLE_RECIPE + newRecipe.id + ".json" + SINGLE_RECIPE_AUTH; 
    let respone = putData(url, newRecipe); 
  }
}

/**
 * generate an ID that is not used in the whole database
 * @TODO also need to check if the id colludes inside userCreatedRecipes
 * @param {id} userGeneratedID 
 * @returns 
 */
async function generateKey(userGeneratedID) {
    let id = userGeneratedID;
    let response = await getOneRecipe(id);
    while (response != null) { // make sure recipe id do not collude
        id = createId();
        response = await getOneRecipe(id);
    }
    return id;
}

// reference: https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
// function randomString(length, chars = 'Aa#') {
//     let mask = '';
//     if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
//     if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     if (chars.indexOf('#') > -1) mask += '0123456789';
//     if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
//     let result = '';
//     for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
//     return result;
// }

/**
 * @TODO
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
                searchScore = numMatchingTokens * (tokenizedQuery.length ** 2) +
                    (tokenizedQuery.length - mostRecentMatch - 1) * tokenizedQuery.length +
                    (numMatchingCharacters / title.length) * tokenizedQuery.length;
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
        +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        +
        '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        +
        '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        +
        '(\\#[-a-z\\d_]*)?$',
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