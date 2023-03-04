FROM node:18-alpine

RUN mkdir /home/node/app && chown -R node:node /home/node/app

COPY --chown=node:node web/package*.json /home/node/web/
COPY --chown=node:node src/api/package*.json /home/node/app/

USER node

WORKDIR /home/node/app
RUN npm install && npm cache clean --force --loglevel=error
# COPY --chown=node:node src/api/.env* ./

WORKDIR /home/node/app/web
RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node src/api /home/node/app/
COPY --chown=node:node web /home/node/app/web/

RUN npm run build


WORKDIR /home/node/app

ENV NODE_ENV=production
RUN npm run build:api

EXPOSE 3000
CMD [ "node", "./dist/index.js" ]