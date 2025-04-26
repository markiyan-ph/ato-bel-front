#base image
FROM node:22-alpine as ato-bel-front
WORKDIR '/app'

COPY package.json .

#insatall and cache app dependencies
RUN npm i

COPY . .

EXPOSE 3000

ENV VITE_PORT=3000
ENV VITE_HOST=0.0.0.0
ENV VITE_PROXY_API=http://server:5005

#start app
ENTRYPOINT ["npm", "run", "dev"]
