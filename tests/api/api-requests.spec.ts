import { test, expect } from '@playwright/test';

test.describe('Conduit API - Direct Requests', () => {
  test('Get tags', async ({ request }) => {
    const response = await request.get('https://conduit-api.bondaracademy.com/api/tags');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.tags).toBeDefined();
    expect(Array.isArray(body.tags)).toBeTruthy();
  });

  test('Login and create an article', async ({ request }) => {
    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
      data: {
        user: {
          email: 'your-email@example.com',
          password: 'your-password',
        },
      },
    });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    const token = loginBody.user.token;

    const articleTitle = `Test Article ${Date.now()}`;
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article: {
          title: articleTitle,
          description: 'Test description',
          body: 'Test body',
          tagList: [],
        },
      },
    });
    expect(articleResponse.status()).toBe(201);
    const articleBody = await articleResponse.json();
    expect(articleBody.article.title).toBe(articleTitle);

    const slug = articleBody.article.slug;
    const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    expect(deleteResponse.status()).toBe(204);
  });
});
