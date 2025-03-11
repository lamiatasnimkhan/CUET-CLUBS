import { test, expect } from '@playwright/test';

test('CUET Clubs navbar loads correctly and links are functional', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');
  
  // Check if the navbar is visible
  const navbar = page.locator('nav');
  await expect(navbar).toBeVisible();
  
  // Check if the navbar title is correct
  const navbarTitle = page.locator('nav >> text=CUET Clubs');
  await expect(navbarTitle).toBeVisible();

  // Verify links for non-authenticated users using `id`
  const registerClubLink = page.locator('#register-club');
  const adminLoginLink = page.locator("#admin\\ Login"); // Escape space in the id
  const websiteAdminLoginLink = page.locator('nav >> text=Website Admin Login');

  // Ensure all links are visible
  await expect(registerClubLink).toBeVisible();
  await expect(adminLoginLink).toBeVisible();
  await expect(websiteAdminLoginLink).toBeVisible();

  // Ensure links navigate to the correct URLs
  await registerClubLink.click();
  await expect(page).toHaveURL('/register-club');

  await page.goto('/'); // Navigate back to homepage
  await adminLoginLink.click();
  await expect(page).toHaveURL('/admin/login');

  await page.goto('/'); // Navigate back to homepage
  await websiteAdminLoginLink.click();
  await expect(page).toHaveURL('/website-admin/login');
});
