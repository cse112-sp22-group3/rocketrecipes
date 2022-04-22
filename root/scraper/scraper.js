const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs').promises;

const API_KEY = 'f5bb0a9de72f43e9993b776534f13957';
const filename = 'recipes.json';

async function appendToFile(parsedRecipe) {
  // first read file
  const file = await fs.readFile(filename);
  const arr = JSON.parse(file);
  arr.push(parsedRecipe);
  await fs.writeFile(filename, JSON.stringify(arr));
}

async function parseRecipe(baseRecipe) {
  const scrapedRecipe = baseRecipe;
  const minutesToPrepare = scrapedRecipe.readyInMinutes;
  const numIngredients = scrapedRecipe.extendedIngredients.length;

  const numSteps = scrapedRecipe.analyzedInstructions[0].steps.length;
  const isEasy = (numSteps <= 5 && numIngredients <= 5 && minutesToPrepare <= 60);

  const parsedRecipe = {};
  parsedRecipe.id = crypto.randomBytes(16).toString('hex');
  parsedRecipe.title = scrapedRecipe.title;
  parsedRecipe.readyInMinutes = scrapedRecipe.readyInMinutes;
  parsedRecipe.servings = scrapedRecipe.servings;
  parsedRecipe.image = scrapedRecipe.image;
  parsedRecipe.uploader = 'From the Internet';
  parsedRecipe.isFromInternet = true;
  parsedRecipe.vegetarian = scrapedRecipe.vegetarian;
  parsedRecipe.vegan = scrapedRecipe.vegan;
  parsedRecipe.cheap = scrapedRecipe.cheap;
  parsedRecipe.glutenFree = scrapedRecipe.glutenFree;
  parsedRecipe.dairyFree = scrapedRecipe.dairyFree;
  parsedRecipe.quickEat = (minutesToPrepare > 30);
  parsedRecipe.fiveIngredientsOrLess = (numIngredients <= 5);
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
  appendToFile(parsedRecipe);
}

async function getRecipe() {
  await axios.get('https://api.spoonacular.com/recipes/random', {
    params: {
      apiKey: API_KEY,
    },
  })
    .then((response) => {
      parseRecipe(response.data);
    })
    .catch((error) => (error));
}

async function getBigJson() {
  const bigJson = await fs.readFile('scraper-util-recipe.json');
  const arr = JSON.parse(bigJson);
  const index = parseInt(process.argv[2], 10);
  parseRecipe(arr.results[index]);
}

const scrapingMode = 'big';

if (scrapingMode === 'remote') {
  getRecipe();
} else {
  getBigJson();
}
