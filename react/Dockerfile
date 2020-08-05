# pull official base image
FROM node:10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 1000000000

# add app
COPY . ./

# start app
CMD ["yarn", "start"]