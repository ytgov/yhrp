import express from "express";
import "jest";
import request from "supertest";
import { PlaceController } from "../../controllers/place-controller";

// Mock implementation for testing
class MockPlaceService {
  async getPlaces(page: number = 1) {
    return {
      data: [
        {
          id: 1,
          name: "Sample Place",
          description: "Sample description",
          latitude: 60.72,
          longitude: -135.05,
          photos: [],
        },
      ],
      meta: {
        page,
        page_size: 12,
        item_count: 100,
        page_count: 9,
      },
    };
  }

  async getPlaceDetails(id: string | number) {
    if (parseInt(String(id)) === 999) return null;
    return {
      id: 1,
      name: "Sample Place",
      description: "Sample description",
      latitude: 60.72,
      longitude: -135.05,
      photos: [],
      placeDescriptionEn: "Sample description",
      placeDescriptionFr: "FRENCH: Sample description",
    };
  }

  async getPlacePhotos(id: string | number) {
    if (parseInt(String(id)) === 999) return { data: [], meta: {} };
    return {
      data: [
        {
          id: 1,
          url: "sample-url",
          ThumbFile: { data: [1, 2, 3], base64: "abc" },
        },
      ],
      meta: {},
    };
  }

  async getPhoto(id: string | number) {
    if (parseInt(String(id)) === 999) throw new Error("Not found");
    return {
      buffer: Buffer.from("sample-image-data"),
      contentType: "image/jpg",
    };
  }
}

const BASE_URL = process.env.API_BASE_URL || "/api/register";

describe("Place Router", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    const mockPlaceService = new MockPlaceService();
    const controller = new PlaceController(mockPlaceService as any);
    const testRouter = express.Router();

    // Simple validation middleware for testing
    const validatePage = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const page = parseInt(req.query.page as string);
      if (isNaN(page) || page < 1) {
        return res
          .status(400)
          .json({ error: "Page must be a positive integer" });
      }
      next();
      return;
    };

    testRouter.get("/", validatePage, controller.getPlaces.bind(controller));
    testRouter.get("/:id", controller.getPlaceDetails.bind(controller));
    testRouter.get("/:id/photos", controller.getPlacePhotos.bind(controller));
    testRouter.get(
      "/:id/photos/:photoId",
      controller.getPhotoFile.bind(controller)
    );

    app.use(BASE_URL, testRouter);
  });

  describe("GET /", () => {
    it("should return paginated places", async () => {
      const response = await request(app).get(BASE_URL).query({ page: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("meta");
      expect(response.body.meta).toHaveProperty("page", 1);
      expect(response.body.meta).toHaveProperty("page_size", 12);
      expect(response.body.meta).toHaveProperty("item_count", 100);
      expect(response.body.meta).toHaveProperty("page_count", 9);
    });

    it("should handle invalid page numbers", async () => {
      const response = await request(app).get(BASE_URL).query({ page: 0 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Page must be a positive integer"
      );
    });
  });

  describe("GET /:id", () => {
    it("should return place details", async () => {
      const response = await request(app).get(`${BASE_URL}/1`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("placeDescriptionEn");
      expect(response.body).toHaveProperty("placeDescriptionFr");
    });

    it("should return 404 for non-existent place", async () => {
      const response = await request(app).get(`${BASE_URL}/999`);

      expect(response.status).toBe(404);
    });
  });

  describe("GET /:id/photos", () => {
    it("should return photos for a place", async () => {
      const response = await request(app).get(`${BASE_URL}/1/photos`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty("id");
      expect(response.body.data[0]).toHaveProperty("url");
    });

    it("should return 404 for non-existent place", async () => {
      const response = await request(app).get(`${BASE_URL}/999/photos`);

      expect(response.status).toBe(404);
    });
  });

  describe("GET /:id/photos/:photoId", () => {
    it("should return photo file", async () => {
      const response = await request(app).get(`${BASE_URL}/1/photos/1`);

      expect(response.status).toBe(200);
      expect(response.type).toBe("image/jpg");
    });

    it("should return 404 for non-existent place", async () => {
      const response = await request(app).get(`${BASE_URL}/999/photos/1`);

      expect(response.status).toBe(404);
    });
  });
});
