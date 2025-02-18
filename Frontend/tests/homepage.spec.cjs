const { test, expect } = require('@playwright/test');

test('CUET Clubs homepage loads correctly', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:5173'); // Replace with your actual URL

  // Verify the page title
  await expect(page).toHaveTitle("CUET CLUBS");

  // Verify the main heading text
  const mainHeading = page.locator('h1.text-4xl.font-bold.text-gray-900.mb-4');
  await expect(mainHeading).toHaveText("Welcome to CUET Clubs");

  // Verify the introductory paragraph
  const introParagraph = page.locator('p.text-xl.text-gray-600.max-w-2xl.mx-auto');
  await expect(introParagraph).toHaveText(
    "Discover and join the vibrant club community at Chittagong University of Engineering and Technology"
  );

  // Verify a featured club card
  const featuredClubCard = page.locator('div.bg-white.rounded-lg.shadow-md.p-6');
  const featuredClubTitle = featuredClubCard.locator('h3.text-xl.font-semibold.mb-2');
  const featuredClubDescription = featuredClubCard.locator('p.text-gray-600.mb-4');
  const featuredClubLink = featuredClubCard.locator('a.text-teal-600.hover\\:text-teal-700');

  //await expect(featuredClubTitle).toHaveText("IEEE CUET Student Branch");
  // await expect(featuredClubDescription).toHaveText("Professional development and technical excellence");
  // await expect(featuredClubLink).toHaveAttribute('href', '/club/ieee');

  // Verify the section icons and titles
  const activeMembers = page.locator('div.text-center.p-6', { hasText: 'Active Members' });
  const regularEvents = page.locator('div.text-center.p-6', { hasText: 'Regular Events' });
  const workshops = page.locator('div.text-center.p-6', { hasText: 'Workshops' });
  const achievements = page.locator('div.text-center.p-6', { hasText: 'Achievements' });

  // Check that each section icon is visible
  await expect(activeMembers.locator('svg')).toBeVisible();
  await expect(regularEvents.locator('svg')).toBeVisible();
  await expect(workshops.locator('svg')).toBeVisible();
  await expect(achievements.locator('svg')).toBeVisible();

  // Check that each section title and description are correct
  await expect(activeMembers.locator('h3.text-lg.font-semibold.mb-2')).toHaveText('Active Members');
  await expect(activeMembers.locator('p.text-gray-600')).toHaveText('Join our growing community');

  await expect(regularEvents.locator('h3.text-lg.font-semibold.mb-2')).toHaveText('Regular Events');
  await expect(regularEvents.locator('p.text-gray-600')).toHaveText('Participate in exciting activities');

  await expect(workshops.locator('h3.text-lg.font-semibold.mb-2')).toHaveText('Workshops');
  await expect(workshops.locator('p.text-gray-600')).toHaveText('Learn from industry experts');

  await expect(achievements.locator('h3.text-lg.font-semibold.mb-2')).toHaveText('Achievements');
  await expect(achievements.locator('p.text-gray-600')).toHaveText('Celebrate our successes');
});
