import { test, expect } from '@playwright/test';

test.describe('Avaleht Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');
    });

    test('should display the home page with main title', async ({ page }) => {
        // Check if the page has loaded by verifying the main title is visible
        await expect(page.locator('h1').first()).toBeVisible();
        
        // Verify the page URL
        await expect(page).toHaveURL('http://localhost:5173/');
    });
    
    test('should have navigation buttons', async ({ page }) => {
        // Check if at least one button is present
        const buttons = page.locator('button');
        const count = await buttons.count();
        expect(count).toBeGreaterThan(0);
    });
});