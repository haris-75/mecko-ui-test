FROM node:10
WORKDIR /mecku-client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
