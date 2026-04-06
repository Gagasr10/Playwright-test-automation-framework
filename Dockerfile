FROM mcr.microsoft.com/playwright:v1.48.0

WORKDIR /app

COPY package*.json ./
RUN npm ci --force

COPY . .
RUN npx playwright install --force

CMD ["npx", "playwright", "test"]
