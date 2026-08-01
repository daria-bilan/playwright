import { test, expect, Locator } from '@playwright/test';

// useless code, just for test
enum Environment {
   QA = 'https://qa.example.com',
   Staging = 'https://staging.example.com',
   Prod = 'https://prod.example.com',
}

type UserRole = 'QA' | 'Staging' | 'Prod';

function runTest(env: string) {
   return `run test on ${env} environment`;
}

test('non runnable test', async ({ page }) => {
   for (let stage of Object.values(Environment)) {
      runTest(stage);
   }
});
