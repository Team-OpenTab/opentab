FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV  NODE_ENV production

EXPOSE 8080

RUN npm run build 

CMD ["node", "server.js"]
