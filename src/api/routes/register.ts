import express, { Request, Response } from "express";
import { query } from "express-validator";
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

registerRouter.get(
  "/",
  [query("page").default(1).isInt({ gt: 0 })],
  (req: Request, res: Response) => controller.getRegisterPlaces(req, res)
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
