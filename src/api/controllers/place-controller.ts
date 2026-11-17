import { Request, Response } from "express";
import {
  ErrorResponse,
  PhotosResponse,
  RegisterPhoto,
  RegisterPlaceResponse,
  RegisterPlacesResponse,
} from "../models/api-response.model";
import { PlaceService } from "../services/place-service";
import { MAX_QUERY_LENGTH, parseId, parsePage } from "./request-validation";

// Upstream error details are logged on the server only; clients get a
// generic message so YHIS responses are never echoed back.
const INTERNAL_ERROR: ErrorResponse = { error: "Internal server error" };
const INVALID_PAGE: ErrorResponse = { error: "Page must be a positive integer" };
const INVALID_ID: ErrorResponse = { error: "Invalid id" };

export class PlaceController {
  constructor(private placeService: PlaceService) {}

  async getPlaces(
    req: Request,
    res: Response<RegisterPlacesResponse | ErrorResponse>
  ) {
    const page = parsePage(req.query.page);
    if (page === undefined) {
      return res.status(400).json(INVALID_PAGE);
    }

    try {
      const response: RegisterPlacesResponse =
        await this.placeService.getPlaces(page);

      return res.json(response);
    } catch (error) {
      console.error("Error fetching places:", error);
      return res.status(500).json({ error: "Failed to fetch places" });
    }
  }

  async searchPlaces(
    req: Request,
    res: Response<RegisterPlacesResponse | ErrorResponse>
  ) {
    const page = parsePage(req.query.page);
    if (page === undefined) {
      return res.status(400).json(INVALID_PAGE);
    }

    const query = typeof req.body?.query === "string" ? req.body.query : "";
    if (query.length > MAX_QUERY_LENGTH) {
      return res.status(400).json({
        error: `Query must be ${MAX_QUERY_LENGTH} characters or fewer`,
      });
    }

    try {
      const response: RegisterPlacesResponse =
        await this.placeService.searchPlaces(query, page);

      return res.json(response);
    } catch (error) {
      console.error("Error searching places:", error);
      return res.status(500).json({ error: "Failed to search places" });
    }
  }

  async getPlaceDetails(
    req: Request,
    res: Response<RegisterPlaceResponse | ErrorResponse>
  ) {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json(INVALID_ID);
    }

    try {
      const place = await this.placeService.getPlaceDetails(id);

      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }

      // Match YHIS / frontend contract: { data: place }
      return res.json({ data: place });
    } catch (error) {
      console.error("Error fetching place details:", error);
      return res.status(500).json(INTERNAL_ERROR);
    }
  }

  async getPlacePhotos(
    req: Request,
    res: Response<PhotosResponse | ErrorResponse>
  ) {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json(INVALID_ID);
    }

    try {
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
      return res.status(500).json(INTERNAL_ERROR);
    }
  }

  async getPhotoFile(req: Request, res: Response<Buffer | ErrorResponse>) {
    const id = parseId(req.params.id);
    const photoId = parseId(req.params.photoId);
    if (!id || !photoId) {
      return res.status(400).json(INVALID_ID);
    }

    try {
      const place = await this.placeService.getPlaceDetails(id);

      if (!place) {
        return res.status(404).json({ error: "Place not found" });
      }

      const { buffer, contentType } = await this.placeService.getPhoto(
        id,
        photoId
      );

      // Only ever serve images from our origin, whatever YHIS returns.
      if (!contentType.toLowerCase().startsWith("image/")) {
        console.error(`Unexpected photo content type: ${contentType}`);
        return res.status(502).json({ error: "Invalid photo response" });
      }

      res.setHeader("X-Content-Type-Options", "nosniff");
      return res.contentType(contentType).send(buffer);
    } catch (error) {
      console.error("Error fetching photo:", error);
      return res.status(500).json(INTERNAL_ERROR);
    }
  }
}
