import express from "express";
import "jest";
import request from "supertest";
import { RegisterController } from "../../controllers/register-controller";
import {
  DescriptionService,
  Photo,
  PhotoFile,
  PhotoService,
  Place,
  RegisterService,
} from "../../services/register-service";

// Mock implementations for testing
class MockRegisterService implements RegisterService {
  async getRegisterAll(_skip: number, _take: number): Promise<Place[]> {
    return [
      {
        id: 1,
        name: "Sample Place",
        recognitionDate: new Date(),
        status: "active",
      },
    ];
  }

  async getPlaceInRegisterCount(): Promise<number> {
    return 100;
  }

  async getRegisterById(id: number): Promise<Place | null> {
    if (id === 999) {
      return null;
    }
    return {
      id,
      name: "Sample Place",
      recognitionDate: new Date(),
      status: "active",
    };
  }
}

class MockDescriptionService implements DescriptionService {
  async getForPlace(_id: number) {
    return [
      {
        type: 5,
        descriptionText: "Sample description",
      },
    ];
  }
}

class MockPhotoService implements PhotoService {
  async getAllForPlace(_id: number): Promise<Photo[]> {
    return [
      {
        id: 1,
        url: "sample-url",
        caption: "Sample photo",
      },
    ];
  }

  async getFileById(_id: string): Promise<PhotoFile | null> {
    return {
      file: Buffer.from("sample-image-data"),
    };
  }
}

// Get base URL from environment variable or use default
const BASE_URL = process.env.API_BASE_URL || "/api/register";

describe("Register Router", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    // Override the default services with mocks
    const mockRegisterService = new MockRegisterService();
    const mockDescriptionService = new MockDescriptionService();
    const mockPhotoService = new MockPhotoService();

    // Create a new router with mocked services
    const testRouter = express.Router();
    const controller = new RegisterController(
      mockRegisterService,
      mockDescriptionService,
      mockPhotoService
    );

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

    testRouter.get(
      "/",
      validatePage,
      controller.getRegisterPlaces.bind(controller)
    );
    testRouter.get("/:id", controller.getPlaceDetails.bind(controller));
    testRouter.get("/:id/photos", controller.getPlacePhotos.bind(controller));
    testRouter.get(
      "/:id/photos/:photoId",
      controller.getPhotoFile.bind(controller)
    );

    app.use(BASE_URL, testRouter);
  });

  describe("GET /", () => {
    it("should return paginated register places", async () => {
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
    it("should return place details with descriptions", async () => {
      const response = await request(app).get(`${BASE_URL}/1`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
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
