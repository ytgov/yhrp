import { beforeEach, describe, expect, it, vi } from "vitest";
import { useApiService } from "../apiService";

describe("apiService", () => {
  let apiService;
  let mockFetch;

  beforeEach(() => {
    // Reset mocks before each test
    mockFetch = vi.fn();
    window.fetch = mockFetch;
    apiService = useApiService();
  });

  describe("secureCall", () => {
    it("should handle successful API calls", async () => {
      const mockResponse = { data: "test data" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiService.secureCall("GET", "/test");
      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith("/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should handle HTTP errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(apiService.secureCall("GET", "/test")).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(apiService.secureCall("GET", "/test")).rejects.toThrow(
        "Network error"
      );
    });

    it("should handle JSON parsing errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error("Invalid JSON")),
      });

      await expect(apiService.secureCall("GET", "/test")).rejects.toThrow(
        "Invalid JSON"
      );
    });
  });
});
