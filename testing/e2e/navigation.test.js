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

describe('navigate through pages', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/index.html`);
    });

    it('home page should be titled Home', async () => {
        await expect(page.title()).resolves.toMatch('Home');
    });

    it('home page header should be Rocket Recipes', async () => {
        await page.waitForSelector('body > main > div > h1');
        const header = await page.evaluate( () => document.querySelector('body > main > div > h1').textContent);
        expect(header).toBe('Rocket Recipes');
    });

    it('home page should have 8 recommended recipes', async () => {
        await page.waitForSelector('recipe-card');
        const recipes = await page.$$('recipe-card');
        expect(recipes.length).toBe(8);
    });

    it('navigate to Account page', async () => {
        const accLink = await page.evaluateHandle( () => document.querySelector("body > header > custom-navbar").shadowRoot.querySelector("#account"));
        await accLink.click();
    });

    it('account page should be titled My Account', async () => {
        await page.waitForNavigation();
        await expect(page.title()).resolves.toMatch('My Account');
    });

    it('account page header should be My Account', async () => {
        const header = await page.evaluate( () => document.querySelector('#myaccount').textContent);
        expect(header).toBe('My Account');
    });

    it('navigate to Create Recipe page', async () => {
        const searchLink = await page.evaluateHandle( () => document.querySelector("body > header > custom-navbar").shadowRoot.querySelector("#create"));
        await searchLink.click();
    });

    it('create recipe page should be titled Create Recipe', async () => {
        await page.waitForNavigation();
        await expect(page.title()).resolves.toMatch('Create Recipe');
    });

    it('create recipe page header should be Create your recipe:', async () => {
        const header = await page.evaluate( () => document.querySelector('#header').textContent);
        expect(header).toBe('Create your recipe:');
    });

    it('navigate to Search page', async () => {
        const searchLink = await page.evaluateHandle( () => document.querySelector("body > header > custom-navbar").shadowRoot.querySelector("#search"));
        await searchLink.click();
    });

    it('search page should be titled Search', async () => {
        await page.waitForNavigation();
        await expect(page.title()).resolves.toMatch('Search');
    });

    it('search page header should be Find Recipes', async () => {
        const header = await page.evaluate( () => document.querySelector('body > main > div > div.title > h1').textContent);
        expect(header).toBe('Find Recipes');
    });

    it('search bar renders', async () => {
        const searchBar = await page.evaluate( () => document.querySelector('body > main > div > div.bar'));
        expect.anything(searchBar);
    });

    it('navigate to search results', async () => {
        const form = await page.evaluateHandle( () => document.querySelector("body > main > div > div.bar > custom-searchbar").shadowRoot.querySelector("#search-bar-form"));
        await form.focus();
        await form.type('#ss', 'egg');

        const but = await page.evaluateHandle( () => document.querySelector("body > main > div > div.bar > custom-searchbar").shadowRoot.querySelector("#search-bar-form > button > a"));
        await but.click();
    });

    it('navigate to Recipe page', async () => {
        await page.waitForSelector('recipe-card');
        const card = await page.evaluateHandle( () => document.querySelector("#search-results-container > recipe-card:nth-child(1)").shadowRoot.querySelector("article > div"));
        await card.click();
    });

    it('recipe page should be titled the recipe title', async () => {
        await page.waitForSelector('#recipe-title');
        const title = await page.evaluate( () => document.querySelector('#recipe-title').textContent);
        await expect(page.title()).resolves.toMatch(title);
    });
})