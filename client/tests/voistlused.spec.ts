import { test, expect } from '@playwright/test';

test.describe('Voistlused Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/voistlused');
    })
})

