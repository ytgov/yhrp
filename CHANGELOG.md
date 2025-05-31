# Changelog

## [Unreleased]

### Added

- Added placeholder image for missing photos.
- Added tests for API service error handling and map bookmarks.
- Added ESRI CSS to index.html for proper map styling.
- Added new documentation structure with improved organization.
- Added service-based architecture for better state management.
- Added environment variable based ArcGIS token loading.
- Added 404 Not Found page and catch-all route.

### Changed

- Removed all store files and dependencies, transitioning to Vue 3's Composition API.
- Implemented environment variable based ArcGIS token loading.
- Restored 22 community bookmarks with original UTM coordinates.
- Updated URL configurations for API endpoints.
- Test files now use kebab-case naming.
- Configured Dojo loader in AdvancedMap component for proper ESRI initialization.
- Updated ESRI module loading configuration.
- Reorganized repository structure:
  - Moved web directory to src
  - Updated Dockerfile for new structure
  - Implemented feature-based organization for frontend modules
  - Standardized naming conventions across the codebase
- Improved API integration:
  - Created API client service
  - Added proper error handling
  - Added request/response type definitions
  - Added loading and error states
- Updated build and development configuration.

### Removed

- Removed Pinia dependency and imports.
- Removed user-related functionality and SecureAPI component.
- Removed unused imports and parameters in API services.
- Removed empty store directories.
- Removed unused authorization.js.
- Removed .DS_Store files.
- Removed old web directories.

### Fixed

- Fixed 404 error related to the import of `no_photo_base64`.
- Fixed ESRI map loader initialization issues.
- Fixed TypeScript compilation errors in API services.
- Fixed layout bug introduced by package upgrade.
- Fixed router for maps.
- Fixed build pipeline issues.

## [Previous Version]

- Initial release and previous changes.
