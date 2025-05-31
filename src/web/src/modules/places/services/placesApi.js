/**
 * Places API Service
 * Handles all API interactions for the Places module
 */
import mockPlaces from "../data/mock/places.json";

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
 * Fetch places with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Items per page
 * @param {string} [params.search] - Search query
 * @returns {Promise<PlacesResponse>}
 */
export async function fetchPlaces() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPlaces;
}

/**
 * Fetch a single place by ID
 * @param {string} id - Place ID
 * @returns {Promise<Place>}
 */
export async function fetchPlaceById(id) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const place = mockPlaces.find((p) => p.id === parseInt(id));
  if (!place) {
    throw new Error("Place not found");
  }
  return place;
}
