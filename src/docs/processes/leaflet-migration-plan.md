# Leaflet Migration and Text Case Improvements Plan

## Overview

This document outlines the plan for migrating from ESRI-based maps to Leaflet-based maps and implementing proper text case formatting for place names in the YHRP Site Registry Viewer.

## Background

### Current State

- The application currently uses ESRI ArcGIS JavaScript API for map functionality
- Place names are displayed as received from the API without proper case formatting
- Two main map components: `AdvancedMap.vue` and `BasicMap.vue` (both ESRI-based)
- Existing `PlaceLocationMap.vue` already uses Leaflet successfully

### Goals

1. **Convert to Leaflet-based maps**: Replace ESRI dependencies with Leaflet for better performance and simpler implementation
2. **Implement proper text case**: Convert place names to proper case (Title Case) for better readability
3. **Maintain existing functionality**: Preserve all current map features including bookmarks, layers, and popups

## Implementation Plan

### Phase 1: Text Case Improvements ✅

#### Changes Made

- **File**: `src/web/src/modules/places/models/Place.js`
- **Implementation**: Added `_toProperCase()` method to convert text to proper case
- **Features**:
  - Converts place names to Title Case
  - Handles special cases (articles like "of", "the", "and" remain lowercase in middle of titles)
  - Applied to `this.name` property in constructor

#### Code Example

```javascript
_totoProperCase(text) {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      const smallWords = ['of', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by'];
      if (smallWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
```

### Phase 2: Leaflet Map Migration ✅

#### New Component: `LeafletMap.vue`

- **Location**: `src/web/src/modules/map/components/LeafletMap.vue`
- **Replaces**: `BasicMap.vue` and `AdvancedMap.vue`
- **Dependencies**: Already available (`leaflet@1.9.4`, `esri-leaflet@3.0.16`)

#### Key Features Implemented

1. **Base Layer Switching**

   - ESRI Topographic (default)
   - ESRI Streets
   - Satellite imagery
   - Terrain (OpenTopoMap)

2. **Community Bookmarks**

   - Interactive list in sidebar
   - Click to navigate to bookmark location
   - Preserves existing bookmark data structure

3. **Feature Layers**

   - Historic sites layer (teal markers)
   - Airplane crash sites layer (orange markers)
   - Rich popup content with site details
   - "View Details" buttons linking to site pages

4. **UI Components**
   - Sidebar with tabs (Communities, Basemap, Legend)
   - Settings button for sidebar toggle
   - Legend showing marker types
   - Responsive design

#### Popup System Improvements ✅

**Initial Approach**: Attempted to use Vue components with Vuetify for popup content

- **Challenge**: Vuetify components don't render properly when converted to HTML for Leaflet popups
- **Solution**: Switched to plain HTML with inline styles for reliable rendering

**Final Implementation**:

- **Content**: Place image, title, and "View Details" button
- **Styling**: White background with card-like appearance (4px border-radius)
- **Colors**: Uses Yukon Government theme colors (`yg_blue: #0097a9`)
- **Layout**: Centered content with proper spacing and typography

**Popup Features**:

- Responsive image display (max-width: 250px)
- Place name in Title Case
- "View Details" button linking to place details page
- Clean, modern design with proper shadows and spacing

#### CSS Organization Improvements ✅

**Problem**: `markerStyles.css` contained both marker and popup styles
**Solution**: Separated concerns by moving popup styles to their respective components

**Changes Made**:

- **`markerStyles.css`**: Now contains only marker-related styles
- **`PlaceLocationMap.vue`**: Contains teal-themed popup styles
- **`LeafletMap.vue`**: Contains white-themed popup styles with card-like appearance
- **Removed**: Unused `PlacePopup.vue` component

**Benefits**:

- Better separation of concerns
- Component-specific styling
- Easier maintenance and customization
- Cleaner codebase

#### Map Service Updates

- **File**: `src/web/src/modules/map/services/mapService.js`
- **Added**: `userInRole()` method for feature access control
- **Maintains**: Existing bookmark and token functionality

#### Router Updates

- **File**: `src/web/src/modules/map/router/index.js`
- **Change**: Updated to use `LeafletMap` instead of `BasicMap`

## Technical Details

### Dependencies

```json
{
  "leaflet": "^1.9.4",
  "esri-leaflet": "^3.0.16"
}
```

### Key Libraries Used

- **Leaflet**: Core mapping library
- **ESRI Leaflet**: ESRI service integration
- **Vue 3 Composition API**: Component structure
- **Vuetify**: UI components

### Map Configuration

- **Center**: Yukon Territory (60.45, -135.5)
- **Default Zoom**: 6
- **Base Layer**: ESRI Topographic
- **Markers**: Custom styled circle markers

### Feature Layer Configuration

```javascript
// Historic Sites
url: `${MAPS_URL}/sites/0`;
color: "#0097a9";
radius: 6;

// Crash Sites
url: `${MAPS_URL}/sites/1`;
color: "#ff5722";
radius: 6;
```

### Known Issues and Future Improvements

#### ESRI Basemap Warning

**Warning**: `L.esri.BasemapLayer` uses data services that are in mature support and are not being updated. Please use `L.esri.Vector.vectorBasemapLayer` instead.

**Current Implementation**: Using `esriLeaflet.basemapLayer("Topographic")` and `esriLeaflet.basemapLayer("Streets")`

**Recommended Solution**: Migrate to vector basemap layers for better performance and future support:

```javascript
// Current implementation (deprecated)
currentBaseLayer = esriLeaflet
  .basemapLayer("Topographic", {
    attribution: layer.attribution,
  })
  .addTo(map);

// Future implementation (recommended)
currentBaseLayer = esriLeaflet.Vector.vectorBasemapLayer("ArcGIS:Topographic", {
  attribution: layer.attribution,
}).addTo(map);
```

**Benefits of Vector Basemaps**:

- Better performance and smaller file sizes
- Improved rendering quality at all zoom levels
- Future-proof as ESRI continues to develop vector services
- Better mobile performance

**Migration Priority**: Medium - Should be addressed in future update but doesn't affect current functionality.

## Benefits of Migration

### Performance

- **Smaller bundle size**: Leaflet is lighter than ESRI API
- **Faster loading**: No heavy ESRI module loading
- **Better caching**: Standard tile layer caching

### Maintainability

- **Simpler codebase**: Less complex than ESRI implementation
- **Better documentation**: Leaflet has extensive community resources
- **Easier debugging**: Standard web technologies

### Flexibility

- **Multiple tile providers**: Easy to switch between different map services
- **Custom styling**: More control over marker and popup appearance
- **Mobile friendly**: Better touch interaction support

## Testing Strategy

### Manual Testing Checklist

- [ ] Map loads correctly on page load
- [ ] Base layer switching works for all options
- [ ] Community bookmarks navigate to correct locations
- [ ] Feature layers display with correct styling
- [ ] Popups show correct information
- [ ] "View Details" buttons work correctly
- [ ] Sidebar opens/closes properly
- [ ] Responsive design works on different screen sizes
- [ ] Popup images display correctly
- [ ] Popup titles show in proper case
- [ ] Popup styling matches design (white background, card-like appearance)
- [ ] Button colors use Yukon Government theme colors
- [ ] Popup close functionality works properly

### Text Case Testing

- [ ] Place names display in proper case
- [ ] Special words (of, the, and) remain lowercase in middle
- [ ] First and last words are capitalized
- [ ] Empty/null names handled gracefully

## Rollback Plan

If issues arise, we can quickly rollback by:

1. Reverting router changes to use `BasicMap`
2. Keeping the new `LeafletMap` component for future use
3. Text case improvements can be disabled by commenting out the `_toProperCase()` call

## Future Enhancements

### Potential Improvements

1. **Search functionality**: Add search widget to map
2. **Clustering**: Group nearby markers for better performance
3. **Custom markers**: Use custom icons instead of circle markers
4. **Layer filtering**: Add filters for different site types
5. **Export functionality**: Allow users to export map data
6. **ESRI Vector Basemap Migration**: Update from deprecated `L.esri.BasemapLayer` to `L.esri.Vector.vectorBasemapLayer` for better performance and future support

### Performance Optimizations

1. **Marker clustering**: For large datasets
2. **Lazy loading**: Load features as needed
3. **Caching**: Cache map tiles and feature data
4. **Compression**: Optimize bundle size further
5. **Vector basemaps**: Migrate to ESRI vector basemap layers for improved performance

## Documentation Updates

### Files to Update

- [ ] Update `CHANGELOG.md` with migration details
- [ ] Update `feedback-ui-improvements.md` to mark map conversion complete
- [ ] Update map module README with new component information
- [ ] Add migration notes to development documentation

### API Documentation

- [ ] Document new map component props and events
- [ ] Update service method documentation
- [ ] Add examples of custom marker styling

## Conclusion

This migration provides a solid foundation for future map enhancements while maintaining all existing functionality. The Leaflet-based implementation is more maintainable, performant, and flexible than the previous ESRI-based solution.

The text case improvements enhance the user experience by making place names more readable and professional-looking.

---

**Status**: ✅ Implementation Complete
**Branch**: `leaflet-migration-and-text-fixes`
**Created**: December 2024
**Last Updated**: December 2024
