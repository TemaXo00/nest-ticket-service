FROM node:25.6.1-slim

WORKDIR /app

ARG CLIENT_PATH

COPY ${CLIENT_PATH}/package*.json ./
RUN npm ci

COPY ${CLIENT_PATH}/ .

EXPOSE 5173
CMD sh -c "npm run dev -- --host"