import express, { Request, Response } from "express";
import { registerService } from "../services/register-service";

const registerRouter = express.Router();

// GET /api/register
registerRouter.get("/", async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const data = await registerService.getPlaces(page);
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.error("Error in register route handler:", error);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// GET /api/register/:id
registerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await registerService.getPlaceDetails(id);
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.error("Error in register route handler:", error);
    res.status(500).json({ error: "Failed to fetch place details" });
  }
});

// GET /api/register/:id/photos
registerRouter.get("/:id/photos", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await registerService.getPlacePhotos(id);
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.error("Error in register route handler:", error);
    res.status(500).json({ error: "Failed to fetch place photos" });
  }
});

// GET /api/register/:id/photos/:photoId
registerRouter.get(
  "/:id/photos/:photoId",
  async (req: Request, res: Response) => {
    try {
      const { id, photoId } = req.params;
      const { buffer, contentType } = await registerService.getPhoto(
        id,
        photoId
      );
      res.setHeader("Content-Type", contentType);
      res.send(buffer);
    } catch (error) {
      console.error("Error in register route handler:", error);
      res.status(500).json({ error: "Failed to fetch photo" });
    }
  }
);

export default registerRouter;
