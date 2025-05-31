/**
 * Places API Service
 * Handles all API interactions for the Places module
 */
import mockPlaces from "../data/places.json";

// Types
/**
 * @typedef {Object} Place
 * @property {string} id - Unique identifier
 * @property {string} name - Place name
 * @property {string} description - Place description
 * @property {string} [image] - Base64 encoded image
 * @property {Object} location - Location coordinates
 * @property {number} location.lat - Latitude
 * @property {number} location.lng - Longitude
 */

/**
 * @typedef {Object} PlacesResponse
 * @property {Place[]} data - Array of places
 * @property {Object} meta - Pagination metadata
 * @property {number} meta.page - Current page number
 * @property {number} meta.page_size - Number of items per page
 * @property {number} meta.item_count - Total number of items
 * @property {number} meta.page_count - Total number of pages
 */

/**
 * Transform mock place data to match API format
 * @param {Object} place - Raw place data from mock
 * @returns {Place}
 */
const transformPlace = (place) => ({
  id: place.PlaceId,
  name: place.PrimaryName,
  description: place.EnglishTeaser,
  location: {
    lat: place.Latitude,
    lng: place.Longitude,
  },
  community: place.Community,
  yhsiId: place.YHSIId,
  designations: place.Designations,
  recognitionDate: place.RecognitionDate,
  photoUrl: place.PhotoURL,
});

/**
 * Fetch places with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 * @param {string} [params.search] - Search query
 * @returns {Promise<PlacesResponse>}
 */
export const fetchPlaces = async ({ page = 1, pageSize = 12, search = "" }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const allPlaces = mockPlaces.PlacesList;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter by search if provided
  const filteredPlaces = search
    ? allPlaces.filter(
        (place) =>
          place.PrimaryName.toLowerCase().includes(search.toLowerCase()) ||
          place.Community.toLowerCase().includes(search.toLowerCase())
      )
    : allPlaces;

  const paginatedPlaces = filteredPlaces.slice(startIndex, endIndex);
  const transformedPlaces = paginatedPlaces.map(transformPlace);

  return {
    data: transformedPlaces,
    meta: {
      page,
      page_size: pageSize,
      item_count: filteredPlaces.length,
      page_count: Math.ceil(filteredPlaces.length / pageSize),
    },
  };
};

/**
 * Fetch a single place by ID
 * @param {string} id - Place ID
 * @returns {Promise<Place>}
 */
export const fetchPlaceById = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const place = mockPlaces.PlacesList.find((p) => p.PlaceId === parseInt(id));

  if (!place) {
    throw new Error("Place not found");
  }

  return transformPlace(place);
};
