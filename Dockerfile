FROM node:20-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# Copy package files
COPY --chown=node:node src/web/package*.json /home/node/app/web/
COPY --chown=node:node src/api/package*.json /home/node/app/api/

USER node

# Install dependencies
WORKDIR /home/node/app/web
RUN npm install && npm cache clean --force --loglevel=error

WORKDIR /home/node/app/api
RUN npm install && npm cache clean --force --loglevel=error

# Copy source code
COPY --chown=node:node src/web /home/node/app/web/
COPY --chown=node:node src/api /home/node/app/api/

# Build web app
WORKDIR /home/node/app/web
RUN npm run build:docker

# Build API
WORKDIR /home/node/app/api
RUN npm run build:api

# Clean up source directories
RUN rm -rf /home/node/app/web

ENV NODE_ENV=production

EXPOSE 3000
WORKDIR /home/node/app/api
CMD [ "node", "dist/index.js" ]