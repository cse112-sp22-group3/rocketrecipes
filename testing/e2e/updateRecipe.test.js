let rootUrl = 'deploy-preview-104--rocketrecipesv2.netlify.app';
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

describe('update a recipe', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/recipepage?id=351db6dbd7ba969a883b4c01e701f580`);
    });

    it('edit a recipe', async () => {
        await page.waitForSelector('recipe-card');

        await page.click('#editButton');
    });

    it('direct to edit page', async () => {
        await page.waitForTimeout(1000);
        const header = await page.evaluate( () => document.querySelector('#header').textContent);
        expect(header).toBe('Edit Your Recipe!');
    });

    it('make edits', async () => {
        await page.click('#deleteIngredient');
        await page.click('#Delete');

        await page.click('#deleteIngredient');
        await page.click('#Delete');

        await page.type('#name', 'NEW')
    });

    it('direct to new recipe page', async () => {
        await page.click('#edit-button');

        await page.waitForSelector('recipe-card');

        const header = await page.evaluate( () => document.querySelector('#recipe-title').textContent);
        expect(header).toBe('Brussels Sprouts with Bacon and ShallotsNEW');
    });

})