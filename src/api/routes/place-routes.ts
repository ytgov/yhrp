import express, { Request, Response } from "express";
import { PlaceController } from "../controllers/place-controller";
import { placeService } from "../services/place-service";

const registerRouter = express.Router();
const placeController = new PlaceController(placeService);

// GET /api/register
registerRouter.get("/", (req: Request, res: Response) => {
  placeController.getPlaces(req, res);
});

// GET /api/register/:id
registerRouter.get("/:id", (req: Request, res: Response) => {
  placeController.getPlaceDetails(req, res);
});

// GET /api/register/:id/photos
registerRouter.get("/:id/photos", (req: Request, res: Response) => {
  placeController.getPlacePhotos(req, res);
});

// GET /api/register/:id/photos/:photoId
registerRouter.get("/:id/photos/:photoId", (req: Request, res: Response) => {
  placeController.getPhotoFile(req, res);
});

export default registerRouter;
