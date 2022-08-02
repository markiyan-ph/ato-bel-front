#base image
FROM node:14-alpine
WORKDIR '/app'

COPY package.json .

#insatall and cache app dependencies
RUN npm i

COPY . .

EXPOSE 3000

#start app
CMD [ "npm", "start" ]