import L from "leaflet";

/**
 * Marker Definitions
 *
 * This file contains all custom marker icon definitions used across the map components.
 * Each marker type has its own icon with consistent styling and sizing.
 */

/**
 * Create a teal pin-style marker (used in PlaceLocationMap)
 * @returns {L.DivIcon} Leaflet div icon
 */
export const createTealPinMarker = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-pin"></div>
    `,
    iconSize: [25, 35],
    iconAnchor: [12.5, 35],
    popupAnchor: [0, -35],
  });
};

/**
 * Create a green circular marker for places (used in LeafletMap)
 * @returns {L.DivIcon} Leaflet div icon
 */
export const createPlaceMarker = () => {
  return L.divIcon({
    className: "custom-place-marker",
    html: `
      <div class="place-marker-pin">
        <div class="place-marker-inner"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

/**
 * Create a teal circular marker for historic sites
 * @returns {L.DivIcon} Leaflet div icon
 */
export const createHistoricSiteMarker = () => {
  return L.divIcon({
    className: "custom-historic-site-marker",
    html: `
      <div class="historic-site-marker-pin">
        <div class="historic-site-marker-inner"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

/**
 * Create an orange circular marker for crash sites
 * @returns {L.DivIcon} Leaflet div icon
 */
export const createCrashSiteMarker = () => {
  return L.divIcon({
    className: "custom-crash-site-marker",
    html: `
      <div class="crash-site-marker-pin">
        <div class="crash-site-marker-inner"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

/**
 * Marker types enum for easy reference
 */
export const MarkerTypes = {
  TEAL_PIN: "teal-pin",
  PLACE: "place",
  HISTORIC_SITE: "historic-site",
  CRASH_SITE: "crash-site",
};

/**
 * Get marker by type
 * @param {string} type - Marker type from MarkerTypes enum
 * @returns {L.DivIcon} Leaflet div icon
 */
export const getMarkerByType = (type) => {
  switch (type) {
    case MarkerTypes.TEAL_PIN:
      return createTealPinMarker();
    case MarkerTypes.PLACE:
      return createPlaceMarker();
    case MarkerTypes.HISTORIC_SITE:
      return createHistoricSiteMarker();
    case MarkerTypes.CRASH_SITE:
      return createCrashSiteMarker();
    default:
      return createTealPinMarker(); // Default fallback
  }
};
