const { test, expect } = require('@playwright/test');

test('CUET Clubs navbar loads correctly and links are functional', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:5173');
  
  // Check if the navbar is visible
  const navbar = page.locator('nav');
  await expect(navbar).toBeVisible();
  
  // Check if the navbar has the correct title
  const navbarTitle = page.locator('nav >> text=CUET Clubs');
  await expect(navbarTitle).toBeVisible();
  
  // Verify links for non-authenticated users using `id`
  const registerClubLink = page.locator('#register-club');
  const adminLoginLink = page.locator('#admin\\ Login'); // Escape space in the id
  const websiteAdminLoginLink = page.locator('#website\\ admin\\ login'); // Escape space in the id

  // Ensure all links are visible
  await expect(registerClubLink).toBeVisible();
  await expect(adminLoginLink).toBeVisible();
  await expect(websiteAdminLoginLink).toBeVisible();
  
  // Ensure links navigate to the correct URLs
  await registerClubLink.click();
  await expect(page).toHaveURL('http://localhost:5173/register-club');

  await page.goto('http://localhost:5173'); // Navigate back to homepage
  await adminLoginLink.click();
  await expect(page).toHaveURL('http://localhost:5173/admin/login');

  await page.goto('http://localhost:5173'); // Navigate back to homepage
  await websiteAdminLoginLink.click();
  await expect(page).toHaveURL('http://localhost:5173/Website');
});
