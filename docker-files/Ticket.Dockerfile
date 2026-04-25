FROM node:25-alpine

WORKDIR /app

ARG TICKET_SERVICE_PATH

COPY ${TICKET_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${TICKET_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npm run start:dev"