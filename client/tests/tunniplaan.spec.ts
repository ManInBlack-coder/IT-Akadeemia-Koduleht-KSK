import { test, expect } from '@playwright/test';

test.describe('Tunniplaan Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/tunniplaan');
    })

    test('should display the correct title and filter options', async ({ page }) => {

        // Check if the main title is present
        await expect(page.locator('h1')).toHaveText('Õppegruppide tunniplaanid ja õpperuumide plaanid');

        // Verify filter options are present
        await expect(page.locator('text=Vali tunniplaan')).toBeVisible();
        await expect(page.locator('text=Vali ruum')).toBeVisible();

        // wait for timetable data to load, so the filter is visible
        await page.waitForSelector('text=Vali tunniplaan');

        // Check if both select dropdowns are present
        const dropdowns = await page.locator('select').all();
        expect(dropdowns.length).toBe(2);
    });

    test('should load and display timetable data when group is selected', async ({ page }) => {

        // Wait for the group dropdown to be populated
        await page.waitForSelector('select');

        // Select the first actual group 
        await page.selectOption('select >> nth=0', { index: 1 });

        // Wait for the API request to complete and table to be rendered
        await page.waitForResponse(response => 
            response.url().includes('/veebilehe_andmed/tunniplaan') && 
            response.status() === 200
        );

        // Verify that the timetable is displayed
        await expect(page.locator('[data-testid="table"]')).toBeVisible();

        // Verify that the timetable title updates
        const titleText = await page.locator('text=Tunniplaan').first();
        await expect(titleText).toBeVisible();
    });
}); 