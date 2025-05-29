import { ref } from "vue";
import { communityBookmarks } from "../data/communityBookmarks";

export const useMapService = () => {
  const loading = ref(false);
  const error = ref(null);
  const maps = ref([]);
  const bookmarks = ref(communityBookmarks);

  const handleResponse = async (response) => {
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  };

  const loadToken = async () => {
    loading.value = true;
    error.value = null;

    try {
      // TODO: Implement actual token loading when API is ready
      return "somePlaceHolderToken";

      // When API is ready, uncomment this:
      // const response = await fetch(MAPS_URL);
      // return await handleResponse(response);
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const searchByYHSIId = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      // TODO: Implement actual search when API is ready
      return []; // Return empty array for now

      // When API is ready, uncomment this:
      // const response = await fetch(`${PLACE_URL}/search`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     query: { search: id },
      //     sortBy: [],
      //     page: 1,
      //     itemsPerPage: 20,
      //     groupBy: [],
      //     groupDesc: [],
      //   }),
      // });
      // const data = await handleResponse(response);
      // return data.data;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Computed property for sorted bookmarks
  const getSortedBookmarks = () => {
    return [...bookmarks.value].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  };

  return {
    loading,
    error,
    maps,
    bookmarks,
    loadToken,
    searchByYHSIId,
    getSortedBookmarks,
  };
};
