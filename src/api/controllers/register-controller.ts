import { Request, Response } from "express";
import {
  ErrorResponse,
  PhotosResponse,
  RegisterPlaceResponse,
  RegisterPlacesResponse,
} from "../models/api-response.model";
import {
  DescriptionService,
  PhotoService,
  RegisterService,
} from "../services/register-service";

export class RegisterController {
  constructor(
    private registerService: RegisterService,
    private descriptionService: DescriptionService,
    private photoService: PhotoService
  ) {}

  async getRegisterPlaces(
    req: Request,
    res: Response<RegisterPlacesResponse | ErrorResponse>
  ) {
    try {
      // Validation is now handled in the route middleware
      const page = parseInt(req.query.page as string);
      const skip = (page - 1) * 12;
      const take = 12;

      const data = await this.registerService.getRegisterAll(skip, take);
      const formattedData = data.map((d) => {
        const date = new Date(d.recognitionDate);
        date.setHours(date.getHours() + 7);
        return {
          ...d,
          recognitionDate: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        };
      });

      const item_count = await this.registerService.getPlaceInRegisterCount();
      const page_count = Math.ceil(item_count / 12);

      return res.json({
        data: formattedData,
        meta: { page, page_size: 12, item_count, page_count },
      });
    } catch (error) {
      console.error("Error fetching register data:", error);
      return res.status(500).json({
        error: "Internal server error",
        details: error instanceof Error ? error.message : undefined,
      });
    }
  }

  async getPlaceDetails(
    req: Request,
    res: Response<RegisterPlaceResponse | ErrorResponse>
  ) {
    try {
      const { id } = req.params;
      const data = await this.registerService.getRegisterById(parseInt(id));

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      const placeData = {
        ...data,
        recognitionDate:
          data.recognitionDate instanceof Date
            ? data.recognitionDate.toISOString().split("T")[0]
            : data.recognitionDate,
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
      } as import("../models/register-place.model").RegisterPlace;

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
      return res.status(500).json({
        error: "Internal server error",
        details: error instanceof Error ? error.message : undefined,
      });
    }
  }

  async getPlacePhotos(
    req: Request,
    res: Response<PhotosResponse | ErrorResponse>
  ) {
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
      return res.status(500).json({
        error: "Internal server error",
        details: error instanceof Error ? error.message : undefined,
      });
    }
  }

  async getPhotoFile(req: Request, res: Response<Buffer | ErrorResponse>) {
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
      return res.status(500).json({
        error: "Internal server error",
        details: error instanceof Error ? error.message : undefined,
      });
    }
  }
}
