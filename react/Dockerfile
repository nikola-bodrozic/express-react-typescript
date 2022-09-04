# 1st Stage
FROM node:18-alpine as builder 

# Specify a working directory
WORKDIR '/app'

# Copy the dependencies file
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy remaining files
COPY . .

# Build the project for production
RUN npm run build 

# Run 2nd Stage
FROM nginx:alpine

# Install latest updates
RUN apk -U upgrade

# Copy production build files from builder phase to nginx
COPY --from=builder /app/build /usr/share/nginx/html
