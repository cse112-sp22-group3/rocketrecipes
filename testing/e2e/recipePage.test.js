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
    describe('recipe page', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/index.html`);
        const recipeId = await page.evaluate( () => {
            const recipes = JSON.parse(localStorage.getItem('allRecipes'));
            return recipes[0].id;
        });
        await page.goto(`http://${rootUrl}/root/html/recipePage.html?id=${recipeId}`);
    });

      it('should be titled the recipe title', async () => {
        await page.waitForSelector('#recipe-title');
        const title = await page.evaluate( () => document.querySelector('#recipe-title').textContent);
        await expect(page.title()).resolves.toMatch(title);
      });
})