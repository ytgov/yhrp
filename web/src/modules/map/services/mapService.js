import { ref } from "vue";
import { communityBookmarks } from "../data/communityBookmarks";

// State
const loading = ref(false);
const error = ref(null);
const bookmarks = ref(communityBookmarks);

// Get token from environment variable
const loadToken = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = import.meta.env.VITE_ARCGIS_TOKEN;
    if (!token) {
      throw new Error("ArcGIS token not found in environment variables");
    }
    return token;
  } catch (e) {
    error.value = e;
    throw e;
  } finally {
    loading.value = false;
  }
};

// Search by YHSI ID
const searchByYHSIId = async (id) => {
  // TODO: Implement actual search when API is ready
  // Will use the id parameter to search for a specific place
  return null;
};

export function useMapService() {
  return {
    loading,
    error,
    bookmarks,
    loadToken,
    searchByYHSIId,
  };
}
