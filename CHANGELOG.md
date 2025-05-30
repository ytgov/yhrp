# Changelog

## [Unreleased]

### Added

- Added placeholder image for missing photos.
- Added tests for API service error handling and map bookmarks.

### Changed

- Removed all store files and dependencies, transitioning to Vue 3's Composition API.
- Implemented environment variable based ArcGIS token loading.
- Restored 22 community bookmarks with original UTM coordinates.
- Updated URL configurations for API endpoints.
- Test files now use kebab-case naming.

### Removed

- Removed Pinia dependency and imports.
- Removed user-related functionality and SecureAPI component.

### Fixed

- Fixed 404 error related to the import of `no_photo_base64`.

## [Previous Version]

- Initial release and previous changes.
