const { test, expect } = require('@playwright/test');

test.describe('Club Registration Page', () => {
  
  test('should load the registration form and check element visibility', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/register-club'); // Change URL if needed

    // Ensure the page title is visible
    await page.waitForSelector('h1', { state: 'visible' });
    await expect(page.locator('h1')).toHaveText('Register Your Club');

    // Check if all form fields are visible
    await expect(page.locator('#clubName')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    //await expect(page.locator('#phone')).toBeVisible();
    //await expect(page.locator('#address')).toBeVisible();

    // Check if the file upload input is visible
    //await expect(page.locator('input[type="file"]')).toBeVisible();

    // Check if the submit button is visible
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

});
