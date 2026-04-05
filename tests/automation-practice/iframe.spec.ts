import { test, expect } from "../../test-options";

test.describe("Automation Practice - Iframe", () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.getAutomationPracticePage().goto();
  });

  test("Interact with iframe", async ({ page }) => {
    // Get the iframe frame locator
    const frame = page.frameLocator("#courses-iframe");
    // Wait for any h3 element to appear (iframe content loaded)
    await frame
      .locator("h3")
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
    // Get the text of all h3 elements and check if at least one contains "Selenium"
    const allHeadings = await frame.locator("h3").allTextContents();
    const hasSeleniumCourse = allHeadings.some((text) =>
      text.toLowerCase().includes("selenium"),
    );
    expect(hasSeleniumCourse).toBe(true);
  });
});
