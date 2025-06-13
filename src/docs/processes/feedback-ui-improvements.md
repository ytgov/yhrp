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

- [ ] Remove the blue mobile region (previously linked to custom app)
- [ ] Update homepage verbiage (pending new text)

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

## API

- [x] Confirm all API calls use root: `https://yhis.gov.yk.ca/api/register/`
- [x] Implement proper pagination handling in frontend and backend
- [x] Handle image data conversion from Buffer to base64 for thumbnails
- [x] Refactor Place model and API service for better organization
  - [x] Extract Place model to separate file
  - [x] Move photo fetching to placesApi service
  - [x] Improve photo URL generation in Place model

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
  - [ ] Fix broken photo display on Places.vue

- [x] **DesktopNavbar.vue**

  - [x] Add French language toggle text
  - [x] Update menu icon to hamburger style
  - [x] Increase menu icon size for better visibility

- [ ] **Testing**
  - [ ] Test each component to ensure it correctly displays data from the real API.
  - [ ] Verify that images, descriptions, and other details are rendered correctly.

---

## Recent Changes

1. Refactored Place model and API service for better organization
   - Extracted Place model to separate file
   - Moved photo fetching to placesApi service
   - Improved photo URL generation in Place model
2. Enhanced desktop navbar
   - Added French language toggle text
   - Updated menu icon to hamburger style
   - Increased menu icon size
3. Removed unused yarn.lock file (project uses npm)
4. Updated Places.vue to use direct image URLs instead of base64 thumbnails
5. Implemented proper pagination handling in both frontend and backend
6. Cleaned up debug code and console logs
7. Fixed image display in PlaceCard component
8. Updated field mapping to match API response structure
9. Moved print button to app bar and removed language selector from header
10. Flattened PlaceForm layout and improved text formatting
11. Added spacing between print icon and text in app bar
12. Ensured historical sources and other formatted text respect original spacing and line breaks
13. Started ESRI map implementation with proper layer configuration
14. Removed unused map layer options to simplify the interface
15. Implemented Photo model and updated PlaceGallery component to use it
16. Fixed image loading and display in PlaceGallery component
17. Updated API response handling for photos and metadata

---

## Notes

- Awaiting eServices footer standards and updated homepage verbiage
- Reference: Feedback received June 10, 2024

---

_Update this checklist as work progresses. Link to relevant PRs/issues as needed._
