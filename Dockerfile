FROM node:17.8-alpine

ENV PORT 1337

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn build

EXPOSE 80 1337

# Running the app
CMD ["yarn", "start"]