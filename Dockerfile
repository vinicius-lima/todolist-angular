FROM node:14.16.0-alpine3.10 AS builder
WORKDIR /app
COPY package.* .
RUN npm install
COPY . .
RUN npm run ng build

FROM nginx:1.19-alpine
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/todolist/ /usr/share/nginx/html
