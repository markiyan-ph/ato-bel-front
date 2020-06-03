#base image
FROM node:12.14.1-slim
WORKDIR '/app'

COPY package.json .

#insatall and cache app dependencies
RUN npm install

COPY . .

#start app
# ENTRYPOINT [ "npm", start" ]