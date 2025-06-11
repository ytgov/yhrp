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

- [ ] Confirm all API calls use root: `https://yhis.gov.yk.ca/api/register/`

---

## Notes

- Awaiting eServices footer standards and updated homepage verbiage
- Awaiting mock-up for place form layout
- Reference: Feedback received [date]

---

_Update this checklist as work progresses. Link to relevant PRs/issues as needed._
