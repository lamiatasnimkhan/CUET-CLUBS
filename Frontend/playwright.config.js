import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where test files are located
  timeout: 30000, // Timeout for each test
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  reporter: [['html', { outputFolder: 'test-results' }], ['json', { outputFile: 'test-results/results.json' }]], // Save reports in test-results folder and JSON file
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    navigationTimeout: 10000,
    baseURL: 'http://localhost:5173', // Change if your app runs on a different port
    trace: 'on-first-retry', // Enable tracing on test failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm start', // Start the dev server before tests run
    port: 5173,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
