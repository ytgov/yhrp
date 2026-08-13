/**
 * Places API Service
 * Handles all API interactions for the Places module
 */
import mockPlaces from "../data/mock/places.json";
import { Place } from "../models/Place";

// Types
/**
 * Wire fields from YHIS / our proxy (before Place.fromApi mapping):
 * id, primaryName, fr_primaryName, yHSIId, communityName, fr_communityName,
 * latitude, longitude, recognitionDate, designations, fr_designations, ThumbFile,
 * plus detail bilingual *En/*Fr description fields.
 * Responses: list/detail/photos all use a `{ data }` envelope (list also has `meta`).
 */

/**
 * @typedef {Object} PlacesResponse
 * @property {Array<Place>} data - List of places
 * @property {Object} meta - Pagination metadata
 * @property {number} meta.page - Current page number
 * @property {number} meta.page_size - Items per page
 * @property {number} meta.item_count - Total number of items
 * @property {number} meta.page_count - Total number of pages
 */

import { apiBaseUrl } from "../../../config";

// Use our backend API endpoint
export const API_BASE_URL = `${apiBaseUrl}/api/register`;

// Flag to toggle between mock and real API data
// Set to true when YHIS API is unavailable
const USE_MOCK_DATA = false;

/**
 * Convert buffer data to base64 URL
 * @param {Array<number>} buffer - The buffer data
 * @returns {string} Base64 data URL
 */
const bufferToBase64 = (buffer) => {
  if (!buffer) return "";
  return `data:image/jpeg;base64,${btoa(
    buffer.reduce((data, byte) => data + String.fromCharCode(byte), "")
  )}`;
};

/**
 * Fetch a list of places with pagination
 * @param {number} page - Page number (1-based)
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<{places: Array<Place>, total: number, pageSize: number}>}
 */
export const fetchPlaces = async (page = 1, pageSize = 12) => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get paginated mock data
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = mockPlaces.slice(start, end);

    return {
      places: paginatedData.map((place) => Place.fromMock(place)),
      total: mockPlaces.length,
      pageSize,
    };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}?page=${page}&page_size=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }

    const data = await response.json();
    return {
      places: data.data.map((place) => Place.fromApi(place)),
      total: data.meta.item_count,
      pageSize: data.meta.page_size,
    };
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

/**
 * Search places via POST /api/register/search
 * Matches primary names, secondary names, and place descriptions (EN/FR).
 * Empty query returns the full register (same as fetchPlaces).
 * @param {string} query - Search term
 * @param {number} page - Page number (1-based)
 * @returns {Promise<{places: Array<Place>, total: number, pageSize: number}>}
 */
export const searchPlaces = async (query = "", page = 1) => {
  const normalizedQuery = (query ?? "").trim();

  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const pageSize = 12;
    const needle = normalizedQuery.toLowerCase();
    const filtered = needle
      ? mockPlaces.filter((place) => {
          const haystack = [
            place.primaryName,
            place.fr_primaryName,
            place.placeDescription,
            place.communityName,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(needle);
        })
      : mockPlaces;
    const start = (page - 1) * pageSize;
    const paginatedData = filtered.slice(start, start + pageSize);
    return {
      places: paginatedData.map((place) => Place.fromMock(place)),
      total: filtered.length,
      pageSize,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/search?page=${page}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: normalizedQuery }),
    });
    if (!response.ok) {
      throw new Error("Failed to search places");
    }

    const data = await response.json();
    return {
      places: data.data.map((place) => Place.fromApi(place)),
      total: data.meta.item_count,
      pageSize: data.meta.page_size,
    };
  } catch (error) {
    console.error("Error searching places:", error);
    throw error;
  }
};

/**
 * Fetch every page of search results for a query.
 * @param {string} query - Search term
 * @returns {Promise<Array<Place>>}
 */
export const searchAllPlaces = async (query = "") => {
  const normalizedQuery = (query ?? "").trim();
  if (!normalizedQuery) {
    return fetchAllPlaces();
  }

  const places = [];
  let page = 1;
  let total = Infinity;

  while (places.length < total) {
    const response = await searchPlaces(normalizedQuery, page);
    if (!response?.places?.length) break;
    places.push(...response.places);
    total = response.total;
    page += 1;
  }

  return places;
};

/**
 * Fetch every register page (for map / full listings).
 * Each place includes list ThumbFile when YHIS provides it.
 * @returns {Promise<Array<Place>>}
 */
export const fetchAllPlaces = async () => {
  const places = [];
  let page = 1;
  let total = Infinity;

  while (places.length < total) {
    const response = await fetchPlaces(page);
    if (!response?.places?.length) break;
    places.push(...response.places);
    total = response.total;
    page += 1;
  }

  return places;
};

/**
 * Fetch a single place by ID
 * @param {number} id - Place ID
 * @returns {Promise<Place>}
 */
export const fetchPlaceById = async (id) => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find place in mock data
    const place = mockPlaces.find((p) => p.placeId === parseInt(id));
    if (!place) {
      throw new Error(`Place with ID ${id} not found`);
    }

    return Place.fromMock(place);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch place with ID ${id}`);
    }

    const data = await response.json();
    return Place.fromApi(data.data);
  } catch (error) {
    console.error(`Error fetching place ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch photos for a place by ID
 * @param {number} id - Place ID
 * @returns {Promise<Array>} Array of photo objects with base64 URLs
 */
export const fetchPlacePhotos = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/photos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch photos for place ${id}`);
    }
    const data = await response.json();

    // Convert buffer data to base64 URLs and preserve all fields
    return (data.data || []).map((photo) => ({
      ...photo, // Preserve all original fields
      imageUrl: bufferToBase64(photo.ThumbFile?.data),
    }));
  } catch (error) {
    console.error(`Error fetching photos for place ${id}:`, error);
    throw error;
  }
};
