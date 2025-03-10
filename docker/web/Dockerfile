FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

# Vite sẽ reload code từ volume mount
CMD ["npm", "run", "dev"]
