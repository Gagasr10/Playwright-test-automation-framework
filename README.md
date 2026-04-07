# Playwright Test Automation Framework

A complete end‑to‑end test automation framework built with **Playwright** and **TypeScript**.  
It covers multiple demo websites: **GreenKart** (e‑commerce), **Login Practice**, **Automation Practice**, and **Conduit** (API).  
The framework follows industry best practices – Page Object Model, custom fixtures, API testing, mobile emulation, Docker support, and CI/CD with GitHub Actions.

## Features

- Page Object Model – clean, maintainable page objects with a central `PageManager`
- Custom Fixtures – automatic injection of `PageManager` into tests
- API Testing – direct API calls, request mocking, and response modification (Conduit)
- Mobile Emulation – tests for iPhone 13 Pro using Playwright device profiles
- Docker Support – run tests in containers with `Dockerfile` and `docker-compose`
- CI/CD Ready – GitHub Actions workflow (runs only stable Chromium tests)
- Environment Variables – secure credential management with `dotenv`
- HTML Reporting – detailed test reports with traces and screenshots
- No Hard‑coded Waits – full use of Playwright’s auto‑waiting

## Tested Applications

| Site | URL | Tests |
|------|-----|-------|
| GreenKart (e‑commerce) | [link](https://rahulshettyacademy.com/seleniumPractise/#/) | Search, cart, checkout, mobile search |
| Login Practice | [link](https://rahulshettyacademy.com/loginpagePractise/) | Login, dropdown, radio buttons, checkboxes |
| Automation Practice | [link](https://rahulshettyacademy.com/AutomationPractice/) | Radio, checkbox, dropdown, alerts, iframe, table |
| Conduit (API) | [API](https://conduit-api.bondaracademy.com) | Tags, create/delete article, mocking, modification |

## Project Structure
├── .github
│ └── workflows
│ └── playwright.yml
├── page-objects
│ ├── helper-base.ts
│ ├── greenkart-page.ts
│ ├── cart-page.ts
│ ├── checkout-page.ts
│ ├── login-practice-page.ts
│ ├── automation-practice-page.ts
│ └── page-manager.ts
├── tests
│ ├── api
│ │ ├── api-requests.spec.ts
│ │ ├── api-mocking.spec.ts
│ │ └── api-modify.spec.ts
│ ├── auth.setup.ts
│ ├── greenkart
│ │ ├── search.spec.ts
│ │ ├── cart.spec.ts
│ │ └── checkout.spec.ts
│ ├── login-practice
│ │ ├── login.spec.ts
│ │ ├── radio-checkbox.spec.ts
│ │ └── user-roles.spec.ts
│ ├── automation-practice
│ │ ├── radio-checkbox.spec.ts
│ │ ├── dropdown.spec.ts
│ │ ├── alert-dialog.spec.ts
│ │ ├── iframe.spec.ts
│ │ └── table.spec.ts
│ └── mobile
│ └── mobile-search.spec.ts
├── test-data
│ ├── products.json
│ └── tags.json
├── test-options.ts
├── playwright.config.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
├── .env.example
└── README.md



## Prerequisites

- Node.js 20+
- npm or yarn
- Playwright browsers (installed automatically)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Gagasr10/Playwright-test-automation-framework.git
cd Playwright-test-automation-framework
Install dependencies

bash
npm install
Install Playwright browsers

bash
npx playwright install --force
Set up environment variables (for API tests)

Copy .env.example to .env and fill in your Conduit credentials:

bash
cp .env.example .env
Edit .env:

text
CONDUIT_EMAIL=your-email@example.com
CONDUIT_PASSWORD=your-password
Running Tests
Run all tests (desktop browsers)
bash
npm run test:all
Run a specific project
bash
npm run test:chrome        # Chromium only
npm run test:firefox       # Firefox only
npm run test:webkit        # WebKit only
npm run test:mobile        # Mobile emulation (iPhone 13 Pro)
npm run test:api           # API tests (local only)
Run a single test file
bash
npx playwright test tests/greenkart/search.spec.ts --project=chromium
Run tests with headed mode (see the browser)
bash
npm run test:headed
Generate and open HTML report
bash
npm run report
Docker
Build and run tests inside a container:

bash
docker-compose up --build
Volumes are mounted so that the playwright-report folder appears on your host machine.

CI/CD
GitHub Actions is configured to run on every push to main/master and on pull requests.
The workflow:

Installs dependencies

Installs Playwright browsers

Runs only Chromium tests (API tests are skipped in CI to avoid flakiness)

Uploads the HTML report as an artifact

Configuration
Main configuration is in playwright.config.ts. Key settings:

timeout: 60000 – global timeout (60s for CI)

retries: 2 on CI, 0 locally

fullyParallel: true – parallel execution

testIgnore: /api\/.*\.spec\.ts/ – API tests are excluded from browser projects

Custom fixtures are defined in test-options.ts and provide the pageManager object to all tests.

Reports
After test execution, an HTML report is generated in playwright-report/.
Open it with:

bash
npm run report
Traces for failed tests are also available – view them with:

bash
npx playwright show-trace test-results/.../trace.zip
Notes
API tests are not executed in CI because they require external credentials and can be unstable. Run them locally with npm run test:api.

The setup project (authentication) runs only before API tests locally.

Mobile tests emulate an iPhone 13 Pro – they pass both locally and in CI (when run with --project=mobile).

All waits are based on Playwright’s auto‑waiting – no hard‑coded waitForTimeout (except for a few unavoidable cases that are clearly commented).

Contributing
Feel free to open issues or submit pull requests. Please follow the existing Page Object Model structure and ensure all tests pass locally.

License
MIT

Author
Dragan Stojilkovic
Gagasr10 – GitHub

