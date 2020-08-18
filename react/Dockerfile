#Build Stage Start

#Specify a base image
FROM node as builder 

#Specify a working directory
WORKDIR '/app'

#Copy the dependencies file
COPY package.json .

#Install dependencies
RUN npm install

#Copy remaining files
COPY . .

#Build the project for production
RUN npm run build 

#Run Stage Start
FROM nginx

#Copy production build files from builder phase to nginx
COPY --from=builder /app/build /usr/share/nginx/html
