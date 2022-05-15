let rootUrl = '127.0.0.1:5500';
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

      describe('search page', () => {
        beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/SearchPage.html`);
      });

      it('should be titled search page', async () => {
        await expect(page.title()).resolves.toMatch('Search');
      });

      it('headline should be find recipes', async () => {
        await page.waitForSelector('body > main > div > div.title > h1');
        const headline = await page.evaluate( () => document.querySelector('body > main > div > div.title > h1').textContent);
        expect(headline).toBe('Find Recipes');
      });

      it('search bar renders', async () => {
        const searchBar = await page.evaluate( () => document.querySelector('body > main > div > div.bar'));
        expect.anything(searchBar);
      });

      it('recipe results page should render', async () => {
        const firstPageResult = await page.evaluate( () => document.getElementById('page1'));
        expect.anything(firstPageResult);
      })
})