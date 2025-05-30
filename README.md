# YHRP Site Registry Viewer

A Vue 3 based web application for viewing and interacting with the YHRP site registry data.

## Overview

This application provides a modern interface for accessing and visualizing site registry data from the YHRP API. Built with Vue 3 and Vuetify 3, it offers a responsive and user-friendly experience.

## Key Features

- Vue 3 with Composition API
- Vuetify 3 for UI components
- ArcGIS integration for map visualization
- Service-based architecture for API integration
- Responsive design for all device sizes

## Development Setup

### Prerequisites

- Node.js and NPM
- Docker (optional, for containerized deployment)

### Local Development

1. Clone the repository
2. Create environment files:
   ```bash
   cp src/api/.env src/api/.env.development
   ```
3. Configure environment variables (see Environment Variables section)
4. Start the development servers:

   ```bash
   # Terminal 1 - API
   cd src/api
   npm run start:dev

   # Terminal 2 - Frontend
   cd src/web
   npm run start:dev
   ```

5. Access the application at http://localhost:8080

## Environment Variables

Environment variables should never be checked into the repository!

Required variables:

- API_PORT=(port for API server)
- FRONTEND_URL=(service URL from browser)

## Deployment

### Docker Build

```bash
docker build -t yhrp-viewer .
```

### Running in Production

```bash
docker run -p 8222:3000 -e NODE_ENV=production --restart=on-failure yhrp-viewer
```

## Project Structure

- `src/web/` - Vue 3 frontend application
- `src/api/` - Backend API services
- `src/docs/` - Project documentation
  - Migration plans
  - API schemas
  - Release process
  - State management documentation

## Documentation

For detailed information about the project, refer to the documentation in `src/docs/`:

- `VUE3_MIGRATION_PLAN.md` - Details about the Vue 3 migration
- `STATE_MANAGEMENT_PLAN.md` - State management architecture
- `CACHING_STRATEGY.md` - Caching implementation details
- `RELEASE_PROCESS.md` - Release and deployment procedures
- `CHANGELOG.md` - Version history and changes

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass
5. Update documentation as needed

## License

Internal use only - YG Government
