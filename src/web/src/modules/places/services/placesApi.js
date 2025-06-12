/**
 * Places API Service
 * Handles all API interactions for the Places module
 */

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

import { apiBaseUrl } from "../../../config";

// Use our backend API endpoint
export const API_BASE_URL = `${apiBaseUrl}/api/register`;

/**
 * Transform raw place data from the API into the format expected by the UI
 * @param {Object} place - Raw place data from API
 * @returns {Place} Transformed place data
 */
function transformPlace(place) {
  // The API returns fields like id, primaryName, latitude, longitude, etc.
  return {
    placeId: place.id,
    id: place.id, // For backward compatibility
    name: place.primaryName || place.name,
    location: place.communityName || place.location,
    description: place.description || "",
    coordinates: [place.latitude, place.longitude],
    designations: place.designations || [],
    heritageValues: place.heritageValues || [],
    culturalHistory: place.culturalHistory || "",
    historicalSources: place.historicalSources || [],
    ThumbFile: place.ThumbFile || null,
  };
}

/**
 * Fetch places with pagination
 * @param {number} page - Page number (1-based)
 * @returns {Promise<PlacesResponse>}
 */
export async function fetchPlaces(page = 1) {
  try {
    const url = `${API_BASE_URL}?page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch places: ${response.status} - ${errorText}`
      );
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();
    return {
      data: (data.data || []).map(transformPlace),
      meta: data.meta || {
        page: page,
        page_size: 12,
        item_count: data.data?.length || 0,
        page_count: Math.ceil((data.data?.length || 0) / 12),
      },
    };
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

/**
 * Fetch a single place by ID (from the paginated list, since no /:id endpoint exists)
 * @param {string|number} id - Place ID
 * @returns {Promise<Place>}
 */
export async function fetchPlaceById(id) {
  try {
    // Fetch all places and find the one with the matching id
    // (This is not efficient, but the API does not provide a /:id endpoint)
    let page = 1;
    let found = null;
    let pageCount = 1;
    do {
      const { data, meta } = await fetchPlaces(page);
      found = data.find((p) => p.placeId === parseInt(id));
      pageCount = meta.page_count;
      page++;
    } while (!found && page <= pageCount);
    if (!found) {
      throw new Error("Place not found");
    }
    return found;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
}
