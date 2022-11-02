FROM node:17.8-alpine

ENV PORT ${PORT}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json ./
RUN yarn install

# Copying source files
COPY . .

RUN yarn prisma:generate

# Building app
RUN yarn build

EXPOSE 80 ${PORT}

# Running the app
CMD ["yarn", "start"]