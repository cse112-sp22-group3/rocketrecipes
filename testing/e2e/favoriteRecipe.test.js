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

    it('should remove recipe from my account', async () => {
        const accLink = await page.evaluateHandle( () => document.querySelector("body > header > custom-navbar").shadowRoot.querySelector("#account"));
        await accLink.click();

        await page.waitForSelector('body > main > div.FavoriteFood');
        const favs = await page.$$('body > main > div.FavoriteFood > recipe-card');
        expect(favs.length).toBe(0);
    });

})