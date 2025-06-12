# API Directory Structure

## Overview

This directory contains the backend API implementation for the YHRP Site Registry Viewer.

## Remote API Endpoint

- The production/remote API is available at: `https://yhis.gov.yk.ca/api/register/`
- All remote integration and contract tests should use this base URL.

## Directory Structure

```
api/
├── controllers/     # Request handlers and business logic
├── models/         # Data models and API response types
├── routes/         # API route definitions
├── services/       # Business logic and external service integrations
├── utils/          # Utility functions and helpers
├── __tests__/      # Test files
├── @types/         # TypeScript type definitions
└── config/         # Configuration files
```

## Naming Conventions

### Files

- Use kebab-case for file names (e.g., `user-controller.ts`)
- Suffix files with their type:
  - Controllers: `-controller.ts`
  - Models: `-model.ts`
  - Routes: `-routes.ts`
  - Services: `-service.ts`
  - Utils: `-util.ts`

### Classes and Interfaces

- Use PascalCase for class and interface names
- Suffix interfaces with their type:
  - Models: `IModel`
  - Services: `IService`
  - Controllers: `IController`

### Functions and Variables

- Use camelCase for function and variable names
- Use descriptive names that indicate purpose
- Prefix private methods with underscore

## Code Organization

### Controllers

- Handle HTTP requests and responses
- Validate input data (using custom middleware, not express-validator)
- Call appropriate services
- Format responses
- Handle errors

### Services

- Contain business logic
- Handle data operations
- Interact with external services
- Implement caching where needed

### Models

- Define data structures (see `RegisterPlace` and API response models)
- Include validation rules (type-checked)
- Document relationships
- Include type definitions

### Routes

- Define API endpoints
- Group related endpoints
- Include middleware (custom validation, error handling)
- Document route parameters

## Validation

- Input validation is handled by custom middleware (see `register-routes.ts`)
- No longer uses `express-validator`
- All input is type-checked and validated for correctness

## Testing

- Unit and integration tests are in `__tests__/`
- Use Jest and Supertest for testing
- Contract testing supported: run tests against any API URL using:
  ```sh
  npm run test:url --url=https://heritage.yukon.ca/api/register
  ```

## Future Improvements

- [ ] Implement proper logging system
- [ ] Add request rate limiting
- [ ] Implement caching strategy
- [ ] Add API documentation using Swagger/OpenAPI
- [ ] Set up monitoring and metrics
- [ ] Add more contract tests for API compatibility
