const { test, expect } = require('@playwright/test');

test.describe('Admin Login Page', () => {

  test('should load the login form and check element visibility', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/admin/login'); // Update URL if necessary

    // Check if the page title is visible
    await expect(page.locator('h2')).toHaveText('Admin Login');

    // Verify email input field is visible
    await expect(page.locator('#email')).toBeVisible();

    // Verify password input field is visible
    await expect(page.locator('#password')).toBeVisible();

    // Check if the submit button is visible
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Check if the lock icon exists (Lucide-react icon)
    //await expect(page.locator('svg')).toBeVisible();
  });

});
