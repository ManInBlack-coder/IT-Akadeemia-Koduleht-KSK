import { test, expect } from '@playwright/test';

test.describe('Voistlused Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/voistlused');
    });

    test('Should display main elements and headings', async ({ page }) => {
        await expect(page.locator('h1.text-heading3-bold').first()).toBeVisible();

        await expect(page.locator('h1:has-text("Kutsevõistlus \\"Aasta Tegija\\"")').first()).toBeVisible();

        await expect(page.locator('h2:has-text("Noor meister")').first()).toBeVisible();

        await expect(page.locator('div.bg-black', { hasText: 'AEG JA KOHT' }).first()).toBeVisible();
        await expect(page.locator('div.bg-black', { hasText: 'VÕISTLUS JA ÜLESANNE' }).first()).toBeVisible();
        await expect(page.locator('div.bg-black', { hasText: 'VÕITJAD' }).first()).toBeVisible();
    });

    test('Should display and handle carousel', async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 768 });
        
        await page.waitForLoadState('networkidle');

        const aastaTegijaPildid = page.locator('h2:has-text("Kutsevõistlus \\"Aasta Tegija\\"") ~ div .flex.justify-center img');
        await expect(aastaTegijaPildid).toHaveCount(3);

        const prevButton = page.locator('button[aria-label="Eelmine pilt"]').first();
        const nextButton = page.locator('button[aria-label="Järgmine pilt"]').first();
        
        await expect(prevButton).toBeVisible();
        await expect(nextButton).toBeVisible();

        const firstImage = await aastaTegijaPildid.first().getAttribute('src');
        await nextButton.click();
        await page.waitForTimeout(500);
        const newFirstImage = await aastaTegijaPildid.first().getAttribute('src');
        expect(firstImage).not.toBe(newFirstImage);
    });


    test('Should get information about the competitions', async ({ page }) => {
        await expect(page.getByText('Noorematarkvaraarendaja', { exact: true })).toBeVisible();
        
        await expect(page.getByText('UX/UI disaineri kutsevõistlus', { exact: true })).toBeVisible();
        
        await expect(page.getByText('IT-süsteemide spetsialist', { exact: true })).toBeVisible();
    });
});

