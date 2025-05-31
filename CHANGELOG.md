# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added placeholder image for missing photos.
- Added tests for API service error handling and map bookmarks.
- Added ESRI CSS to index.html for proper map styling.
- Added new documentation structure with improved organization.
- Added service-based architecture for better state management.
- Added environment variable based ArcGIS token loading.
- Added 404 Not Found page and catch-all route.
- Places module API service with mock data integration
- Proper error handling and loading states in Places views
- Pagination support for places list
- New services directory for Places module
- Added rich mock data for historic places with detailed information
- Added markdown-based mock data structure for better maintainability
- Added custom markdown parser for historic places data (this could be replaced by a library or removed down the road)
- Added support for nested sections in markdown parsing
- Added proper handling of heritage values and historical sources

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
- Updated Places view to use transformed API data structure
- Improved route parameter naming for consistency
- Removed 6-item limit on places list display
- Removed unused dependencies (axios, roboto-fontface)
- Enhanced Places form view to display rich data structure
- Updated mock data format to match real API structure
- Improved data organization in Places views
- Refactored markdown parser for better maintainability
- Improved heritage values and historical sources parsing
- Enhanced data transformation in Places API service

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
- Property name mismatches between API service and views
- Error handling in Places view data fetching
- Fixed image loading in Places form view
- Fixed heritage values section parsing in markdown
- Fixed subsection title formatting in markdown parser
- Fixed data transformation for Places API service

## [Previous Version]

- Initial release and previous changes.
