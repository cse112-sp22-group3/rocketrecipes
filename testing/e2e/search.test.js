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

describe('search a recipe', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/searchpage.html?searchQuery=`);
    });

    it('allow user input search', async () => {
        const searchBar = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("#ss"));
        await searchBar.type('deviled eggs');

        const searchButt = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("#search-bar-form > button"));
        await searchButt.click();

        await page.waitForSelector('recipe-card');

        const header = await page.evaluate( () => document.querySelector('#searchHeader').textContent);
        expect(header).toBe('23  recipes found for deviled eggs, page 1 of results');
    });

    it('add ing to search', async () => {
        const ingFilter = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("div > button"));
        await ingFilter.click();

        const addIng = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("#ingredients-included"));
        await addIng.type('paprika');

        const searchButt = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("#search-bar-form > button"));
        await searchButt.click();

        await page.waitForSelector('recipe-card');

        const header = await page.evaluate( () => document.querySelector('#searchHeader').textContent);
        expect(header).toBe('3  recipes found for deviled eggs including paprika, page 1 of results');
    });

    it('remove ing from search', async () => {
        const ingFilter = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("div > button"));
        await ingFilter.click();

        const removeIng = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("#ingredients-excluded"));
        await removeIng.type('yogurt');

        const searchButt = await page.evaluateHandle(() => document.querySelector("#searchbar").shadowRoot.querySelector("#search-bar-form > button"));
        await searchButt.click();

        await page.waitForSelector('recipe-card');

        const header = await page.evaluate( () => document.querySelector('#searchHeader').textContent);
        expect(header).toBe('2  recipes found for deviled eggs including paprika excluding yogurt, page 1 of results');
    });

})