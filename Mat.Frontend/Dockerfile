# Build stage
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VITE_AUTH
ARG VITE_CLIENT_ID

ENV VITE_AUTH=$VITE_AUTH
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID

COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
