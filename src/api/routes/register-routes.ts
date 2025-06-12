import express, { Request, Response } from "express";

const registerRouter = express.Router();

// Add route-level logging middleware
// registerRouter.use((req: Request, _res: Response, next) => {
//   console.log("\n=== Register Router Request ===");
//   console.log(`Time: ${new Date().toISOString()}`);
//   console.log(`Method: ${req.method}`);
//   console.log(`URL: ${req.url}`);
//   console.log(`Headers:`, req.headers);
//   console.log(`Query:`, req.query);
//   console.log("=============================\n");
//   next();
// });

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

export default registerRouter;
