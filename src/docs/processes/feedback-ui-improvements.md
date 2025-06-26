# Feedback & UI Improvements Tracking

This document tracks the feedback received and the planned improvements for the YHRP Site Registry Viewer UI, as of [date].

---

## General Application

- [x] Update French/English selector to match yukon.ca
- [ ] Implement footer as per eServices standards (blue, northern lights motif, required fields)
  - [ ] Duplicate the look and behaviour of the footer from [yukon.ca](https://yukon.ca), including style, layout, and interactive elements
- [ ] Move "Contact Us" to the footer (remove from help menu)

---

## Home Page

- [x] Remove the blue mobile region (previously linked to custom app)
- [ ] Update homepage verbiage (pending new text)
- [ ] Set homepage carosel to use API calls

---

## Place Form

- [ ] Fix carousel so switching pictures does not scroll to top
- [x] Add teaser line under photo and map
- [x] Change map background to ESRI Topographic base ([ArcGIS Leaflet docs](https://developers.arcgis.com/esri-leaflet/maps/change-the-basemap-style/))
- [x] Center the point in the middle of the map
- [x] Move print button to right-hand side
- [x] Only include elements/fields shown in the provided mock-up
- [x] Remove navigation between sections; allow scrolling
- [ ] Ensure secondary title displays place name (not address)
- [x] Flattened PlaceForm layout and improved text formatting
- [x] Print button is now in the app bar, right-aligned
- [x] Print button spacing improved

---

## Map System

- [x] Convert to Leaflet-based map system
  - [x] Create new LeafletMap component to replace ESRI-based maps
  - [x] Implement base layer switching (Topographic, Streets, Satellite, Terrain)
  - [x] Add community bookmarks functionality
  - [x] Implement feature layers for historic sites and crash sites
  - [x] Add rich popup content with site details
  - [x] Update map router to use new LeafletMap component
  - [x] Maintain all existing functionality while improving performance

---

## Text Formatting

- [x] Implement proper case formatting for place names
  - [x] Add `_toProperCase()` method to Place model
  - [x] Handle special cases (articles like "of", "the", "and")
  - [x] Apply proper case to place names in constructor
  - [x] Ensure first and last words are capitalized

---

## API

- [x] Confirm all API calls use root: `https://yhis.gov.yk.ca/api/register/`
- [x] Implement proper pagination handling in frontend and backend
- [x] Handle image data conversion from Buffer to base64 for thumbnails
- [x] Refactor Place model and API service for better organization
  - [x] Extract Place model to separate file
  - [x] Move photo fetching to placesApi service
  - [x] Improve photo URL generation in Place model
- [x] Implement caching system for API responses
  - [x] Add 15-minute TTL cache for all API responses
  - [x] Implement cache-aware fetch wrapper
  - [x] Cache place listings, details, and photos

---

## Frontend Vue Components Update Plan

- [x] **PlaceCard.vue**

  - [x] Update `imageUrl` prop to use direct image URL from API
  - [x] Map title and subtitle to correct fields (`name` and `location`)
  - [x] Implement proper click handling for navigation

- [ ] **PlaceInfo.vue**

  - [x] Adjust rendering logic if the API response structure differs from the current mock data.

- [x] **PlaceHeader.vue**

  - [x] Ensure the `placeName` prop is correctly populated from the real API response (e.g., using `primaryName`).
  - [x] Move print button to app bar, remove language selector from header.
  - [x] Add spacing between print icon and text.

- [x] **PlaceGallery.vue**

  - [x] Update the `photoURL` method to use the correct URL structure for fetching images from the real API.
  - [x] Ensure the `photos` prop is correctly populated from the API response.

- [x] **Places.vue**

  - [x] Implement proper pagination with v-pagination component
  - [x] Add loading states and error handling
  - [x] Update image handling to use direct URLs
  - [x] Clean up debug code and console logs
  - [x] Fix broken photo display on Places.vue

- [x] **DesktopNavbar.vue**

  - [x] Add French language toggle text
  - [x] Update menu icon to hamburger style
  - [x] Increase menu icon size for better visibility

- [x] **LeafletMap.vue** (New Component)

  - [x] Replace ESRI-based map components with Leaflet implementation
  - [x] Implement base layer switching functionality
  - [x] Add community bookmarks with navigation
  - [x] Create feature layers for historic sites and crash sites
  - [x] Add rich popup content with site details
  - [x] Implement responsive sidebar with tabs
  - [x] Add legend showing marker types

- [ ] **Testing**
  - [ ] Test each component to ensure it correctly displays data from the real API.
  - [ ] Verify that images, descriptions, and other details are rendered correctly.

---

## Recent Changes

1. **Leaflet Map Migration**

   - Created new LeafletMap component to replace ESRI-based maps
   - Implemented base layer switching (Topographic, Streets, Satellite, Terrain)
   - Added community bookmarks functionality with interactive navigation
   - Created feature layers for historic sites (teal) and crash sites (orange)
   - Added rich popup content with site details and "View Details" buttons
   - Updated map router to use new LeafletMap component
   - Added userInRole method to map service for feature access control

2. **Text Case Improvements**

   - Added `_toProperCase()` method to Place model
   - Implemented proper case formatting for place names
   - Handled special cases for articles (of, the, and, etc.)
   - Applied proper case to place names in constructor

3. **Documentation Updates**

   - Created comprehensive Leaflet migration plan document
   - Updated feedback tracking with new completed tasks
   - Documented technical implementation details

4. Implemented caching system for API responses
   - Added 15-minute TTL cache using node-cache
   - Created cache-aware fetch wrapper
   - Implemented caching for place listings, details, and photos
5. Refactored Place model and API service for better organization
   - Extracted Place model to separate file
   - Moved photo fetching to placesApi service
   - Improved photo URL generation in Place model
6. Enhanced desktop navbar
   - Added French language toggle text
   - Updated menu icon to hamburger style
   - Increased menu icon size
7. Removed unused yarn.lock file (project uses npm)
8. Updated Places.vue to use direct image URLs instead of base64 thumbnails
9. Implemented proper pagination handling in both frontend and backend
10. Cleaned up debug code and console logs
11. Fixed image display in PlaceCard component
12. Updated field mapping to match API response structure
13. Moved print button to app bar and removed language selector from header
14. Flattened PlaceForm layout and improved text formatting
15. Added spacing between print icon and text in app bar
16. Ensured historical sources and other formatted text respect original spacing and line breaks
17. Started ESRI map implementation with proper layer configuration
18. Removed unused map layer options to simplify the interface
19. Implemented Photo model and updated PlaceGallery component to use it
20. Fixed image loading and display in PlaceGallery component
21. Updated API response handling for photos and metadata

---

## Notes

- Awaiting eServices footer standards and updated homepage verbiage
- Reference: Feedback received June 10, 2024
- Leaflet migration provides better performance and maintainability
- Text case improvements enhance readability and professionalism

---

_Update this checklist as work progresses. Link to relevant PRs/issues as needed._
