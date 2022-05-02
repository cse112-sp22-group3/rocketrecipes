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

describe('my account page', () => {
    beforeAll(async () => {
    await page.goto(`http://${rootUrl}/root/html/generalAccount.html`);
    });

    it('should be titled my account', async () => {
    await expect(page.title()).resolves.toMatch('My Account');
    });

    it('headline should be my account', async () => {
    await page.waitForSelector('#myaccount');
    const headline = await page.evaluate( () => document.querySelector('#myaccount').textContent);
    expect(headline).toBe('My Account');
    });
});