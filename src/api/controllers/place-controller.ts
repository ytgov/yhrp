import { Request, Response } from "express";
import {
  ErrorResponse,
  PhotosResponse,
  RegisterPhoto,
  RegisterPlaceResponse,
  RegisterPlacesResponse,
} from "../models/api-response.model";
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

      res.json(response);
    } catch (error) {
      console.error("Error fetching places:", error);
      res.status(500).json({ error: "Failed to fetch places" });
    }
  }

  async getPlaceDetails(
    req: Request,
    res: Response<RegisterPlaceResponse | ErrorResponse>
  ) {
    try {
      const { id } = req.params;
      const place = await this.placeService.getPlaceDetails(id);

      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }

      // Match YHIS / frontend contract: { data: place }
      return res.json({ data: place });
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
      const place = await this.placeService.getPlaceDetails(id);

      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }

      const response = await this.placeService.getPlacePhotos(id);

      const formattedPhotos: RegisterPhoto[] = (response.data || []).map(
        (photo: RegisterPhoto) => ({
          ...photo,
          ThumbFile: {
            data: photo.ThumbFile?.data || [],
            base64: photo.ThumbFile?.base64 || "",
          },
        })
      );

      const payload: PhotosResponse = {
        data: formattedPhotos,
        meta: response.meta,
      };

      return res.json(payload);
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
      const place = await this.placeService.getPlaceDetails(id);

      if (!place) {
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
