import { test, expect } from '@playwright/test';

test.describe('Praktika page', () => {
    test.beforeEach(async ({ page }) => {
        // navigate to the praktika page before each test
        await page.goto('http://localhost:5173/praktika');
    })

    test('Should display the correct title', async ({ page }) => {
        // wait for the title to be visible
        await expect(page.locator('h1')).toHaveText('PRAKTIKAVÕIMALUSED IT AKADEEMIAS');
    })

    test('Should navigate to the erasmus section when the button is clicked', async ({ page }) => {
        // find the button and click it
        await page.getByText('Uuri lisaks').click();
        // wait for the title to be visible
        await expect(page.getByRole('heading', { name: 'Võimalused välispraktikaks' })).toBeVisible();
    })

    test('Links should should have href attributes in the links section', async ({ page }) => {
        // find all the anchor tags
        const links = await page.locator('a').all();
        // check if each anchor tag has an href attribute
        for (const link of links) {
            await expect(link).toHaveAttribute('href');
        }
    })
})
