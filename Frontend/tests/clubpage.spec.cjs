import { test, expect } from '@playwright/test';

test.describe('ClubPage Component', () => {
  test('should load the club page correctly and display navigation links', async ({ page }) => {
   // Mock localStorage to set the clubId
    await page.addInitScript(() => {
      localStorage.setItem('selectedClubId', '66e65f99ce5e15b195f2caec');
    });

    // Navigate to the club page
    await page.goto('/club/66e65f99ce5e15b195f2caec');

    // Ensure the page loads by checking for the main club section
    await expect(page.locator('h1')).toBeVisible(); // Club name should be visible

    // Check if navigation links are visible
    await expect(page.locator('text=Events')).toBeVisible();
    await expect(page.locator('text=Workshops')).toBeVisible();
    await expect(page.locator('text=Committee')).toBeVisible();
    await expect(page.locator('text=Join Club')).toBeVisible();

    // Ensure no error messages are displayed
    await expect(page.locator('body')).not.toContainText('Error');
  });
});
