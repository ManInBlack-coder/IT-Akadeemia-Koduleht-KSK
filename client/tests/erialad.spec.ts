import { test, expect } from '@playwright/test';

test.describe('Erialad Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/erialad');
        // Wait for initial page load
        await page.waitForLoadState('networkidle');
    });

    test('should display the erialad page with correct URL', async ({ page }) => {
        // Verify we're on the correct page
        await expect(page).toHaveURL('http://localhost:5173/erialad');
    });
    
    test('should display page heading', async ({ page }) => {
        // Check if the main heading is visible (using a loose selector that should work)
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
    });
    
    test('should have filter components', async ({ page }) => {
        // Check if there's at least one select element for filtering
        await page.waitForSelector('select');
        const selects = page.locator('select');
        const count = await selects.count();
        expect(count).toBeGreaterThan(0);
    });
});
