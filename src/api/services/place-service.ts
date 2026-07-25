import NodeCache from "node-cache";
import { RegisterPlace } from "../models/register-place.model";
import { YHIS_API_URL } from "../config/app-config";

// Cache configuration - items expire after 15 minutes
const cache = new NodeCache({ stdTTL: 900 });

const BASE_URL = `${YHIS_API_URL}/api/register`;

interface ApiResponse<T> {
  data: T[];
  meta: {
    page: number;
    page_size: number;
    item_count: number;
    page_count: number;
  };
}

export class PlaceService {
  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    // Check cache first
    const cachedData = cache.get<T>(cacheKey);
    if (cachedData) {
      console.log(`[Cache Hit] ${cacheKey}`);
      return cachedData;
    }
    console.log(`[Cache Miss] ${cacheKey}`);

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} - ${errorText}`
      );
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = (await response.json()) as T;
    cache.set(cacheKey, data);
    console.log(`[Cache Set] ${cacheKey}`);
    return data;
  }

  async getPlaces(page: number = 1): Promise<ApiResponse<RegisterPlace>> {
    // YHIS register API paginates with ?page= (fixed page size of 12)
    const url = `${BASE_URL}?page=${page}`;
    return this.fetchWithCache<ApiResponse<RegisterPlace>>(
      url,
      `places_page_${page}`
    );
  }

  async getPlaceById(id: number): Promise<RegisterPlace> {
    const url = `${BASE_URL}/${id}`;
    return this.fetchWithCache<RegisterPlace>(url, `place_${id}`);
  }

  async getPlaceDetails(id: string): Promise<RegisterPlace> {
    return this.getPlaceById(parseInt(id));
  }

  async getPlacePhotos(id: string): Promise<any> {
    const url = `${BASE_URL}/${id}/photos`;
    return this.fetchWithCache(url, `place_photos_${id}`);
  }

  async getPhoto(
    id: string,
    photoId: string
  ): Promise<{ buffer: Buffer; contentType: string }> {
    const url = `${BASE_URL}/${id}/photos/${photoId}`;
    const cacheKey = `photo_${id}_${photoId}`;

    // Check cache first
    const cachedPhoto = cache.get<{ buffer: Buffer; contentType: string }>(
      cacheKey
    );
    if (cachedPhoto) {
      return cachedPhoto;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch photo: ${response.status} - ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType) {
      throw new Error("No content type received from photo endpoint");
    }

    const imageBuffer = await response.arrayBuffer();
    const photoData = {
      buffer: Buffer.from(imageBuffer),
      contentType,
    };

    cache.set(cacheKey, photoData);
    return photoData;
  }
}

export const placeService = new PlaceService();
