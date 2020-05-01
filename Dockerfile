FROM node:alpine as builder

RUN apk update && apk add --no-cache git

WORKDIR /app

RUN rm -rf node_modules/

ADD . .

RUN npm run build

FROM node:alpine

WORKDIR /root/

RUN mkdir src/

COPY --from=builder app/dist .
COPY --from=builder app/.env .
COPY --from=builder app/package.json .

RUN npm i

EXPOSE 5000

CMD node .