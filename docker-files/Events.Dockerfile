FROM node:25-alpine

WORKDIR /app

ARG EVENTS_SERVICE_PATH

COPY ${EVENTS_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${EVENTS_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"