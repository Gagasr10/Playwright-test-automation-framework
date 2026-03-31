import { test as setup } from '@playwright/test';
import { request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate via API', async () => {
  const apiContext = await request.newContext();

  // Zameni sa svojim validnim kredencijalima za Conduit
  const loginResponse = await apiContext.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: {
        email: 'your-email@example.com',
        password: 'your-password',
      },
    },
  });

  const loginBody = await loginResponse.json();
  const token = loginBody.user.token;

  const storageState = {
    cookies: [],
    origins: [
      {
        origin: 'https://conduit.bondaracademy.com',
        localStorage: [
          {
            name: 'jwtToken',
            value: token,
          },
        ],
      },
    ],
  };

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  fs.writeFileSync(authFile, JSON.stringify(storageState, null, 2));
});
