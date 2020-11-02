#!/bin/bash

docker start mecku-mongo || docker run \
  --restart=always \
  -p 27017:27017 \
  --name mecku-mongo \
  -d mongo:3.0

npm install
forever start --id=mecku server.js
