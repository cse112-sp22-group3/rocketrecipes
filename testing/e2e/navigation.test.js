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

    it('home page should have 1 recommended recipes', async () => {
        await page.waitForSelector('recipe-card');
        const recipes = await page.$$('recipe-card');
        expect(recipes.length).toBe(8);
    });

    it('navigate to Account page', async () => {
        await page.goto(`http://${rootUrl}/root/html/generalAccount.html`);
    });

    it('account page should be titled My Account', async () => {
        await page.waitForSelector('#myaccount');
        await expect(page.title()).resolves.toMatch('My Account');
    });

    it('account page header should be My Account', async () => {
        const header = await page.evaluate( () => document.querySelector('#myaccount').textContent);
        expect(header).toBe('My Account');
    });

    it('navigate to Create Recipe page', async () => {
        await page.goto(`http://${rootUrl}/root/html/CreateRecipe.html`);
    });

    it('create recipe page should be titled Create Recipe', async () => {
        await page.waitForSelector('#header');
        await expect(page.title()).resolves.toMatch('Create Recipe');
    });

    it('create recipe page header should be Create your recipe:', async () => {
        const header = await page.evaluate( () => document.querySelector('#header').textContent);
        expect(header).toBe('Create your recipe:');
    });

    it('navigate to Search page via empty search', async () => {
        await page.goto(`http://${rootUrl}/root/html/searchpage.html?searchQuery=`);
    });

    it('search page should be titled Search', async () => {
        await page.waitForSelector('.title');
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
        await page.goto(`http://${rootUrl}/root/html/searchpage.html?searchQuery=deviled%20eggs`);
    });
})