const fs = require('fs').promises;

async function minimizeJson(factor, filename) {
  const file = await fs.readFile(filename);
  const arr = JSON.parse(file);

  const returnArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (i % factor === 0) {
      returnArr.push(arr[i]);
    }
  }
  const newFilename = `${filename}_${factor}.json`;
  await fs.writeFile(newFilename, JSON.stringify(returnArr));
}

minimizeJson(3, 'recipes.json');
