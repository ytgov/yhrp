# State Management Cleanup Plan

## Overview

This plan outlines the steps to remove unnecessary state management and implement a simpler architecture using Vue 3's Composition API. The application will use local component state and services for data management.

## Current State

- ✅ Removed all store files from `web/src/stores/`:
  - `ApiStore.js` ✅
  - `AuthStore.js` ✅
  - `NotificationStore.js` ✅
  - `UserStore.js` ✅
- ✅ Removed Pinia dependency and imports
- ✅ Successfully refactored components to use Composition API:
  - Created `notificationService.js` for notification handling
  - Created `apiService.js` for API calls
  - Removed user-related functionality
  - Removed SecureAPI component
  - Updated map components to remove store dependencies

## Next Steps

### Phase 1: API Client Implementation (Completed)

- ✅ Create API client service using native `fetch`
- ✅ Implement response caching
- ✅ Add error handling

### Phase 2: Component Refactoring (In Progress)

- ✅ Remove store dependencies from components
- ✅ Implement local state management
- ✅ Update map components to use services
- 🔄 TODO: Implement proper token loading for map components
- 🔄 TODO: Set up proper data source for map bookmarks

### Phase 3: Cleanup and Optimization

- ✅ Remove unused store files
- ✅ Clean up dependencies
- 🔄 TODO: Update build configuration
- 🔄 TODO: Add tests for new services
- 🔄 TODO: Document new architecture

## Implementation Plan

Week 1 (Completed):

- ✅ Remove store files
- ✅ Create notification service
- ✅ Create API service
- ✅ Remove user functionality

Week 2 (In Progress):

- ✅ Update components to use new services
- 🔄 Implement proper token loading
- 🔄 Set up map bookmarks data source
- 🔄 Add tests

Week 3 (Planned):

- 🔄 Update build configuration
- 🔄 Add documentation
- 🔄 Performance optimization

## Testing Strategy

- Unit tests for services
- Component tests for refactored components
- Integration tests for API calls
- Map component tests

## Success Criteria

- ✅ No store dependencies
- ✅ Simpler architecture
- ✅ Better error handling
- ✅ Reduced bundle size
- 🔄 Improved performance
- 🔄 Complete test coverage

## Rollback Plan

1. Keep backup of store files
2. Document all changes
3. Create feature branch for changes
4. Test thoroughly before merging

## Next Actions

1. 🔄 Implement proper token loading for map components
2. 🔄 Set up data source for map bookmarks
3. 🔄 Add tests for new services
4. 🔄 Update documentation
