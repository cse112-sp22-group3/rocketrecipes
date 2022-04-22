let rootUrl = 'rocketrecipes.netlify.app';
const pullRequestId = process.env.GITHUB_PR_NUMBER;

beforeAll(async () => {
    if(pullRequestId) {
      console.log("PR: " + pullRequestId);
      rootUrl = `deploy-preview-${pullRequestId}--rocketrecipes.netlify.app`;
    }
    else if(process.env.GITHUB_REF) {
      rootUrl = `rocketrecipes.netlify.app`;
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
})