FROM node:20-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

COPY --chown=node:node src/web/package*.json /home/node/app/web/
COPY --chown=node:node src/api/package*.json /home/node/app/

USER node

WORKDIR /home/node/app
RUN npm install && npm cache clean --force --loglevel=error

WORKDIR /home/node/app/web
RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node src/api /home/node/app/
COPY --chown=node:node src/web /home/node/app/web/

# Build web app
RUN npm run build:docker

# Build API and move files to final location
WORKDIR /home/node/app/src/api
RUN npm run build:api && \
    cd ../.. && \
    mkdir -p api && \
    cp -r src/api/dist/* api/ && \
    cp -r dist/web api/ && \
    ls -la api/

ENV NODE_ENV=production

EXPOSE 3000
CMD [ "node", "api/index.js" ]