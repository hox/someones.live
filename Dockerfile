FROM node:alpine

LABEL org.opencontainers.image.source https://github.com/hox/someones.live

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "./dist/index.js"]