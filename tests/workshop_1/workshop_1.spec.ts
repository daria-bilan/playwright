import {Page, test} from  'playwright/test'

test.skip('Basic Navigation', async ({page})=>{
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(3000);
    await page.reload();
})

test.skip('Interaction with Web Elements on GitLab', async ({page})=>{
    await page.goto('https://gitlab.com/');
    const button = page.locator('[data-ga-name="free trial"]');
    await button.first().click();
    // await page.locator('[data-testid="new-user-first-name-field"]').fill('John');
    // await page.locator('[data-testid="new-user-last-name-field"]').fill('Smith');
    await page.getByTestId('new-user-first-name-field').fill('John');
    await page.getByTestId('new-user-last-name-field').fill('Smith');
})

test.skip('Using Various Locator Methods', async ({page})=>{
    await page.setViewportSize({width: 1000, height: 1360});
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(1000);
    // const menu = page.getByRole('button', {name: 'Main Menu'});
    // await menu.click();
    // await page.getByRole('link', {name: 'Sign in'}).click();
    await page.click(':has-text("Sign in")');
    await page.waitForTimeout(3000);
})
