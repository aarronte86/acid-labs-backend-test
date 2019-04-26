FROM node:10.4.0-alpine

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm ci

RUN npm run build
RUN npm prune --production

ENV PORT=4100
EXPOSE $PORT

CMD ["npm", "run", "start"]

