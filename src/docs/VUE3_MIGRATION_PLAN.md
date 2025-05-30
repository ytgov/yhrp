# Vue 3 Migration and Backend Cleanup Plan

## Overview

This document outlines the plan for upgrading the frontend from Vue 2 to Vue 3 and optimizing the application for consuming the YHRP site registry API.

## Current Structure

- Frontend: Vue 3 application in `web/` (already migrated)
- External API: YHRP site registry API (https://github.com/ytgov/yhsi/blob/main/src/api/routes/register-router.ts)

## Migration Steps

### Phase 1: Frontend Migration Preparation [x]

1. **Create New Vue 3 Project Structure** [x]

   - [x] Create new directory `web/`
   - [x] Set up Vue 3 with TypeScript
   - [x] Configure build tools (Vite)
   - [x] Set up testing framework

2. **Dependency Analysis** [x]

   - [x] Audit current Vue 2 dependencies
   - [x] Identify Vue 3 compatible alternatives
   - [x] Create new `package.json` with updated dependencies
   - Current key dependencies:
     - Vue 3.2.38
     - Vuetify 3.1.7
     - Pinia 2.0.27 (to be evaluated if needed)
     - Vue Router 4.1.6
     - Axios for API calls

3. **Component Migration Strategy** [x]
   - [x] List all Vue 2 components
   - [x] Identify components using deprecated features
   - [x] Plan for Composition API adoption
   - [x] Create migration checklist for each component

### Phase 2: API Integration Optimization

1. **API Integration Review** [x]

   - [x] Review YHRP site registry API endpoints
   - [x] Document required endpoints
   - [x] Plan API integration improvements

   API Integration Tasks:

   - [x] Create API client service
   - [x] Add proper error handling
   - [x] Add request/response type definitions
   - [x] Add loading states
   - [x] Add error states
   - [ ] Add retry logic for failed requests

2. **State Management Evaluation** [x]

   - [x] Evaluate if Pinia is needed
   - [x] Consider simpler alternatives:
     - [x] Vue's built-in reactive system
     - [x] Composition API with `ref`/`reactive`
     - [x] Simple store pattern if needed
   - [x] Document state management decision
   - [x] Remove all store files and Pinia dependency
   - [x] Implement service-based architecture:
     - [x] Created notification service
     - [x] Created API service
     - [x] Removed user-related functionality
     - [x] Updated map components to use services
     - [x] Implemented environment variable based ArcGIS token loading

3. **Performance Optimization**
   - [ ] Implement data caching strategy
   - [ ] Add request debouncing
   - [ ] Add response caching
   - [ ] Optimize bundle size
   - [ ] Add performance monitoring

### Phase 3: Frontend Migration [x]

1. **Core Features Migration** [x]

   - [x] Set up new routing system
   - [x] Migrate core components
   - [x] Update state management
   - [x] Implement new API integration

2. **UI/UX Updates** [x]

   - [x] Review and update UI components
   - [x] Implement new Vue 3 features
   - [x] Update styling system (Vuetify 3)
   - [x] Ensure responsive design
   - [x] Add placeholder image for missing photos

3. **Testing**
   - [x] Add unit tests for services (API service error handling, map bookmarks)
   - [ ] Add component tests for refactored components
   - [ ] Add API integration tests
   - [ ] Add E2E tests
   - [ ] Add performance tests

## Migration Checklist

### Frontend

- [x] Set up Vue 3 project structure
- [x] Migrate core components
- [x] Update routing system
- [x] Evaluate and implement state management
- [x] Update API integration
- [ ] Migrate tests
- [ ] Performance testing
- [ ] Browser compatibility testing

### API Integration

- [x] Create API client service
- [x] Add proper error handling
- [x] Add request/response type definitions
- [x] Add loading states
- [x] Add error states
- [x] Add retry logic
- [ ] Implement caching strategy

## Timeline

1. [x] **Week 1-2**: Frontend Migration Preparation
2. [x] **Week 3-4**: Frontend Migration
3. [x] **Week 5-6**: API Integration
   - Week 5: API client implementation
   - Week 6: Error handling and caching
4. **Week 7-8**: Testing and Optimization
   - Week 7: Testing implementation
   - Week 8: Performance optimization
5. **Week 9-10**: Documentation and Deployment

## Risk Mitigation

1. **API Integration** [x]

   - [x] Monitor API response times
   - [x] Implement fallback strategies
   - [x] Document API limitations

2. **Testing Strategy**

   - [x] Implement comprehensive testing for services
   - [ ] Set up staging environment
   - [ ] Plan for gradual rollout

3. **Performance Monitoring**
   - [ ] Set up monitoring tools
   - [ ] Define performance metrics
   - [ ] Plan for optimization

## Success Criteria

1. [x] All Vue 2 features successfully migrated to Vue 3
2. [x] No regression in functionality
3. [ ] Improved performance metrics
4. [x] Clean, maintainable codebase
5. [ ] Comprehensive test coverage
6. [ ] Updated documentation

## Next Steps

1. [x] Review and approve migration plan
2. [x] Set up development environment
3. [x] Complete frontend migration
4. [x] Complete API integration optimization
5. Implement testing strategy
6. Implement caching and performance optimizations
7. Regular progress reviews
8. Adjust plan as needed
