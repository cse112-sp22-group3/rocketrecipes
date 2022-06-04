let rootUrl = 'rocketrecipesv2.netlify.app';
const pullRequestId = process.env.GITHUB_PR_NUMBER;

beforeAll(async () => {
    if(pullRequestId) {
      console.log("PR: " + pullRequestId);
      rootUrl = `deploy-preview-${pullRequestId}--rocketrecipesv2.netlify.app`;
    }
    else if(process.env.GITHUB_REF) {
      rootUrl = `rocketrecipesv2.netlify.app`;
    }
    else {
      console.log('not in pr');
    }

});
rootUrl = 'deploy-preview-73--rocketrecipesv2.netlify.app';

describe('create own recipe', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/createrecipe`);
    });

    it('should add recipe ingredients', async () => {
        await page.click('#addIngredient');
        await page.type('#amount1', '1');
        await page.type('#units1', 'cup');
        await page.type('#ing1', 'Ingredient');

        await page.click('#addIngredient');
        await page.type('#amount2', '1');
        await page.type('#units2', 'cup');
        await page.type('#ing2', 'Ingredient');

        await page.click('#addIngredient');
        await page.type('#amount3', '1');
        await page.type('#units3', 'tbs');
        await page.type('#ing3', 'Ingredient');

        const ingredients = await page.$$('.Ingredient');
        expect(ingredients.length).toBe(3);
    });

    it('should delete recipe ingredients', async () => {
        await page.click('#deleteIngredient');
        const ingredients = await page.$$('.Ingredient');
        expect(ingredients.length).toBe(2);
    });

    it('should add recipe instructions', async () => {
        await page.click('#plus');
        await page.type('#Step1', 'Step 1');

        await page.click('#plus');
        await page.type('#Step2', 'Step 2');

        await page.click('#plus');
        await page.type('#Step3', 'Step 3');

        const steps = await page.$$('.step');
        expect(steps.length).toBe(3);
    });

    it('should delete recipe instructions', async () => {
        await page.click('#Delete');
        const steps = await page.$$('.step');
        expect(steps.length).toBe(2);
    });

    it('should create new recipe', async () => {
        await page.type('#name', 'Recipe Name Example');
        await page.type('.descrip', 'Example Description');
        await page.type('#serving', '3');
        await page.type('#time', '30');

        await page.click('#Create');
    });

    it('should direct to recipe page', async () => {

        await page.waitForSelector('recipe-card');
        await expect(page.title()).resolves.toMatch('Recipe Name Example');
    });

})