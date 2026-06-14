import { test, expect, Locator } from '@playwright/test'

test.describe('Tags input', ()=>{
    test.beforeEach(async({page})=>{
        await page.goto('https://qaplayground.dev/apps/tags-input-box/')
    })

    async function deleteAlltags(tags: Locator){
        const count = await tags.count()
        for(let i: number = 0; i < count; i++){
            await tags.first().locator('i').click()
        }
    }

    async function addNewTag(inputLocator: Locator, count: number){
        for(let i: number = 0; i < count; i++){
            await inputLocator.fill(`${i}t`)
            await inputLocator.press('Enter')
        }
    }

    test.skip('Check block is visible', async({page})=>{
        const expectTitle = 'Tags'
        const expectContentText = 'Press enter or add a comma after each tag'
        const extectDetailsDefaultTagsNumber = 8
        const expectDetailsText = ' tags are remaining'
        const expectButtonText = 'Remove All'

        await expect(page.locator('.title')).toBeVisible()
        expect(page.locator('.title')).toHaveText(expectTitle)
        expect(page.locator('.content > p')).toHaveText(expectContentText)
        await expect(page.locator('div.content > ul')).toBeVisible()
        expect(page.locator('.details > p')).toHaveText(extectDetailsDefaultTagsNumber.toString() + expectDetailsText)
        expect(page.locator('button')).toHaveText(expectButtonText)

    })

    test.skip('Delete default tags', async({page})=>{
        await expect(page.locator('.title')).toBeVisible()
        const tags = page.locator('.content li')
        await expect(tags).toHaveCount(2)
        await deleteAlltags(tags)
        await expect(tags).toHaveCount(0)
        expect(page.locator('.details > p > span')).toHaveText('10')
    })

    test.skip('Add new tag', async({page})=>{
        const inputLocator = await page.locator('.content > ul > input')
        await expect(inputLocator).toBeVisible()
        await addNewTag(inputLocator, 1)
        const tags = page.locator('.content li')
        await expect(tags).toHaveCount(3)
        await expect(page.locator('.details > p > span')).toHaveText('7')
    })

    test.only('Excede remaining tags', async({page})=>{
        const inputLocator = await page.locator('.content > ul > input')
        await expect(inputLocator).toBeVisible()
        const tags = page.locator('.content li')
        await deleteAlltags(tags)

        await addNewTag(inputLocator, 10)
        await expect(tags).toHaveCount(10)
        await expect(page.locator('.details > p > span')).toHaveText('0')

    })
})