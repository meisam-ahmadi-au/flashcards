FROM node:10.17-alpine
# FROM node:dubnium-alpine
# RUN apk add yarn

WORKDIR /web

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY ./ ./
CMD ["npm", "start"]