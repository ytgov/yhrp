# API Tests

This directory contains the API implementation and tests for the register endpoints.

## Running Tests

### Basic Test Run

To run all tests:

```bash
npm test
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

### Running Tests Against a Custom Base URL

You can run the tests against a specific API endpoint using one of these methods:

1. Using the test:url script:

```bash
npm run test:url --url=http://your-api-url/api/register
```

2. Using the API_BASE_URL environment variable directly:

```bash
API_BASE_URL=http://your-api-url/api/register npm test
```

The default base URL is '/api/register' if none is specified.

## Test Structure

The tests are located in `routes/__tests__/register.test.ts` and cover the following endpoints:

- GET / - List paginated register places
- GET /:id - Get place details with descriptions
- GET /:id/photos - Get photos for a place
- GET /:id/photos/:photoId - Get a specific photo file

## Development Notes

- The tests use mock services for development purposes
- Some tests are currently commented out due to pending status code handling improvements
- The test suite uses Jest and Supertest for testing Express routes
