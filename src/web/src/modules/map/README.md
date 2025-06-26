# Map Module

## Purpose and Responsibilities

The Map module is responsible for map visualization and related interactions within the YHRP Site Registry Viewer. It provides reusable components and services for displaying, interacting with, and managing map data using Leaflet and ESRI Leaflet APIs.

## Directory Structure & Key Files

- **components/**

  - `LeafletMap.vue`: **Primary map component** - Feature-rich Leaflet-based map with sidebar tabs (Communities, Basemap, Legend), base layer switching, community bookmarks, and feature layers for historic sites and crash sites.
  - `PlaceLocationMap.vue`: Leaflet-based component for displaying individual place locations with custom markers and popups.
  - `AdvancedMap.vue`: **Legacy ESRI-based component** - Previously used for feature-rich map functionality (now replaced by LeafletMap).
  - `BasicMap.vue`: **Legacy ESRI-based component** - Previously used for simpler map functionality (now replaced by LeafletMap).
  - `__tests__/`: _(Currently empty; no component tests present)_

- **views/**

  - `Maps.vue`: Main view for the map module, embeds `AdvancedMap` and manages layout/height.

- **services/**

  - `map-service.js`: Provides state and logic for map features (e.g., loading tokens, bookmarks, search stub, user role checking). Exposes a composable for use in components. Eventually this should contain the API logic to surface data to the maps.
  - `__tests__/map-service.test.js`: Unit tests for the map service, focusing on bookmarks and data structure.

- **data/**

  - `communityBookmarks.js`: Static data file with map bookmarks for Yukon communities, used for quick navigation.

- **router/**
  - `index.js`: Defines the `/map` route, rendering the `LeafletMap` component by default.

## Map Implementation

### Current Implementation: LeafletMap.vue

The primary map component now uses **Leaflet** with **ESRI Leaflet** for enhanced functionality:

#### Key Features

- **Base Layer Switching**: ESRI Topographic (default), ESRI Streets, Satellite, Terrain
- **Community Bookmarks**: Interactive list with click-to-navigate functionality
- **Feature Layers**:
  - Historic sites (teal markers)
  - Airplane crash sites (orange markers)
- **Rich Popups**: Detailed site information with "View Details" buttons
- **Responsive Sidebar**: Tabs for Communities, Basemap, and Legend
- **Custom Styling**: Professional appearance with consistent branding

#### Technical Stack

- **Leaflet**: Core mapping library for performance and flexibility
- **ESRI Leaflet**: ESRI service integration for base layers and feature services
- **Vue 3 Composition API**: Modern component structure
- **Vuetify**: UI components for sidebar and controls

#### Benefits Over Previous ESRI Implementation

- **Better Performance**: Smaller bundle size and faster loading
- **Improved Maintainability**: Simpler codebase with better documentation
- **Enhanced Flexibility**: Easy customization and multiple tile providers
- **Mobile Friendly**: Better touch interaction support

### Legacy Components

The following components are maintained for reference but are no longer actively used:

- `AdvancedMap.vue`: ESRI-based implementation with complex widget integration
- `BasicMap.vue`: ESRI-based implementation with basic functionality

## API Integration Points

- All API calls related to map data fetching and updates are handled in the `services/` directory.
- Search by YHSI ID is stubbed and will be implemented when the API is ready.
- Feature layers connect to ESRI services for historic sites and crash sites.

## Dependencies

- Vue.js
- Vue Router
- Leaflet (via `leaflet` package)
- ESRI Leaflet (via `esri-leaflet` package)
- Vuetify (for UI components)

## Setup Instructions

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```
2. Import and use map components in your views as needed.
3. Update or add new services in the `services/` directory for API integration.

## Migration Notes

### From ESRI to Leaflet

The module has been migrated from ESRI ArcGIS JavaScript API to Leaflet for better performance and maintainability. Key changes include:

- **Replaced**: `AdvancedMap.vue` and `BasicMap.vue` with `LeafletMap.vue`
- **Maintained**: All existing functionality including bookmarks, layers, and popups
- **Enhanced**: Better performance, simpler codebase, and improved customization options

### Configuration

- **Center**: Yukon Territory (60.45, -135.5)
- **Default Zoom**: 6
- **Base Layer**: ESRI Topographic
- **Markers**: Custom styled circle markers

## Future Enhancements

Potential improvements for the map module include:

- Search functionality with geocoding
- Marker clustering for large datasets
- Custom marker icons
- Layer filtering and controls
- Export functionality
- Advanced popup customization
