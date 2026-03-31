import {test, expect} from '@playwright/test';


test.describe('GreenKart Search', () => {
  test('Search for "ca" returns 4 results', async ({ pageManager }: any) => {
    await pageManager.getGreenKartPage().search('ca');
    const count = await pageManager.getGreenKartPage().getSearchResultCount();
    expect(count).toBe(4);
  });

  test('Search for "br" returns 2 results', async ({ pageManager }: any) => {
    await pageManager.getGreenKartPage().search('br');
    const count = await pageManager.getGreenKartPage().getSearchResultCount();
    expect(count).toBe(2);
  });

  test('Search for "cu" returns 1 result', async ({ pageManager }: any) => {
    await pageManager.getGreenKartPage().search('cu');
    const count = await pageManager.getGreenKartPage().getSearchResultCount();
    expect(count).toBe(1);
  });

  test('Search for non‑existing product shows no results', async ({ pageManager }: any) => {
    await pageManager.getGreenKartPage().search('xyz123');
    const count = await pageManager.getGreenKartPage().getSearchResultCount();
    expect(count).toBe(0);
  });

  });
