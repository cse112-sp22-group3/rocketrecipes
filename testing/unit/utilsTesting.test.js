/**
 * @jest-environment jsdom
 */
import * as utils from './testutil.js'
import * as utilFunctions from '../../root/scripts/utils.js'; // eslint-disable-line no-lone-blocks
import { util } from 'prettier';

// unmockedFetch stores the original global fetch function
const unmockedFetch = global.fetch

const updatingRecipe = {"id":"03037094263d99fee5cf5c901329a738","title":"Jambalaya Stew","readyInMinutes":45,"servings":4,"image":"https://spoonacular.com/recipeImages/648432-556x370.jpg","uploader":"From the Internet","isFromInternet":true,"vegetarian":false,"vegan":false,"cheap":false,"glutenFree":true,"dairyFree":true,"quickEat":true,"fiveIngredientsOrLess":false,"easyCook":false,"ingredients":[{"name":"chicken sausage","amount":6,"unit":"oz"},{"name":"canned tomatoes","amount":14.5,"unit":"oz"},{"name":"onion","amount":0.75,"unit":"cup"},{"name":"yellow pepper","amount":1,"unit":"large"},{"name":"celery","amount":1,"unit":"cup"},{"name":"low sodium chicken broth","amount":1,"unit":"cup"},{"name":"brown rice","amount":0.5,"unit":"cup"},{"name":"garlic","amount":1,"unit":"tbsp"},{"name":"cajun seasoning","amount":1,"unit":"tsp"},{"name":"hot sauce","amount":0.5,"unit":"tsp"},{"name":"oregano","amount":0.25,"unit":"tsp"},{"name":"dried thyme","amount":0.25,"unit":"tsp"},{"name":"shrimp","amount":6,"unit":"oz"}],"summary":"Jambalaya Stew might be a good recipe to expand your main course recipe box. This recipe serves 4 and costs $2.27 per serving. Watching your figure? This gluten free and dairy free recipe has 289 calories, 21g of protein, and 8g of fat per serving. From preparation to the plate, this recipe takes roughly roughly 45 minutes. It is brought to you by Foodista. Autumn will be even more special with this recipe. If you have cajun seasoning, canned tomatoes, shrimp, and a few other ingredients on hand, you can make it. This recipe is liked by 11 foodies and cooks. It is an affordable recipe for fans of Cajun food. All things considered, we decided this recipe deserves a spoonacular score of 80%. This score is great. Users who liked this recipe also liked Jambalaya Stew, Gumbo-laya” (Gumbo + Jambalaya) Stew, and Jambalaya.","steps":[{"number":1,"step":"Add all ingredients except shrimp to a large pot on the stove."},{"number":2,"step":"Mix thoroughly. Bring to a boil."},{"number":3,"step":"Reduce heat to medium low. Cover and simmer until vegetables are tender and rice is fluffy, about 35 minutes."},{"number":4,"step":"Add shrimp and re-cover. Continue to cook until shrimp are tender and cooked through, about 6 minutes."},{"number":5,"step":"If you like, season to taste with salt, black pepper, and additional hot sauce."},{"number":6,"step":"Serve and enjoy!!!"}]};
const creatingRecipe = {"id":"db20daf2a9b091177903e242ce967237","title":"Watermelon, Feta And Mint Salad","readyInMinutes":45,"servings":6,"image":"https://spoonacular.com/recipeImages/665041-556x370.jpg","uploader":"teamrocket","isFromInternet":false,"vegetarian":true,"vegan":false,"cheap":false,"glutenFree":true,"dairyFree":false,"quickEat":true,"fiveIngredientsOrLess":false,"easyCook":false,"ingredients":[{"name":"honey","amount":1,"unit":"tbsp"},{"name":"cucumber","amount":0.5,"unit":""},{"name":"curly leaf lettuce","amount":1,"unit":"head"},{"name":"feta cheese","amount":1,"unit":"package"},{"name":"mint","amount":3,"unit":"tbsp"},{"name":"lemon","amount":0.5,"unit":""},{"name":"olive oil","amount":4,"unit":"tbsp"},{"name":"bell pepper","amount":6,"unit":"servings"},{"name":"salt","amount":6,"unit":"servings"},{"name":"watermelon","amount":1,"unit":"pound"}],"summary":"Watermelon, Fetan And Mint Salad might be just the side dish you are searching for. This recipe makes 6 servings with 231 calories, 7g of protein, and 18g of fat each. For $1.55 per serving, this recipe covers 16% of your daily requirements of vitamins and minerals. This recipe from Foodista has 8 fans. It can be enjoyed any time, but it is especially good for Summer. A mixture of pepper, cucumber, mint, and a handful of other ingredients are all it takes to make this recipe so tasty. It is a good option if you're following a gluten free, primal, and vegetarian diet. From preparation to the plate, this recipe takes approximately 45 minutes. All things considered, we decided this recipe deserves a spoonacular score of 75%. This score is pretty good. Try Watermelon Feta Salad with Mint, Feta-watermelon Salad With Mint, and Watermelon, Feta, and Mint Salad for similar recipes.","steps":[{"number":1,"step":"Cut the watermelon into big wedges, then cut the flesh away from the skin. Slice the flesh into bite sized pieces."},{"number":2,"step":"Cut the cucumber in half then half lengthways too. Use a potato peeler to slice ribbons off the cucumber.Arrange the lettuce leaves in a large bowl, top with the watermelon, cucumber, feta and mint.Finally place all the dressing ingredients together (juice of 1/2 lemon, olive oil, honey) in a small bowl and whisk together with a fork. Season to taste."},{"number":3,"step":"Drizzle the dressing over the salad and serve."}]};
const creatingRecipe2 = {"id":"6b386ede98e7a353e085c4883fa2e8b6","title":"Creamy Porcini Mushroom Polenta","readyInMinutes":45,"servings":6,"image":"https://spoonacular.com/recipeImages/640677-556x370.jpg","uploader":"teamrocket","isFromInternet":false,"vegetarian":false,"vegan":false,"cheap":false,"glutenFree":true,"dairyFree":false,"quickEat":true,"fiveIngredientsOrLess":false,"easyCook":false,"ingredients":[{"name":"butter","amount":1,"unit":"tablespoon"},{"name":"dried porcini mushrooms","amount":1,"unit":"cup"},{"name":"cream","amount":0.5,"unit":"cup"},{"name":"parmesan","amount":1,"unit":"cup"},{"name":"polenta","amount":1,"unit":"cup"},{"name":"salt","amount":6,"unit":"servings"},{"name":"water","amount":4,"unit":"cups"}],"summary":"Creamy Porcini Mushroom Polentan is a gluten free side dish. This recipe makes 6 servings with 263 calories, 9g of protein, and 14g of fat each. For $1.69 per serving, this recipe covers 7% of your daily requirements of vitamins and minerals. Head to the store and pick up water, porcini mushrooms, heavy cream, and a few other things to make it today. 27 people have made this recipe and would make it again. From preparation to the plate, this recipe takes approximately 45 minutes. All things considered, we decided this recipe deserves a spoonacular score of 30%. This score is not so super. Try Wild Mushroom Polenta with Porcini Sauce, Creamy polenta & mushroom ragout, and Polenta with Creamy Mushroom Sauce for similar recipes.","steps":[{"number":1,"step":"In a large heavy bottomed saucepan, season water with salt and bring to a boil. Quickly whisk in the polenta until fully incorporated.Lower the heat to a simmer, add the butter and porcini and allow the polenta to cook, stirring occasionally for about 30 minutes.Finish by stirring in the cream and Parmesan cheese. If necessary, add salt to taste."}]};

beforeAll(() => {
    // set local storage to be the mocked local storage
    global.localStorage = new utils.LocalStorageMock();

    // set fetch to be this mocked fetch that always returns utils.mockedRecipes
    global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(utils.mockedRecipes),
    })
});

test('assert getAllRecipes() succeeds', async () => {
    const recipes = await utilFunctions.getAllRecipes();
    expect(recipes.length).toBe(3);
});

test('assert updateRecipe() does not create new recipe', async () => {
  const newRecipe = updatingRecipe;
  const allRecipesOriginal = await utilFunctions.getAllRecipes();
  newRecipe.id = 'b1ffbdfcc516588601f4ee651b5ed684';
  await utilFunctions.updateRecipe(newRecipe);
  
  const allRecipes = await utilFunctions.getAllRecipes();
  expect(allRecipes.length).toBe(allRecipesOriginal.length);
});

afterAll(() => {
  global.fetch = unmockedFetch
})