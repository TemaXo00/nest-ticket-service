FROM node:25-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY nx.json tsconfig.base.json tsconfig.json ./
COPY apps/ ./apps/
COPY libs/ ./libs/

RUN npm ci

RUN npm run prisma-tickets:generate && npm run prisma-events:generate

RUN npm run all:build

EXPOSE 3000 3001

CMD sh -c "npm run prisma-tickets:migrate-deploy && npm run prisma-events:migrate-deploy && npm run all:serve"