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

describe('favorite a recipe', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/index.html`);
    });

    it('should navigate to recipe page and favorite recipe', async () => {
        await page.waitForSelector('recipe-card');
        const card = await page.evaluateHandle( () => document.querySelector("#recommendedRecipeContainer > recipe-card:nth-child(1)"));
        await card.click();

        await page.waitForSelector('recipe-card');
        const title = await page.evaluate( () => document.querySelector('#recipe-title').textContent);
        await expect(page.title()).resolves.toMatch(title);

        await page.click('#fav-icon');
    });
    

    it('should display favorite recipe in my account', async () => {
        await page.waitForSelector('body > header > custom-navbar');
        const accLink = await page.evaluateHandle( () => document.querySelector("body > header > custom-navbar").shadowRoot.querySelector("#account"));
        await accLink.click();

        await page.waitForSelector('body > main > div.FavoriteFood > recipe-card');
        const favs = await page.$$('body > main > div.FavoriteFood > recipe-card');
        expect(favs.length).toBe(1);
    });

    it('should navigate back to recipe page and unfavorite', async () => {
        const card = await page.evaluateHandle( () => document.querySelector("body > main > div.FavoriteFood > recipe-card"));
        await card.click();

        await page.waitForSelector('recipe-card');
        const title = await page.evaluate( () => document.querySelector('#recipe-title').textContent);
        await expect(page.title()).resolves.toMatch(title);

        await page.click('#fav-icon');
    });

    it('should remove recipe from my account', async () => {
        const accLink = await page.evaluateHandle( () => document.querySelector("body > header > custom-navbar").shadowRoot.querySelector("#account"));
        await accLink.click();

        await page.waitForSelector('body > main > div.FavoriteFood');
        const favs = await page.$$('body > main > div.FavoriteFood > recipe-card');
        expect(favs.length).toBe(0);
    });

})