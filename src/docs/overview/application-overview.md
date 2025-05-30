# Application Overview

This is a Vue.js-based web application template designed for internal services. The application follows a client-server architecture with a Vue.js frontend and an Express.js backend.

## Architecture

### Backend (src/api)

- Built with Express.js and TypeScript
- Key features:
  - RESTful API endpoints
  - CORS configuration
  - Security middleware (helmet)
  - Health check endpoint
  - Static file serving for the frontend
  - Environment-based configuration
  - Authentication support (commented out in current version)

### Frontend (src/web-vue2)

- Built with Vue.js 2.x
- Key features:
  - Vue Router for navigation
  - Vuex for state management
  - Vuetify for UI components
  - Leaflet for map functionality
  - PDF generation capabilities (jspdf)
  - Coordinate system support (proj4, utm-latlng)

## Development Setup

- Requires Node.js and NPM
- Development environment runs on port 8080
- Separate development servers for frontend and backend
- Environment variables required for configuration

## Key Dependencies

### Backend

- Express.js - Web framework
- CORS - Cross-origin resource sharing
- Helmet - Security headers
- Express-session - Session management
- Express-openid-connect - Authentication

### Frontend

- Vue.js 2.6.11 - Core framework
- Vue Router 3.5.3 - Navigation
- Vuex 3.4.0 - State management
- Vuetify 2.5.12 - UI component framework
- Leaflet 1.7.1 - Map functionality
- Axios - HTTP client
- jsPDF - PDF generation

## Security Features

- CORS configuration
- Helmet security headers
- Environment variable management
- Authentication support (currently commented out)

## Build and Deployment

- Docker support for containerization
- Separate build scripts for API and web components
- Environment-specific configurations (development, test, production)

## Notable Features

- Map integration (Leaflet)
- PDF generation capabilities
- Coordinate system conversion
- Responsive UI (Vuetify)
- State management (Vuex)
- Client-side routing

This appears to be a template for building web applications with a focus on mapping and data visualization capabilities, with built-in support for PDF generation and coordinate system handling. The application is designed to be secure and configurable for different environments.
