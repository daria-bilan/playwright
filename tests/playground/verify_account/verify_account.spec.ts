import { test, expect } from '@playwright/test'

test.describe('Account verification', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://qaplayground.dev/apps/verify-account/')
    })

    test.skip('Check verify block', async({page})=>{
        await expect(page.locator('.container')).toBeVisible()
        const expectedTitle = 'Verify Your Account'
        const expectedBodyText = 'We emailed you the six digit code to cool_guy@email.com\nEnter the code below to confirm your email address.'
        
        expect(page.locator('#title')).toHaveText(expectedTitle)
        expect(page.locator('#msg')).toHaveText(expectedBodyText)

        const codeContainer = await page.locator('.code-container')
        await expect(codeContainer).toBeVisible()
        const expectedAmountOfNumbers = 6
        const actualAmountOfNumbers = await codeContainer.locator('input.code').count()

        expect(actualAmountOfNumbers).toBe(expectedAmountOfNumbers)

        const confCode = await page.locator('small.info')
        const expectedText = ' The confirmation code is 9-9-9-9-9-9 '
        expect(confCode).toBeVisible()
        expect(confCode).toHaveText(expectedText)
    })

    test.skip('Input invalid code', async({page})=>{
        await expect(page.locator('.container')).toBeVisible()
        const codeContainer = await page.locator('.code-container')
        await expect(codeContainer).toBeVisible()

        for(let i: number = 0; i < 6; i++){
            await codeContainer.locator('input.code').nth(i).fill('1')
        }
        await codeContainer.press('Enter')
        
        const successContainer = await page.locator('.container > .infosuccess')
        expect(successContainer).not.toBeVisible()
    })

    test.skip('Input valid code', async({page})=>{
        await expect(page.locator('.container')).toBeVisible()
        const codeContainer = await page.locator('.code-container')
        await expect(codeContainer).toBeVisible()

        for(let i: number = 0; i < 6; i++){
            await codeContainer.locator('input.code').nth(i).fill('9')
        }
        await codeContainer.press('Enter')
        
        await page.waitForTimeout(3000)
        const successContainer = await page.locator('div[class="container"] > small[class="info success"]')
        expect(successContainer).toBeVisible()
        expect(successContainer).toHaveText('Success')
        await page.waitForTimeout(3000)
    })
})