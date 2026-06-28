import { test, expect, Locator, chromium } from '@playwright/test';

test.describe('HTML elements', () => {
   // test.beforeEach(async ({ page }) => {
   //    await page.goto('https://rozetka.com.ua/');
   // });

   test('Autosuggested dropdown', async ({ page }) => {
      // ✅ 1. always start with goto
      await page.goto('https://rozetka.com.ua/ua/');
      await page.waitForLoadState('networkidle');

      // ✅ 2. check what frames exist AFTER page loads
      const frames = page.frames();
      frames.forEach((frame) => console.log('frame:', frame.url(), frame.name()));

      // ✅ 3. type into the search input directly on page (not iframe — we haven't confirmed it's in one)
      const searchInput = page.locator('[data-testid="search-suggest-input"]');
      await searchInput.click();
      await page.waitForTimeout(500);
      await searchInput.pressSequentially('smart', { delay: 200 });

      // ✅ 4. wait for suggestions to appear
      await page.waitForSelector('[data-testid="search-suggest-records"]', { state: 'attached', timeout: 10000 });

      // ✅ 5. correct locator syntax + await on count()
      const count = await page.locator('[data-testid="search-suggest-records"] li').count();
      console.log('Suggestions count:', count);

      // ✅ 6. correct matcher
      expect(count).toBe(9);
   });

   test('Rozetka search suggestions', async () => {
      // launch with anti-detection settings
      const browser = await chromium.launch({
         headless: false, // headed mode is less detectable
         args: ['--disable-blink-features=AutomationControlled'],
      });

      const context = await browser.newContext({
         // spoof real Chrome user agent
         userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
         viewport: { width: 1280, height: 720 },
         locale: 'uk-UA',
      });

      const page = await context.newPage();

      // hide navigator.webdriver — the most obvious bot signal
      await page.addInitScript(() => {
         Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      });

      await page.goto('https://rozetka.com.ua/ua/');
      await page.waitForLoadState('networkidle');

      // type naturally with delays
      const searchInput = page.locator('[data-testid="search-suggest-input"]');
      await searchInput.click();
      await page.waitForTimeout(800);
      await searchInput.pressSequentially('smart', { delay: 150 });

      // wait for suggestions
      await page.waitForSelector('[data-testid="search-suggest-records"]', { state: 'attached', timeout: 10000 });

      // count and log
      const count = await page.locator('[data-testid="search-suggest-records"] li').count();
      console.log('Suggestions count:', count);

      await browser.close();
   });
});
