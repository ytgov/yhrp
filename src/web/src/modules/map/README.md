# Map Module

## Purpose and Responsibilities

The Map module is responsible for map visualization and related interactions within the YHRP Site Registry Viewer. It provides reusable components and services for displaying, interacting with, and managing map data using ArcGIS/Esri APIs.

## Directory Structure & Key Files

- **components/**

  - `AdvancedMap.vue`: Feature-rich map component with sidebar tabs (Layers, Basemap, Legend), ArcGIS widgets, and popups for sites and airplane crashes.
  - `BasicMap.vue`: Simpler map component with sidebar tabs (Communities, Basemap, Legend), supports bookmarks and site popups.
  - `__tests__/`: _(Currently empty; no component tests present)_

- **views/**

  - `Maps.vue`: Main view for the map module, embeds `AdvancedMap` and manages layout/height.

- **services/**

  - `map-service.js`: Provides state and logic for map features (e.g., loading tokens, bookmarks, search stub). Exposes a composable for use in components. Eventually this should
    contain the API logic to surface data to the maps
  - `__tests__/map-service.test.js`: Unit tests for the map service, focusing on bookmarks and data structure.

- **data/**

  - `communityBookmarks.js`: Static data file with map bookmarks for Yukon communities, used for quick navigation.

- **router/**
  - `index.js`: Defines the `/map` route, rendering the `BasicMap` component by default.

## API Integration Points

- All API calls related to map data fetching and updates are handled in the `services/` directory.
- Search by YHSI ID is stubbed and will be implemented when the API is ready.

## Dependencies

- Vue.js
- Vue Router
- ArcGIS/Esri JavaScript API (via `esri-loader`)
- Vuetify (for UI components)

## Setup Instructions

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```
2. Import and use map components in your views as needed.
3. Update or add new services in the `services/` directory for API integration.
4. To add new bookmarks, update `data/communityBookmarks.js`.

---

For more details on module structure and conventions, see the main project documentation.

## Future Work

- **Migrate from esri-loader**: esri-loader is deprecated. Move to a supported ArcGIS integration method or alternative mapping library.
- **Explore alternative mapping components**: Investigate and potentially add mapping components based on Leaflet or other open-source mapping libraries.
- **Implement full API integration**: Complete the stubbed API logic in `map-service.js` for dynamic data.
- **Add component tests**: Expand test coverage, especially for map components.
- **Enhance accessibility and performance**: Review and improve accessibility and performance of map features.
- **Ensure API notifications are surfaced**: Make sure that API errors and status messages are displayed to users via popups or notifications for better user feedback.
