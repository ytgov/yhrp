import express, { Request, Response } from "express";

const registerRouter = express.Router();

// GET /api/register
registerRouter.get("/", async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const url = `https://yhis.gov.yk.ca/api/register/?page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch places: ${response.status} - ${errorText}`
      );
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();
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
    const url = `https://yhis.gov.yk.ca/api/register/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch place details: ${response.status} - ${errorText}`
      );
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();
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
    const url = `https://yhis.gov.yk.ca/api/register/${id}/photos`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch place photos: ${response.status} - ${errorText}`
      );
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();
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
      const url = `https://yhis.gov.yk.ca/api/register/${id}/photos/${photoId}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch photo: ${response.status} - ${errorText}`
        );
      }

      // Get the content type from the original response
      const contentType = response.headers.get("content-type");
      if (!contentType) {
        throw new Error("No content type received from photo endpoint");
      }

      // Set the content type and send the image data
      res.setHeader("Content-Type", contentType);
      const imageBuffer = await response.arrayBuffer();
      res.send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error("Error in register route handler:", error);
      res.status(500).json({ error: "Failed to fetch photo" });
    }
  }
);

export default registerRouter;
