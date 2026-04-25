FROM node:25-alpine

WORKDIR /app

ARG EVENTS_SERVICE_PATH

COPY ${EVENTS_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${EVENTS_SERVICE_PATH}/ .

RUN npx prisma generate

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && npm run start:dev"