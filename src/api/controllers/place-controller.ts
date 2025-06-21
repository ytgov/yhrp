import { Request, Response } from "express";
import {
  ErrorResponse,
  RegisterPlaceResponse,
} from "../models/api-response.model";
import { PlaceService } from "../services/place-service";

interface ApiResponse<T> {
  data: T[];
  meta: {
    page: number;
    page_size: number;
    item_count: number;
    page_count: number;
  };
}

export class PlaceController {
  constructor(private placeService: PlaceService) {}

  async getPlaces(
    req: Request,
    res: Response<ApiResponse<any> | ErrorResponse>
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const response: ApiResponse<any> = await this.placeService.getPlaces(
        page
      );

      const places = response.data.map((place: any) => ({
        id: place.id,
        name: place.name,
        description: place.description,
        latitude: place.latitude,
        longitude: place.longitude,
        photos: place.photos,
      }));

      res.json({
        data: places,
        meta: response.meta,
      });
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
      const data = await this.placeService.getPlaceDetails(id);

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
    res: Response<ApiResponse<any> | ErrorResponse>
  ) {
    try {
      const { id } = req.params;
      const data = await this.placeService.getPlaceDetails(id);

      if (!data) {
        return res.status(404).json({ error: "Place not found" });
      }

      const response: ApiResponse<any> = await this.placeService.getPlacePhotos(
        id
      );

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
