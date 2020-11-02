FROM node:10
WORKDIR /mecku-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD [ "node", "server.js" ]
