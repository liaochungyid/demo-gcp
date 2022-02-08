FROM node:16.13.2-alpine

WORKDIR /app
COPY package.json ./

RUN npm install --only=production

COPY . ./
CMD ["npm", "start"]