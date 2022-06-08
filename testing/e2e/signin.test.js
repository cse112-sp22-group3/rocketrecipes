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

describe('signin', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/entry.html`);
    });

    it('goes to login section', async () => {
        await page.click('#login');
        await page.waitForTimeout(500);
    });

    it('fill out info and login', async () => {
        await page.type('#loginEmail', 'tester@test.com');
        await page.type('#loginPassword', 'password');

        await page.click('body > div.form-structor > div.login > div > button');
    });

    it('redirect to home page', async () => {
        await page.waitForSelector('recipe-card');
        await expect(page.title()).resolves.toMatch('Home');
    });

})