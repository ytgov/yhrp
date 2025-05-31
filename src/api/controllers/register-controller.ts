import { Request, Response } from "express";
import { validationResult } from "express-validator";
import moment from "moment";
import {
  DescriptionService,
  PhotoService,
  Place,
  RegisterService,
} from "../services/register-service";

export class RegisterController {
  constructor(
    private registerService: RegisterService,
    private descriptionService: DescriptionService,
    private photoService: PhotoService
  ) {}

  async getRegisterPlaces(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const page = parseInt(req.query.page as string);
      const skip = (page - 1) * 12;
      const take = 12;

      const data = await this.registerService.getRegisterAll(skip, take);
      const formattedData = data.map((d) => ({
        ...d,
        recognitionDate: moment(d.recognitionDate)
          .add(7, "hours")
          .format("YYYY-MM-DD"),
      }));

      const item_count = await this.registerService.getPlaceInRegisterCount();
      const page_count = Math.ceil(item_count / 12);

      return res.json({
        data: formattedData,
        meta: { page, page_size: 12, item_count, page_count },
      });
    } catch (error) {
      console.error("Error fetching register data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPlaceDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.registerService.getRegisterById(parseInt(id));

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      const placeData: Place = {
        ...data,
        placeDescriptionEn: "",
        placeDescriptionFr: "",
        heritageValueEn: "",
        heritageValueFr: "",
        characterDefEn: "",
        characterDefFr: "",
        descBoundEn: "",
        descBoundFr: "",
        additionalInfoEn: "",
        additionalInfoFr: "",
      };

      const descs = await this.descriptionService.getForPlace(parseInt(id));

      for (const desc of descs) {
        switch (desc.type) {
          case 5:
            placeData.placeDescriptionEn = desc.descriptionText;
            placeData.placeDescriptionFr = "FRENCH: " + desc.descriptionText;
            break;
          case 4:
            placeData.heritageValueEn = desc.descriptionText;
            placeData.heritageValueFr = "FRENCH: " + desc.descriptionText;
            break;
          case 2:
            placeData.characterDefEn = desc.descriptionText;
            placeData.characterDefFr = "FRENCH: " + desc.descriptionText;
            break;
          case 6:
            placeData.descBoundEn = desc.descriptionText;
            placeData.descBoundFr = "FRENCH: " + desc.descriptionText;
            break;
          case 30:
            placeData.additionalInfoEn = desc.descriptionText;
            placeData.additionalInfoFr = "FRENCH: " + desc.descriptionText;
            break;
        }
      }

      return res.json({ data: placeData });
    } catch (error) {
      console.error("Error fetching place details:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPlacePhotos(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.registerService.getRegisterById(parseInt(id));

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      const photos = await this.photoService.getAllForPlace(parseInt(id));
      return res.json({ data: photos });
    } catch (error) {
      console.error("Error fetching photos:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPhotoFile(req: Request, res: Response) {
    try {
      const { id, photoId } = req.params;
      const data = await this.registerService.getRegisterById(parseInt(id));

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      const photo = await this.photoService.getFileById(photoId);
      if (photo && photo.file) {
        return res.contentType("image/jpg").send(photo.file);
      }

      return res.status(404).json({ error: "Photo not found" });
    } catch (error) {
      console.error("Error fetching photo:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
