import express from "express";
import "jest";
import request from "supertest";
import { PlaceController } from "../../controllers/place-controller";

// Mock implementation for testing — shapes match YHIS register wire format
class MockPlaceService {
  async getPlaces(page: number = 1) {
    return {
      data: [
        {
          id: 1,
          primaryName: "Sample Place",
          fr_primaryName: "Lieu exemple",
          yHSIId: "105D/11/001",
          communityName: "Whitehorse",
          fr_communityName: "Whitehorse",
          latitude: "60.72",
          longitude: "-135.05",
          recognitionDate: "2000-01-01",
          designations: "Territorial",
          fr_designations: "Territorial",
          ThumbFile: { type: "Buffer", data: [1, 2, 3] },
          caption: null,
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
    if (parseInt(String(id)) === 999) return undefined;
    return {
      id: 1,
      primaryName: "Sample Place",
      fr_primaryName: "Lieu exemple",
      yHSIId: "105D/11/001",
      communityName: "Whitehorse",
      fr_communityName: "Whitehorse",
      latitude: "60.72",
      longitude: "-135.05",
      recognitionDate: "2000-01-01",
      designations: "Territorial",
      fr_designations: "Territorial",
      placeDescriptionEn: "Sample description",
      placeDescriptionFr: "Description exemple",
    };
  }

  async getPlacePhotos(id: string | number) {
    if (parseInt(String(id)) === 999) return { data: [] };
    return {
      data: [
        {
          id: 1,
          rowId: "ABC-123",
          placeId: 1,
          originalFileName: "sample.jpg",
          ThumbFile: { data: [1, 2, 3], base64: "abc" },
        },
      ],
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
      expect(response.body.data[0]).toHaveProperty("primaryName");
      expect(response.body.data[0]).toHaveProperty("yHSIId");
      expect(response.body.data[0]).toHaveProperty("fr_primaryName");
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
    it("should return place details wrapped in data", async () => {
      const response = await request(app).get(`${BASE_URL}/1`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id", 1);
      expect(response.body.data).toHaveProperty("primaryName", "Sample Place");
      expect(response.body.data).toHaveProperty("fr_primaryName", "Lieu exemple");
      expect(response.body.data).toHaveProperty("placeDescriptionEn");
      expect(response.body.data).toHaveProperty("placeDescriptionFr");
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
      expect(response.body.data[0]).toHaveProperty("ThumbFile");
      expect(response.body.data[0].ThumbFile).toHaveProperty("data");
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
