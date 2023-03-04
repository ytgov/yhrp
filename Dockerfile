FROM node:18-alpine

RUN mkdir /home/node/app && chown -R node:node /home/node/app
RUN mkdir /home/node/web && chown -R node:node /home/node/web

COPY --chown=node:node web/package*.json /home/node/web/
COPY --chown=node:node src/api/package*.json /home/node/app/

USER node

WORKDIR /home/node/app
RUN npm install && npm cache clean --force --loglevel=error
# COPY --chown=node:node src/api/.env* ./

WORKDIR /home/node/web
RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node src/api /home/node/app/
COPY --chown=node:node web /home/node/web/

RUN npm run build


WORKDIR /home/node/app

ENV NODE_ENV=production
RUN npm run build:api

WORKDIR /home/node/
COPY /home/node/web /home/node/app/dist/web

EXPOSE 3000
CMD [ "node", "./app/dist/index.js" ]