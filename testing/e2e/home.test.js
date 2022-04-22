let rootUrl = '127.0.0.1:5501';
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

      describe('home page', () => {
        beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/index.html`);
      });

      it('should be titled Home page', async () => {
        await expect(page.title()).resolves.toMatch('Home');
      });

      it('headline should be rocket recipes', async () => {
        await page.waitForSelector('body > main > div > h1');
        const headline = await page.evaluate( () => document.querySelector('body > main > div > h1').textContent);
        expect(headline).toBe('Rocket Recipes');
      });

      it('should have 8 recommended recipes', async () => {
        await page.waitForSelector('recipe-card');
        const recipes = await page.$$('recipe-card');
        expect(recipes.length).toBe(8);
      });
})