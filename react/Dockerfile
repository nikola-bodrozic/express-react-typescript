# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# Stage 2: Serve the static files using nginx:alpine
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
