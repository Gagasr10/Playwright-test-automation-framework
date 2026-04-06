import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  // Directory where test files are located
  testDir: './tests',
  
  // Run tests in parallel across all available CPU cores
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests on CI (2 times), locally no retries
  retries: process.env.CI ? 2 : 0,
  
  // Limit workers on CI to 1 (more stable), otherwise use all cores
  workers: process.env.CI ? 1 : undefined,
  
  // Generate HTML report after test run
  reporter: 'html',
  
  // Global test timeout (60 seconds for slower CI environments)
  timeout: 60000,
  
  // Default assertion timeout (10 seconds)
  expect: {
    timeout: 10000,
  },
  
  // Shared settings for all tests
  use: {
    // Base URL for the GreenKart application
    baseURL: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    
    // Collect trace only on the first retry of a failed test
    trace: 'on-first-retry',
    
    // Take screenshot only when a test fails
    screenshot: 'only-on-failure',
    
    // Timeout for each action (e.g., click, fill)
    actionTimeout: 15000,
    
    // Timeout for navigation (e.g., page.goto)
    navigationTimeout: 30000,
  },

  // Define test projects (browsers and special test groups)
  projects: [
    // Setup project – only needed for API tests, skipped in CI
    ...(process.env.CI ? [] : [{
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    }]),
    
    // API tests – run only locally (not in CI)
    ...(process.env.CI ? [] : [{
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://conduit.bondaracademy.com',
        storageState: path.join(__dirname, '.auth/user.json'),
      },
      dependencies: ['setup'],
    }]),
    
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile device emulation (iPhone 13 Pro)
    {
      name: 'mobile',
      testMatch: /mobile\/.*\.spec\.ts/,
      use: { ...devices['iPhone 13 Pro'] },
    },
  ],
});