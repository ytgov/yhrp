FROM node:20-alpine

RUN mkdir /home/node/app && chown -R node:node /home/node/app

COPY --chown=node:node src/web/package*.json /home/node/app/web/
COPY --chown=node:node src/api/package*.json /home/node/app/

USER node

WORKDIR /home/node/app
RUN npm install && npm cache clean --force --loglevel=error
# COPY --chown=node:node src/api/.env* ./

WORKDIR /home/node/app/web
RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node src/api /home/node/app/
COPY --chown=node:node src/web /home/node/app/web/

RUN npm run build:docker

WORKDIR /home/node/app
RUN mkdir -p dist && \
    cd src/api && \
    npm run build:api && \
    mv dist/* ../dist/ && \
    cd .. && \
    ls -la dist/

ENV NODE_ENV=production

EXPOSE 3000
CMD [ "node", "dist/index.js" ]