/**
 * Places API Service
 * Handles all API interactions for the Places module
 */
import mockPlaces from "../data/mock/places.json";

// Types
/**
 * @typedef {Object} Place
 * @property {number} placeId - Unique identifier
 * @property {string} name - Place name
 * @property {string} location - Community/location name
 * @property {string} description - Place description
 * @property {Array<number>} coordinates - [latitude, longitude]
 * @property {Array<Object>} designations - Array of designations
 * @property {string} designations[].level - Designation level
 * @property {string} designations[].date - Designation date
 * @property {string} designations[].bylaw - Bylaw number
 * @property {Array<string>} designations[].reasons - Reasons for designation
 * @property {Array<Object>} heritageValues - Array of heritage values
 * @property {string} heritageValues[].title - Section title
 * @property {Array<string>} heritageValues[].items - Section items
 * @property {string} culturalHistory - Cultural history text
 * @property {Array<Object>} historicalSources - Array of historical sources
 * @property {string} historicalSources[].title - Source collection title
 * @property {Array<string>} historicalSources[].items - Source items
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
 * Transform raw place data into the format expected by the UI
 * @param {Object} place - Raw place data from mock
 * @returns {Place} Transformed place data
 */
function transformPlace(place) {
  // Ensure we have a valid placeId
  const placeId = place.placeId || place.id;
  if (!placeId) {
    console.warn("Missing placeId in place data:", place);
  }

  return {
    placeId: placeId,
    id: placeId, // Add id for backward compatibility
    name: place.name,
    location: place.location,
    description: place.description,
    coordinates: place.coordinates,
    designations: place.designations || [],
    heritageValues: (place.heritageValues || []).map((value) => ({
      title: value.title,
      items: Array.isArray(value.content) ? value.content : [value.content],
    })),
    culturalHistory: place.culturalHistory,
    historicalSources: (place.historicalSources || []).map((source) => ({
      title: source.title,
      items: Array.isArray(source.content) ? source.content : [source.content],
    })),
  };
}

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
  return mockPlaces.map(transformPlace);
}

/**
 * Fetch a single place by ID
 * @param {string} id - Place ID
 * @returns {Promise<Place>}
 */
export async function fetchPlaceById(id) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const place = mockPlaces.find((p) => p.placeId === parseInt(id));
  if (!place) {
    throw new Error("Place not found");
  }
  return transformPlace(place);
}
