import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['allure-playwright', { outputFolder: 'allure-results' }],
  ['list'],
],
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    // Desktop browsers – ignore API tests
    {
      name: 'chromium',
      testIgnore: /api\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: /api\/.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: /api\/.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile project – also ignore API tests
    {
      name: 'mobile',
      testMatch: /mobile\/.*\.spec\.ts/,
      testIgnore: /api\/.*\.spec\.ts/,
      use: { ...devices['iPhone 13 Pro'] },
    },
    // API project – only runs locally (not in CI)
    ...(process.env.CI ? [] : [{
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://conduit.bondaracademy.com',
        storageState: path.join(__dirname, '.auth/user.json'),
      },
      dependencies: ['setup'],
    }]),
    // Setup project – only runs locally
    ...(process.env.CI ? [] : [{
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    }]),
  ],
});