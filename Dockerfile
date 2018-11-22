FROM node:10

ENV DB_HOST 127.17.0.1
ENV DB_NAME=opentab
ENV DB_USERNAME=opentab
ENV DB_PASSWORD=opentab

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN npm run dev

EXPOSE 8080

CMD [ "npm", "start" ]
