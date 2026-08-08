# Build Process Documentation

## Overview

This document outlines the build process for the YHRP Site Registry Viewer application. The application uses a multi-stage Docker build process to create optimized production images.

## Build Architecture

The build process consists of three main stages:

1. Frontend Builder - Builds the Vue.js frontend application
2. API Builder - Builds the Node.js backend API
3. Final Stage - Combines the built frontend and API into a production-ready image

## Development Build

### Prerequisites

- Node.js 20.x
- npm
- Docker (optional, for containerized development)

### Local Development

1. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd src/web
   npm install

   # Install API dependencies
   cd ../api
   npm install
   ```

2. Start development servers:

   ```bash
   # Start frontend development server
   cd src/web
   npm run dev

   # Start API development server
   cd ../api
   npm run dev
   ```

### Docker Development

> **Note**: For local development, it's recommended to use the local development setup above. The Docker setup is primarily for production builds.

If you need to use Docker for development:

1. Build the image:

   ```bash
   docker build -t yhrp .
   ```

2. Run the container in development mode:

   ```bash
   docker run -p 27640:3000 -e NODE_ENV=development yhrp
   ```

## Production Build

### Docker Build Process

1. Frontend Builder Stage:

   - Uses Node.js 20 Alpine as base image
   - Installs frontend dependencies
   - Builds the Vue.js application using `npm run build:docker`

2. API Builder Stage:

   - Uses Node.js 20 Alpine as base image
   - Installs API dependencies
   - Builds the API using `npm run build:api`

3. Final Stage:
   - Combines built frontend and API
   - Installs only production dependencies
   - Sets up proper permissions and environment

### Building Production Image

```bash
# Build the production image
docker build -t yhrp .

# Run the production container
docker run -p 27640:3000 yhrp
```

### Using Docker Compose

For production deployment, use the provided docker-compose file:

```bash
# Start the production service
docker-compose -f docker-compose.production.yml up -d
```

## Environment Configuration

The application uses environment variables for configuration. See `ENVIRONMENT.md` for detailed information about required and optional environment variables.

## Build Output

The build process creates the following structure in the final image:

```
/home/node/app/
├── dist/
│   ├── web/     # Built frontend files
│   └── index.js # Built API entry point
└── package.json # Production dependencies
```

## Troubleshooting

### Common Issues

1. **Build fails with npm errors**

   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Docker build fails**

   - Ensure Docker has enough memory allocated
   - Check for network connectivity issues
   - Verify Docker daemon is running

3. **Port conflicts**
   - Change the port mapping in docker-compose.yml
   - Check if port 27640 is already in use

## Maintenance

### Updating Dependencies

1. Update package.json files in both frontend and API
2. Rebuild the Docker image
3. Test the new build thoroughly before deployment

### Cleaning Up

```bash
# Remove unused Docker images
docker image prune

# Remove unused containers
docker container prune
```
