FROM alpine:3.19.1

RUN apk update && apk upgrade
RUN apk add --update --no-cache nodejs npm sqlite
RUN npm install -g nodemon

WORKDIR /app
COPY ./app/package.json .
COPY ./app/package-lock.json .
RUN npm install

VOLUME /app/node_modules

CMD ["npm", "run", "dev"]
