FROM alpine:3.19.1

RUN apk update && apk upgrade
RUN apk add --update nodejs npm

WORKDIR /app
COPY ./app/package.json ./
RUN npm install

CMD ["npm", "run", "dev"]
