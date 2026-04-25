FROM node:25-alpine

WORKDIR /app

ARG TICKET_SERVICE_PATH

COPY ${TICKET_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${TICKET_SERVICE_PATH}/ .

RUN npx prisma generate

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && npm run start:dev"