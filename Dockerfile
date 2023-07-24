FROM node:20-alpine as BUILD_IMAGE
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci -P

FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=BUILD_IMAGE /usr/src/app/ ./
COPY . .
CMD [ "node", "index.js" ]
