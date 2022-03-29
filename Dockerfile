FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn run build
EXPOSE 3000

# Running the app
CMD ["yarn", "start"]