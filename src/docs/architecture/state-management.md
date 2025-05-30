# State Management Cleanup Plan

## Overview

This plan outlines the steps to remove unnecessary state management and implement a simpler architecture using Vue 3's Composition API. The application will use local component state and services for data management.

## Current State

- [x] Removed all store files from `web/src/stores/`:
  - [x] `ApiStore.js`
  - [x] `AuthStore.js`
  - [x] `NotificationStore.js`
  - [x] `UserStore.js`
- [x] Removed Pinia dependency and imports
- [x] Successfully refactored components to use Composition API:
  - [x] Created `notificationService.js` for notification handling
  - [x] Created `apiService.js` for API calls
  - [x] Removed user-related functionality
  - [x] Removed SecureAPI component
  - [x] Updated map components to remove store dependencies
- [x] Implemented environment variable based ArcGIS token loading
- [x] Restored 22 community bookmarks with original UTM coordinates
- [x] Removed map store in favor of service-based approach
- [x] Added placeholder image for missing photos
- [x] Updated URL configurations for API endpoints
- [x] Added and passed tests for API service error handling and map bookmarks (using kebab-case for test files)
- [x] Removed token handling test (endpoint is in use and not mocked)

## Next Steps

### Phase 1: API Client Implementation (Completed)

- [x] Create API client service using native `fetch`
- [x] Implement response caching
- [x] Add error handling

### Phase 2: Component Refactoring (In Progress)

- [x] Remove store dependencies from components
- [x] Implement local state management
- [x] Update map components to use services
- [x] Implement proper token loading for map components via environment variables
- [x] Add placeholder image for missing photos
- [x] Add tests for map service (bookmarks)
- [ ] Future: Implement search functionality (currently using placeholder)

### Phase 3: Cleanup and Optimization

- [x] Remove unused store files
- [x] Clean up dependencies
- [x] Add tests for new services (API service error handling)
- [ ] Update build configuration
- [ ] Document new architecture

## Implementation Plan

- [x] Remove store files
- [x] Create notification service
- [x] Create API service
- [x] Remove user functionality
- [x] Update components to use new services
- [x] Implement token loading via environment variables
- [x] Restore community bookmarks
- [x] Remove map store and implement service-based approach
- [x] Add placeholder image for missing photos
- [x] Add tests
- [ ] Update build configuration
- [ ] Add documentation
- [ ] Performance optimization
- [ ] Future: Implement search functionality

## Testing Strategy

- [x] Unit tests for services (API service error handling, map bookmarks)
- [ ] Component tests for refactored components
- [ ] Integration tests for API calls
- [ ] Map component tests (future: more coverage)
- [x] Test files use kebab-case naming

## Success Criteria

- [x] No store dependencies
- [x] Simpler architecture
- [x] Better error handling
- [x] Reduced bundle size
- [x] Environment variables properly configured
- [x] Placeholder image for missing photos
- [ ] Improved performance
- [ ] Complete test coverage
- [ ] Future: Search functionality implemented

## Next Actions

1. [x] Implement proper token loading for map components
2. [x] Set up data source for map bookmarks
3. [x] Add placeholder image for missing photos
4. [x] Add tests for new services (API service error handling, map bookmarks)
5. [ ] Update documentation
6. [ ] Future: Implement search functionality
