#base image
FROM node:16.10-alpine as ato-bel-front
WORKDIR /app

COPY /package*.json /app/

#insatall and cache app dependencies
RUN npm install

COPY . /app

#start app
# ENTRYPOINT [ "npm", start" ]