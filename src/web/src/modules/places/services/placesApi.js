/**
 * Places API Service
 * Handles all API interactions for the Places module
 */
import mockPlaces from "../data/mock/places.json";

// Types
/**
 * @typedef {Object} Place
 * @property {number} id - Place ID
 * @property {string} name - Place name
 * @property {string} description - Place description
 * @property {Object} location - Location coordinates
 * @property {number} location.lat - Latitude
 * @property {number} location.lng - Longitude
 * @property {string} community - Community name
 * @property {string} yhsiId - YHSI ID
 * @property {Array} designations - List of designations
 * @property {string} recognitionDate - Date of recognition
 * @property {string} photoUrl - URL of the place photo
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
const USE_MOCK_DATA = false;

/**
 * Class representing a Place in the system
 */
class Place {
  constructor(data) {
    this.placeId = data.id;
    this.id = data.id; // For backward compatibility
    this.name = data.primaryName || data.name || "";
    this.location = data.communityName || data.location || "";
    this.description = data.placeDescriptionEn || "";
    this.coordinates = [
      parseFloat(data.latitude || data.coordinates?.[0] || 0),
      parseFloat(data.longitude || data.coordinates?.[1] || 0),
    ];
    this.designations = this._parseDesignations(data);
    this.heritageValues = this._parseHeritageValues(data);
    this.culturalHistory = this._parseCulturalHistory(data);
    this.historicalSources = this._parseHistoricalSources(data);
    this.yhsiId = data.yHSIId || data.yhsiId || "";
    this.recognitionDate = data.recognitionDate
      ? data.recognitionDate.split("T")[0]
      : null;
    this.photoId = data.id; // Store the photo ID for URL construction

    // Additional fields from API
    this.placeDescriptionEn = data.placeDescriptionEn || "";
    this.placeDescriptionFr = data.placeDescriptionFr || "";
    this.heritageValueEn = data.heritageValueEn || "";
    this.heritageValueFr = data.heritageValueFr || "";
    this.characterDefEn = data.characterDefEn || "";
    this.characterDefFr = data.characterDefFr || "";
    this.descBoundEn = data.descBoundEn || "";
    this.descBoundFr = data.descBoundFr || "";
    this.additionalInfoEn = data.additionalInfoEn || "";
    this.additionalInfoFr = data.additionalInfoFr || "";
  }

  /**
   * Parse designations from the API data
   * @private
   */
  _parseDesignations(data) {
    if (!data.designations) return [];

    // If designations is already an array with the correct structure, return it
    if (Array.isArray(data.designations) && data.designations[0]?.level) {
      return data.designations;
    }

    // If designations is a string (from API), create a basic structure
    return [
      {
        level: data.designations || "",
        date: data.recognitionDate ? data.recognitionDate.split("T")[0] : null,
        bylaw: "", // API doesn't provide this yet
        reasons: [], // API doesn't provide this yet
      },
    ];
  }

  /**
   * Parse heritage values from the API data
   * @private
   */
  _parseHeritageValues(data) {
    if (!data.heritageValueEn) return [];

    return [
      {
        items: data.heritageValueEn.split("\n").filter(Boolean),
      },
    ];
  }

  /**
   * Parse cultural history from the API data
   * @private
   */
  _parseCulturalHistory(data) {
    return data.heritageValueEn || "";
  }

  /**
   * Parse historical sources from the API data
   * @private
   */
  _parseHistoricalSources(data) {
    // If already an array, return as is
    if (Array.isArray(data.historicalSources)) {
      // If array of objects with 'content', flatten to array of strings
      if (data.historicalSources[0]?.content) {
        return data.historicalSources.flatMap((hs) => hs.content);
      }
      return data.historicalSources;
    }
    // If it's a string, wrap in array
    if (typeof data.historicalSources === "string") {
      return [data.historicalSources];
    }
    // If undefined or null, return empty array
    return [];
  }

  /**
   * Create a Place instance from API data
   * @static
   */
  static fromApi(data) {
    return new Place(data);
  }

  /**
   * Create a Place instance from mock data
   * @static
   */
  static fromMock(data) {
    return new Place({
      id: data.placeId,
      primaryName: data.name,
      communityName: data.location,
      placeDescriptionEn: data.description,
      latitude: data.coordinates[0],
      longitude: data.coordinates[1],
      designations: data.designations?.[0]?.level,
      recognitionDate: data.designations?.[0]?.date,
      heritageValueEn: data.culturalHistory,
      characterDefEn: data.heritageValues?.[0]?.items?.join("\n"),
      yHSIId: data.yhsiId,
      ThumbFile: data.ThumbFile,
    });
  }
}

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
