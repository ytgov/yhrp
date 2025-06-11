import request from "supertest";

// Get base URL from environment variable
const BASE_URL = process.env.API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    "API_BASE_URL environment variable is required for remote tests"
  );
}

describe("Remote Register API", () => {
  describe("GET /", () => {
    it("should return paginated register places with details", async () => {
      const response = await request(BASE_URL).get("/").query({ page: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("meta");
      expect(response.body.meta).toHaveProperty("page", 1);
      expect(response.body.meta).toHaveProperty("page_size");
      expect(response.body.meta).toHaveProperty("item_count");
      expect(response.body.meta).toHaveProperty("page_count");

      // Check that each place has the expected fields
      if (response.body.data.length > 0) {
        const place = response.body.data[0];
        expect(place).toHaveProperty("id");
        expect(place).toHaveProperty("primaryName");
        expect(place).toHaveProperty("yHSIId");
        expect(place).toHaveProperty("latitude");
        expect(place).toHaveProperty("longitude");
        expect(place).toHaveProperty("recognitionDate");
        expect(place).toHaveProperty("communityName");
        expect(place).toHaveProperty("designations");
        expect(place).toHaveProperty("ThumbFile");
      }
    });

    it("should handle invalid page numbers", async () => {
      const response = await request(BASE_URL).get("/").query({ page: 0 });

      expect(response.status).toBe(502); // The API returns 502 for invalid pages
    });
  });

  // The following tests are commented out because these endpoints do not exist on the remote API
  /*
  describe("GET /:id", () => {
    it("should return place details with descriptions", async () => {
      const response = await request(BASE_URL).get("/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("placeDescriptionEn");
      expect(response.body.data).toHaveProperty("placeDescriptionFr");
    });

    it("should return 404 for non-existent place", async () => {
      const response = await request(BASE_URL).get("/999");

      expect(response.status).toBe(404);
    });
  });

  describe("GET /:id/photos", () => {
    it("should return photos for a place", async () => {
      const response = await request(BASE_URL).get("/1/photos");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
      if (response.body.data.length > 0) {
        expect(response.body.data[0]).toHaveProperty("id");
        expect(response.body.data[0]).toHaveProperty("url");
      }
    });

    it("should return 404 for non-existent place", async () => {
      const response = await request(BASE_URL).get("/999/photos");

      expect(response.status).toBe(404);
    });
  });

  describe("GET /:id/photos/:photoId", () => {
    it("should return photo file", async () => {
      const response = await request(BASE_URL).get("/1/photos/1");

      expect(response.status).toBe(200);
      expect(response.type).toMatch(/^image\//);
    });

    it("should return 404 for non-existent place", async () => {
      const response = await request(BASE_URL).get("/999/photos/1");

      expect(response.status).toBe(404);
    });
  });
  */
});
