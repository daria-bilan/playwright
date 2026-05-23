import {test, expect} from "@playwright/test"

test.skip("Automating Form Submissions @githubAction", async({page})=>{
    await page.goto('https://demo.playwright.dev/todomvc/')

    const newToDO = page.getByPlaceholder('What needs to be done?')
    await newToDO.fill('John Doe')
    await newToDO.press('Enter')

    await newToDO.fill('JJ Doe')
    await newToDO.press('Enter')

    const firstToDo = page.getByTestId('todo-item').nth(0)
    await firstToDo.getByRole('checkbox').check()
    const secondToDo = page.getByTestId('todo-title').nth(1)

    await expect(firstToDo).toHaveClass('completed')
    await expect(secondToDo).not.toHaveClass('completed')
})

test.skip("Handling Form @githubAction", async({page})=>{
    await page.goto('https://demo.playwright.dev/todomvc/')
    await page.fill('[placeholder="What needs to be done?"]', "John Doe")
    await page.locator('[placeholder="What needs to be done?"]').press('Enter')

    const checkbox = await page.locator('.toggle')
    await checkbox.check()

})