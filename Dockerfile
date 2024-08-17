FROM  node:20.10.0-alpine

WORKDIR /usr/src/app
RUN apk update && apk upgrade && \
    apk add bash gcc g++ python3

COPY package*.json ./

run npm i --production

COPY  . .

run npm i -g typescript
run tsc

EXPOSE 5000

CMD [ "node", "dist/app.js"]