import {test, expect} from "@playwright/test"

const testData = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main ST',
    number: '23324820423',
}



test.describe('User Registration Test', ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('file:///D:/Personal/Programming/Playwright/Playwright/tests/workshop_6/index.html')
    });

    test.only('Register with a valid data', async({page})=>{
        await page.fill('#firstName',testData.firstName)
        await page.fill('#lastName', testData.lastName)
        await page.fill('#address', testData.address)
        await page.fill('#number', testData.number)
        await page.click('#register') //button
        await page.waitForTimeout(2000)

        const firstNameText = await page.locator('#displayFirstName').textContent()
        const LastNameText = await page.locator('#displayLastName').textContent()
        const addressText = await page.locator('#displayAddress').textContent()
        const numberText = await page.locator('#displayNumber').textContent()
        await page.waitForTimeout(2000)

        await expect(firstNameText).toEqual(testData.firstName)
        await expect(LastNameText).toEqual(testData.lastName)
        await expect(addressText).toEqual(testData.address)
        await expect(numberText).toEqual(testData.number)
    });

    test.only('Register with empty fields', async({page})=>{
        await page.fill('#firstName',testData.firstName)
        await page.fill('#lastName', testData.lastName)
        await page.click('#register')
        const error = await page.locator('#error p').textContent()

        expect(error).toBe('Please fill in all fields.')
    });

    test.only('Register with all empty fields', async({page})=>{
        await page.click('#register')
        const error = await page.locator('#error p').textContent()

        expect(error).toBe('Please fill in all fields.')
    })
})
