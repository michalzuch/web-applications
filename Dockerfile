FROM alpine:3.19.1

RUN apk update && apk upgrade
RUN apk add --update --no-cache nodejs npm sqlite
RUN npm install -g nodemon

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY ./app/package.json .
COPY ./app/package-lock.json .
RUN npm install

VOLUME /app/node_modules

USER appuser

CMD ["npm", "run", "dev"]
