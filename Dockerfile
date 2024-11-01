FROM  node:20.10.0-alpine

WORKDIR /usr/src/app
RUN apk update && apk upgrade && \
    apk add bash gcc g++ python3

COPY package*.json ./

RUN npm i

COPY  . .

RUN npm i -g typescript
RUN tsc

EXPOSE 5000

CMD [ "node", "dist/app.js"]