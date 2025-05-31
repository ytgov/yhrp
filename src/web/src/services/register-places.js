const API_BASE_URL = "/api/register";

/**
 * Fetches a paginated list of register places
 * @param {number} page - Page number (1-based)
 * @returns {Promise<{data: Array, meta: {page: number, page_size: number, item_count: number, page_count: number}}>}
 */
export const getRegisterPlaces = async (page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch register places");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching register places:", error);
    throw error;
  }
};

/**
 * Fetches details for a specific register place
 * @param {number} id - Place ID
 * @returns {Promise<{data: Object}>}
 */
export const getRegisterPlaceById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch register place details");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching register place ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches photos for a specific register place
 * @param {number} id - Place ID
 * @returns {Promise<{data: Array}>}
 */
export const getRegisterPlacePhotos = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/photos`);
    if (!response.ok) {
      throw new Error("Failed to fetch register place photos");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching photos for place ${id}:`, error);
    throw error;
  }
};

/**
 * Gets the URL for a specific photo
 * @param {number} placeId - Place ID
 * @param {string} photoId - Photo ID
 * @returns {string} URL for the photo
 */
export const getPhotoUrl = (placeId, photoId) => {
  return `${API_BASE_URL}/${placeId}/photos/${photoId}`;
};
