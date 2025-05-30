export const useApiService = () => {
  const secureCall = async (method, path) => {
    try {
      const response = await fetch(path, {
        method: method.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
          // TODO: Add authentication headers when needed
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  return {
    secureCall,
  };
};
