import { Request, Response } from "express";
import {
  ErrorResponse,
  RegisterPlacesResponse,
} from "../models/api-response.model";
import { RegisterPlace } from "../models/register-place.model";
import { PlaceService } from "../services/place-service";

export class PlaceController {
  constructor(private placeService: PlaceService) {}

  async getPlaces(
    req: Request,
    res: Response<RegisterPlacesResponse | ErrorResponse>
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const response: RegisterPlacesResponse =
        await this.placeService.getPlaces(page);
      console.log(response.data);

      res.json(response);
    } catch (error) {
      console.error("Error fetching places:", error);
      res.status(500).json({ error: "Failed to fetch places" });
    }
  }

  async getPlaceDetails(
    req: Request,
    res: Response<RegisterPlace | ErrorResponse>
  ) {
    try {
      const { id } = req.params;
      const data: RegisterPlace = await this.placeService.getPlaceDetails(id);

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      return res.json(data);
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
    res: Response<{ data: any[]; meta: any } | ErrorResponse>
  ) {
    try {
      const { id } = req.params;
      const data = await this.placeService.getPlaceDetails(id);

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      const response = await this.placeService.getPlacePhotos(id);

      // Format the photos to include ThumbFile with data
      const formattedPhotos = response.data.map((photo: any) => ({
        ...photo,
        ThumbFile: {
          data: photo.ThumbFile?.data || [],
          base64: photo.ThumbFile?.base64 || "",
        },
      }));

      return res.json({
        data: formattedPhotos,
        meta: response.meta,
      });
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
      const data = await this.placeService.getPlaceDetails(id);

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      const { buffer, contentType } = await this.placeService.getPhoto(
        id,
        photoId
      );
      return res.contentType(contentType).send(buffer);
    } catch (error) {
      console.error("Error fetching photo:", error);
      return res.status(500).json({
        error: "Internal server error",
        details: error instanceof Error ? error.message : undefined,
      });
    }
  }
}
