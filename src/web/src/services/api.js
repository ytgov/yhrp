import { ref } from "vue";

const REGISTER_URL = "http://register.yukonhistoricplaces.ca";

export const useApi = () => {
  const loading = ref(false);
  const error = ref(null);

  const handleResponse = async (response) => {
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  };

  const fetchPlaces = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${REGISTER_URL}/?${queryString}`);
      return await handleResponse(response);
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${REGISTER_URL}/${placeId}`);
      return await handleResponse(response);
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const fetchPlaceImage = async (placeId, imageNumber = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(
        `${REGISTER_URL}/Images/Places/${placeId}/${imageNumber}.jpg`
      );
      if (!response.ok) {
        throw new Error(`Image not found for place ${placeId}`);
      }
      return response.url;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchPlaces,
    fetchPlaceDetails,
    fetchPlaceImage,
  };
};
