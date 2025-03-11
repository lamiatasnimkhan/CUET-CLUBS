import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // Update the URL if different
  });

  test('should display the welcome message', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Welcome to CUET Clubs');
  });

  test('should fetch and display clubs', async ({ page }) => {
    // Wait for clubs to load
    await page.waitForSelector('.bg-white.rounded-lg.shadow-md');

    // Check if at least one club is displayed
    const clubCards = await page.locator('.bg-white.rounded-lg.shadow-md').count();
    expect(clubCards).toBeGreaterThan(0);
  });

  test('should navigate to a club page when clicking Learn More', async ({ page }) => {
    const firstClubLink = page.locator('text=Learn More').first();
    await firstClubLink.click();

    // Expect URL to change (adjust route pattern if necessary)
    await expect(page).toHaveURL(/club\/\w+/);
  });

  test('should display all feature sections', async ({ page }) => {
    const features = ['Active Members', 'Regular Events', 'Workshops', 'Achievements'];
    for (const feature of features) {
      await expect(page.locator(`text=${feature}`)).toBeVisible();
    }
  });
});
