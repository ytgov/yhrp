import express, { Request, Response } from "express";
import { RegisterController } from "../controllers/register-controller";
import {
  DescriptionServiceImpl,
  PhotoServiceImpl,
  RegisterServiceImpl,
} from "../services/register-service";

export const registerRouter = express.Router();
const controller = new RegisterController(
  new RegisterServiceImpl(),
  new DescriptionServiceImpl(),
  new PhotoServiceImpl()
);

// Simple validation middleware for page parameter
const validatePage = (req: Request, res: Response, next: Function) => {
  const page = parseInt(req.query.page as string);
  if (isNaN(page) || page < 1) {
    return res.status(400).json({ error: "Page must be a positive integer" });
  }
  return next();
};

registerRouter.get("/", validatePage, (req: Request, res: Response) =>
  controller.getRegisterPlaces(req, res)
);

registerRouter.get("/:id", (req: Request, res: Response) =>
  controller.getPlaceDetails(req, res)
);

registerRouter.get("/:id/photos", (req: Request, res: Response) =>
  controller.getPlacePhotos(req, res)
);

registerRouter.get("/:id/photos/:photoId", (req: Request, res: Response) =>
  controller.getPhotoFile(req, res)
);
