# Frontend builder stage
FROM node:20-alpine AS frontend-builder

WORKDIR /build/web
COPY src/web/package*.json ./
RUN npm install && npm cache clean --force --loglevel=error

COPY src/web ./
RUN npm run build:docker

# API builder stage
FROM node:20-alpine AS api-builder

WORKDIR /build/api
COPY src/api/package*.json ./
RUN npm install && npm cache clean --force --loglevel=error

COPY src/api ./
RUN npm run build:api

# Final stage
FROM node:20-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app

# Copy built frontend from builder
COPY --from=frontend-builder --chown=node:node /build/api/dist/web ./dist/web

# Copy built API from builder
COPY --from=api-builder --chown=node:node /build/api/dist ./dist
COPY --from=api-builder --chown=node:node /build/api/package*.json ./

# Install production dependencies only
RUN npm install --production && npm cache clean --force --loglevel=error

ENV NODE_ENV=production

EXPOSE 3000
CMD [ "node", "dist/index.js" ]