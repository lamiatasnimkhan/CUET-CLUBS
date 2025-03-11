import { test, expect } from '@playwright/test';

test('Admin Dashboard navbar loads correctly and tabs are functional', async ({ page }) => {
  // Navigate to the admin dashboard
  await page.goto('/admin/dashboard');
  
  // Check if the navbar is visible
  const navbar = page.locator('nav');
  await expect(navbar).toBeVisible();
  
  // Verify the navbar title is correct (title within h1)
//   const navbarTitle = page.locator('text-2xl font-bold text-gray-900');
//   await expect(navbarTitle).toHaveText('Club Admin Dashboard');
  
  // Verify the tabs are visible and functional
  const eventsTab = page.locator('button', { hasText: 'Events' });
  const workshopsTab = page.locator('button', { hasText: 'Workshops' });
  const committeeTab = page.locator('button', { hasText: 'Committee' });
  const settingsTab = page.locator('button', { hasText: 'Club Member Management' });

  await expect(eventsTab).toBeVisible();
  await expect(workshopsTab).toBeVisible();
  await expect(committeeTab).toBeVisible();
  await expect(settingsTab).toBeVisible();

  // Ensure the content changes when clicking on different tabs
  await eventsTab.click();
  const eventsContent = page.locator('text=Events');
  await expect(eventsContent).toBeVisible();

  await workshopsTab.click();
  const workshopsContent = page.locator('text=Workshops');
  await expect(workshopsContent).toBeVisible();

  await committeeTab.click();
  const committeeContent = page.locator('text=Committee');
  await expect(committeeContent).toBeVisible();

  await settingsTab.click();
  const settingsContent = page.locator('text=Club Member Management');
  await expect(settingsContent).toBeVisible();
});
