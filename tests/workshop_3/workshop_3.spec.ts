import {test, expect} from '@playwright/test'

test.skip('Advanced Interactions', async({page})=>{
    await page.goto('file:///D:/Personal/Programming/Playwright/Playwright/tests/workshop_3/index.html');

    const buttonSelectorHover = 'button#hover-me';
    await page.hover(buttonSelectorHover);
    expect(await page.textContent(buttonSelectorHover)).toContain('Text Changed!');

    const buttonSelectorContextMenu = 'button#context-menu';
    await page.click(buttonSelectorContextMenu, {button:'right'});
    expect(await page.getByText('Context Menu Appears!').textContent()).toContain('Context Menu Appears!');

    const buttonSelectorDoubleClick = 'button#double-click';
    await page.dblclick(buttonSelectorDoubleClick);
    expect(await page.locator('img').count()).toBe(1);

    await page.waitForTimeout(3000);
})

test.skip('Drag and Drop', async({page})=>{
    await page.goto('file:///D:/Personal/Programming/Playwright/Playwright/tests/workshop_3/index.html');
    // await page.dragAndDrop('.drag-source', '.drop-target');
    // expect(await page.textContent('.drop-target')).toContain('Success');

    // await page.locator('.drag-source').hover();
    // await page.mouse.down();
    // await page.locator('.drop-target').hover();
    // await page.mouse.up();

    await page.waitForTimeout(3000);

})

test.only('Handling IFrame', async({page})=>{
    await page.goto('file:///D:/Personal/Programming/Playwright/Playwright/tests/workshop_3/index.html');
    const iframeElement = await page.frame({name: 'iframeName'});
    const inputSelector = '#iframe-input';

    if(iframeElement){
        await iframeElement.type(inputSelector, 'Hello Playwright');
        expect(await iframeElement.locator(inputSelector).inputValue()).toContain('Hello Playwright');
    }else{
        console.error('iframe is not available');
    }
    
    await page.waitForTimeout(3000);

})
