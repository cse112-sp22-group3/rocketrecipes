const recipe = {
  id: '33f872aa-a7d9-4ed9-bc45-e81cbafb3cfc',
  title: 'Recipe Title',
  readyInMinutes: 40,
  servings: 4,
  image: 'https://someimageurl.com/image.jpg',
  uploader: 'username1',
  vegetarian: true,
  vegan: true,
  cheap: true,
  glutenFree: false,
  dairyFree: true,
  quickEat: false,
  fiveIngredientsOrLess: true,
  breakfast: false,
  lunch: false,
  dinner: true,
  ingredients: [
    {
      name: 'Ingredient 1',
      amount: 1,
      unit: 'cups',
    },
    {
      name: 'Ingredient 2',
      amount: 2,
      unit: 'tablespoon',
    },
    {
      name: 'Ingredient 3',
      amount: 4,
      unit: 'teaspoon',
    },
  ],
  summary: 'Description string',
  steps: [
    {
      number: 1,
      description: 'Description of step 1',
      length: {
        number: 30,
        unit: 'minutes',
      },
    },
    {
      number: 2,
      description: 'Description of step 2',
      length: {
        number: 30,
        unit: 'minutes',
      },
    },
    {
      number: 3,
      description: 'Description of step 3',
      length: {
        number: 30,
        unit: 'minutes',
      },
    },
  ],
};

const recipeArr = [];

for (let i = 0; i < 10000; i += 1) {
  const obj = JSON.parse(JSON.stringify(recipe));
  recipeArr.push(obj);
}

for (let i = 0; i < 10000; i += 1) {
  const rand = Math.floor(Math.random() * 10);
  // console.log(rand);
  if (rand >= 6) {
    recipeArr[i].id = '6c0fbd61-1f35-40c7-a1d3-03506163aadb';
    recipeArr[i].lunch = true;
    recipeArr[i].fiveIngredientsOrLess = true;
    recipeArr[i].vegan = true;
    recipeArr[i].vegetarian = true;
    recipeArr[i].glutenFree = true;
    recipeArr[i].dairyFree = true;
    recipeArr[i].quickEat = true;
    recipeArr[i].breakfast = true;
    recipeArr[i].cheap = true;
    recipeArr[i].title = 'random title';
  }
}

const resultArr = [];
// console.log('starting search');
// example search
for (let i = 0; i < 10000; i += 1) {
  // console.log(recipeArr[i].id);

  if (recipeArr[i].title.includes('tle')) {
    resultArr.push(recipeArr[i]);
  }
}

// console.log(resultArr.length);
