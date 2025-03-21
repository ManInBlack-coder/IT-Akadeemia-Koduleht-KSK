import { test, expect } from '@playwright/test';

test.describe('Tunniplaan Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/tunniplaan');
    })

    test('should fetch data from the API', async ({ page }) => {
        // chooses a class from the dropdown
        await page.getByText('Vali tunniplaan').click();
        await page.getByRole('option', { name: "ITA23"}).click();    
        await page.getByText('Tunniplaan').click();

        const fetchedTable = await page.getByRole('table').first().locator('tbody');
        const tableRows = await fetchedTable.locator('tr').count();
        expect(tableRows).toBeGreaterThan(0);
    }); 

    test('should display the correct title and filter options', async ({ page }) => {
    
    });

    test('should load and display timetable data when group is selected', async ({ page }) => {
    
    });
}); 