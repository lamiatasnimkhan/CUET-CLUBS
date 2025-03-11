import { test, expect } from '@playwright/test';

test.describe('Website Admin Dashboard', () => {
  test('should load the website admin dashboard correctly', async ({ page }) => {
    // Navigate to the Website Admin Dashboard
    await page.goto('/websiteadmin'); // Update the URL if needed

    // Check if the heading "Website Administration" appears
    await expect(page.locator('h1')).toHaveText('Website Administration');

    // Check if the "Pending Club Registrations" section is visible
    // await expect(page.locator('h2.text-lg font-medium text-gray-900 mb-4')).toHaveText('Pending Club Registrations');

    // Ensure there are no errors on the page
    await expect(page.locator('body')).not.toContainText('Error');
  });
});
