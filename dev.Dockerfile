#base image
FROM node:14.15.3-alpine
WORKDIR '/app'

COPY package*.json .

#insatall and cache app dependencies
RUN npm install

COPY . .

#start app
# ENTRYPOINT [ "npm", start" ]