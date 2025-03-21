import { test, expect } from '@playwright/test';

test.describe('Konsultatsioonid Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/konsultatsioonid');
    });

 
  
    test('should handle filter selections correctly', async ({ page }) => {
        // Oota kuni leht on laetud
        await page.waitForLoadState('networkidle');
        
        // Oota kuni õpetajate valik on nähtav
        const teacherSelect = page.locator('select').first();
        await teacherSelect.waitFor();
        
        // Oota kuni õpetajate nimekirjas on valikuid
        await expect(async () => {
            const options = await teacherSelect.locator('option').all();
            expect(options.length).toBeGreaterThan(1);
        }).toPass({ timeout: 10000 });
        
        // Vali esimene õpetaja
        await teacherSelect.selectOption({ index: 7 });
        
        // Proovi valida kuupäev, kui see on saadaval
        const dateSelect = page.locator('select').nth(1);
        try {
            await dateSelect.waitFor({ timeout: 2000 });
            const dateOptions = await dateSelect.locator('option').all();
            if (dateOptions.length > 1) {
                await dateSelect.selectOption({ index: 1 });
                
                // Proovi valida aeg, kui see on saadaval
                const timeSelect = page.locator('select').nth(2);
                await timeSelect.waitFor({ timeout: 2000 });
                const timeOptions = await timeSelect.locator('option').all();
                if (timeOptions.length > 1) {
                    await timeSelect.selectOption({ index: 1 });
                }
            }
        } catch {
            // Kui kuupäeva valikut ei leitud, jätkame ilma selleta
            console.log('Kuupäeva valikut ei leitud või see oli tühi');
        }
        
        // Kliki otsingunuppu
        const searchButton = page.getByRole('button', { name: 'Otsi' });
        await searchButton.click();
        
        // Oota tulemusi
        await page.waitForLoadState('networkidle');
        
        // Kontrolli tulemusi
        try {
            await page.locator('.table').waitFor({ timeout: 5000 });
            await expect(page.locator('.table')).toBeVisible();
        } catch {
            await expect(page.getByText('Valitud filtritega konsultatsioone ei leitud.')).toBeVisible();
        }
    });



    test('should allow filter reset', async ({ page }) => {
        // Vali konkreetne õpetaja
        await page.selectOption('select:first-of-type', { label: 'Abel, Vallo' });
        
        // Kliki otsingunuppu
        await page.getByRole('button', { name: 'Otsi' }).click();
        
        // Kliki filtrite tühistamise nuppu
        await page.getByRole('button', { name: 'Tühista filtrid' }).click();
        
        // Kontrolli, et filtrid on tühjad
        await expect(page.getByRole('combobox').nth(0)).toHaveValue('');
        await expect(page.getByRole('combobox').nth(1)).toHaveValue('');
        await expect(page.getByRole('combobox').nth(2)).toHaveValue('');
    });



    test('should handle empty search results', async ({ page }) => {
        // Vali õpetaja ja kuupäev, mis tõenäoliselt ei anna tulemusi
        await page.selectOption('select:first-of-type', { label: 'Abel, Vallo' });
        await page.getByRole('button', { name: 'Otsi' }).click();
        
        // Kontrolli, kas tühjade tulemuste teade on nähtav
        await expect(page.getByText('Valitud filtritega konsultatsioone ei leitud.')).toBeVisible();
    });
});
