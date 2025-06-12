# Feedback & UI Improvements Tracking

This document tracks the feedback received and the planned improvements for the YHRP Site Registry Viewer UI, as of [date].

---

## General Application

- [ ] Update French/English selector to match yukon.ca
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
- [ ] Add teaser line under photo and map
- [ ] Change map background to ESRI Topographic base ([ArcGIS Leaflet docs](https://developers.arcgis.com/esri-leaflet/maps/change-the-basemap-style/))
- [ ] Center the point in the middle of the map
- [ ] Move print button to right-hand side
- [ ] Only include elements/fields shown in the provided mock-up
- [ ] Remove navigation between sections; allow scrolling
- [ ] Ensure secondary title displays place name (not address)

---

## API

- [x] Confirm all API calls use root: `https://yhis.gov.yk.ca/api/register/`
- [x] Implement proper pagination handling in frontend and backend
- [x] Handle image data conversion from Buffer to base64 for thumbnails

---

## Frontend Vue Components Update Plan

- [x] **PlaceCard.vue**

  - [x] Update `imageUrl` prop to use direct image URL from API
  - [x] Map title and subtitle to correct fields (`name` and `location`)
  - [x] Implement proper click handling for navigation

- [ ] **PlaceInfo.vue**

  - [ ] Update props to match the real API response structure (e.g., `placeDescription`, `heritageValue`, `culturalHistory`, `historicalSources`).
  - [ ] Adjust rendering logic if the API response structure differs from the current mock data.

- [ ] **PlaceHeader.vue**

  - [ ] Ensure the `placeName` prop is correctly populated from the real API response (e.g., using `primaryName`).

- [ ] **PlaceGallery.vue**

  - [ ] Update the `photoURL` method to use the correct URL structure for fetching images from the real API.
  - [ ] Ensure the `photos` prop is correctly populated from the API response.

- [x] **Places.vue**

  - [x] Implement proper pagination with v-pagination component
  - [x] Add loading states and error handling
  - [x] Update image handling to use direct URLs
  - [x] Clean up debug code and console logs

- [ ] **Testing**
  - [ ] Test each component to ensure it correctly displays data from the real API.
  - [ ] Verify that images, descriptions, and other details are rendered correctly.

---

## Recent Changes

1. Updated Places.vue to use direct image URLs instead of base64 thumbnails
2. Implemented proper pagination handling in both frontend and backend
3. Cleaned up debug code and console logs
4. Fixed image display in PlaceCard component
5. Updated field mapping to match API response structure

---

## Notes

- Awaiting eServices footer standards and updated homepage verbiage
- Awaiting mock-up for place form layout
- Reference: Feedback received [date]

---

_Update this checklist as work progresses. Link to relevant PRs/issues as needed._
