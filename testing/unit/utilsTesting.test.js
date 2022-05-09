/**
 * @jest-environment jsdom
 */
import * as utils from './testutil.js'
import * as utilFunctions from '../../root/scripts/utils.js'; // eslint-disable-line no-lone-blocks
import { util } from 'prettier';

// unmockedFetch stores the original global fetch function
const unmockedFetch = global.fetch

const exampleRecipe = {"id":"03037094263d99fee5cf5c901329a738","title":"Jambalaya Stew","readyInMinutes":45,"servings":4,"image":"https://spoonacular.com/recipeImages/648432-556x370.jpg","uploader":"From the Internet","isFromInternet":true,"vegetarian":false,"vegan":false,"cheap":false,"glutenFree":true,"dairyFree":true,"quickEat":true,"fiveIngredientsOrLess":false,"easyCook":false,"ingredients":[{"name":"chicken sausage","amount":6,"unit":"oz"},{"name":"canned tomatoes","amount":14.5,"unit":"oz"},{"name":"onion","amount":0.75,"unit":"cup"},{"name":"yellow pepper","amount":1,"unit":"large"},{"name":"celery","amount":1,"unit":"cup"},{"name":"low sodium chicken broth","amount":1,"unit":"cup"},{"name":"brown rice","amount":0.5,"unit":"cup"},{"name":"garlic","amount":1,"unit":"tbsp"},{"name":"cajun seasoning","amount":1,"unit":"tsp"},{"name":"hot sauce","amount":0.5,"unit":"tsp"},{"name":"oregano","amount":0.25,"unit":"tsp"},{"name":"dried thyme","amount":0.25,"unit":"tsp"},{"name":"shrimp","amount":6,"unit":"oz"}],"summary":"Jambalaya Stew might be a good recipe to expand your main course recipe box. This recipe serves 4 and costs $2.27 per serving. Watching your figure? This gluten free and dairy free recipe has 289 calories, 21g of protein, and 8g of fat per serving. From preparation to the plate, this recipe takes roughly roughly 45 minutes. It is brought to you by Foodista. Autumn will be even more special with this recipe. If you have cajun seasoning, canned tomatoes, shrimp, and a few other ingredients on hand, you can make it. This recipe is liked by 11 foodies and cooks. It is an affordable recipe for fans of Cajun food. All things considered, we decided this recipe deserves a spoonacular score of 80%. This score is great. Users who liked this recipe also liked Jambalaya Stew, Gumbo-laya” (Gumbo + Jambalaya) Stew, and Jambalaya.","steps":[{"number":1,"step":"Add all ingredients except shrimp to a large pot on the stove."},{"number":2,"step":"Mix thoroughly. Bring to a boil."},{"number":3,"step":"Reduce heat to medium low. Cover and simmer until vegetables are tender and rice is fluffy, about 35 minutes."},{"number":4,"step":"Add shrimp and re-cover. Continue to cook until shrimp are tender and cooked through, about 6 minutes."},{"number":5,"step":"If you like, season to taste with salt, black pepper, and additional hot sauce."},{"number":6,"step":"Serve and enjoy!!!"}]};

beforeAll(() => {
    // set local storage to be the mocked local storage
    global.localStorage = new utils.LocalStorageMock();

    // set fetch to be this mocked fetch that always returns utils.mockedRecipes
    global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(utils.mockedRecipes),
    })
});

test('assert 0 recipes upon', async () => {
    const recipes = await utilFunctions.getAllRecipes();
    expect(recipes.length).toBeGreaterThan(0);
});

test('read recipe returns 1 recipe', async () => {
    const recipe = await utilFunctions.readRecipe('b1ffbdfcc516588601f4ee651b5ed684');
    expect(recipe.title).toBe('Slow Cooker Chicken and Dumplings');
});

test('read recipe returns correct recipe', async () => {
    const recipe = await utilFunctions.readRecipe('b1ffbdfcc516588601f4ee651b5ed684');
    expect(recipe.id).toBe('b1ffbdfcc516588601f4ee651b5ed684');
});

test('update recipe does not create a new recipe', async () => {
  const newRecipe = exampleRecipe;
  const allRecipesOriginal = await utilFunctions.getAllRecipes();
  newRecipe.id = 'b1ffbdfcc516588601f4ee651b5ed684';
  await utilFunctions.updateRecipe(newRecipe);
  
  const allRecipes = await utilFunctions.getAllRecipes();
  expect(allRecipes.length).toBe(allRecipesOriginal.length);
});

test('update recipe updates the right recipe', async () => {
  const newRecipe = exampleRecipe;
  const allRecipesOriginal = await utilFunctions.getAllRecipes();
  newRecipe.id = 'b1ffbdfcc516588601f4ee651b5ed684';
  await utilFunctions.updateRecipe(newRecipe);
  
  const allRecipes = await utilFunctions.getAllRecipes();

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i] === newRecipe.id) {
      expect(allRecipes[i]).toBe(newRecipe);
    }
  }
});

test('create recipe creates 1 new recipe', async () => {
  const originalRecipes = await utilFunctions.getAllRecipes();
  await utilFunctions.createRecipe(exampleRecipe);
  const newRecipes = await utilFunctions.getAllRecipes();

  expect(originalRecipes.length).toBe(newRecipes.length);
});

test('create recipe creates correct recipe', async () => {
  await utilFunctions.createRecipe(exampleRecipe);
  const newRecipes = await utilFunctions.getAllRecipes();

  for (let i = 0; i < newRecipes.length; i += 1) {
    if (newRecipes[i].id === exampleRecipe.id) {
      expect(newRecipes[i]).toStrictEqual(exampleRecipe);
    }
  }
});

test('create recipe with existing recipe fails', async () => {
  const allRecipes = await utilFunctions.getAllRecipes();
  const existingRecipe = allRecipes[1];

  const successful = await utilFunctions.createRecipe(existingRecipe);
  expect(successful).toBe(false);

  const newRecipes = await utilFunctions.getAllRecipes();
  expect(newRecipes.length).toBe(newRecipes.length);
});

test('delete recipe works', async () => {
  const allRecipes = await utilFunctions.getAllRecipes();
  const successful = await utilFunctions.deleteRecipe('b1ffbdfcc516588601f4ee651b5ed684');
  expect(successful).toBe(true);

  const newRecipes = await utilFunctions.getAllRecipes();
  expect(newRecipes.length).toBe(allRecipes.length-1);
});

test('delete recipe works with invalid id', async () => {
  const allRecipes = await utilFunctions.getAllRecipes();
  const successful = await utilFunctions.deleteRecipe('1');
  expect(successful).toBe(false);

  const newRecipes = await utilFunctions.getAllRecipes();
  expect(newRecipes.length).toBe(allRecipes.length);
});

test('check favorited recipe initializes to empty', async () => {
  const favoritedRecipes = await utilFunctions.getFavoriteRecipes();
  expect(favoritedRecipes.length).toBe(0);
});

test('favorited recipe add does not add invalid id', async () => {
  const favoritedRecipes = await utilFunctions.getFavoriteRecipes();
  await utilFunctions.addFavoriteRecipe('1');
  const newFavoritedRecipes = await utilFunctions.getFavoriteRecipes();

  expect(newFavoritedRecipes).toStrictEqual(favoritedRecipes);
});

test('favorited recipe adds valid id', async () => {
  const favoritedRecipes = await utilFunctions.getFavoriteRecipes();
  const add = await utilFunctions.addFavoriteRecipe('ae94d68f70216f7017e6056291dc2682');
  expect(add).toBe(true);

  const newFavoritedRecipes = await utilFunctions.getFavoriteRecipes();
  expect(newFavoritedRecipes.length).toBe(favoritedRecipes.length+1);
  expect(newFavoritedRecipes).toStrictEqual(['ae94d68f70216f7017e6056291dc2682']);
});

test('favorited recipe delete on invalid id works', async () => {
  const favoritedRecipes = await utilFunctions.getFavoriteRecipes();
  const del = await utilFunctions.deleteFavoriteRecipe('1');
  expect(del).toBe(false);

  const newFavoritedRecipes = await utilFunctions.getFavoriteRecipes();
  expect(newFavoritedRecipes).toStrictEqual(favoritedRecipes);
});

test('valid favorited recipe delete works', async () => {
  const favoritedRecipes = await utilFunctions.getFavoriteRecipes();
  const del = await utilFunctions.deleteFavoriteRecipe('ae94d68f70216f7017e6056291dc2682');
  expect(del).toBe(true);

  const newFavoritedRecipes = await utilFunctions.getFavoriteRecipes();
  expect(newFavoritedRecipes).toStrictEqual([]);
  expect(newFavoritedRecipes.length).toBe(0);
});

test('assert created recipe is user specific', async () => {
  const userRecipes = await utilFunctions.getUserRecipes();
  expect(userRecipes.length).toBe(0);
  await utilFunctions.createRecipe(exampleRecipe);
  expect(userRecipes.length).toBe(1);
  await utilFunctions.deleteRecipe(exampleRecipe.id);
  expect(newFavoritedRecipes.length).toBe(0);
});
// After all tests are done, restore the global fetch function
// back to the original 
afterAll(() => {
  global.fetch = unmockedFetch
})