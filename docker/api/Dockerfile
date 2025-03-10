FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

CMD ["npx", "nodemon", "--legacy-watch", "/usr/src/app/src/server.js"]
