import { test, expect } from '@playwright/test'

test.describe('Dynamic table', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://qaplayground.dev/apps/dynamic-table/')
    })
    test.skip('Find spider-man real name', async({page})=>{
        await expect(page.locator('text=SUPERHERO')).toBeVisible()

        const expectedRealName = 'Peter Parker'

        const row = await page.locator('text="Spider-Man" >> xpath=../../../..')
        const realName = await row.locator("td").nth(2)

        await expect(realName).toHaveText(expectedRealName)

    })

    test.skip('Find Black Widow status', async({page})=>{
        await expect(page.locator('text=SUPERHERO')).toBeVisible()

        const expectedStatus = 'Active'

        const row = await page.locator('text="Black Widow" >> xpath=../../../..')
        const currentStatus = await row.locator("td").nth(1)

        await expect(currentStatus).toHaveText(expectedStatus)
    })

})

