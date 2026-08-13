import NodeCache from "node-cache";
import {
  PhotosResponse,
  RegisterPlacesResponse,
  RegisterPlaceResponse,
} from "../models/api-response.model";
import { RegisterPlace } from "../models/register-place.model";
import { YHIS_API_URL } from "../config/app-config";

// Cache configuration - items expire after 15 minutes
const cache = new NodeCache({ stdTTL: 900 });

const BASE_URL = `${YHIS_API_URL}/api/register`;

export class PlaceService {
  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
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

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = (await response.json()) as T;
    cache.set(cacheKey, data);
    console.log(`[Cache Set] ${cacheKey}`);
    return data;
  }

  async getPlaces(page: number = 1): Promise<RegisterPlacesResponse> {
    // YHIS register API paginates with ?page= (fixed page size of 12)
    const url = `${BASE_URL}?page=${page}`;
    return this.fetchWithCache<RegisterPlacesResponse>(
      url,
      `places_page_${page}`
    );
  }

  /**
   * Search the public register. Proxies YHIS POST /api/register/search.
   * Empty query returns the full register (same as getPlaces).
   */
  async searchPlaces(
    query: string = "",
    page: number = 1
  ): Promise<RegisterPlacesResponse> {
    const normalizedQuery = (query ?? "").trim();
    const cacheKey = `places_search_${normalizedQuery.toLowerCase()}_page_${page}`;

    const cachedData = cache.get<RegisterPlacesResponse>(cacheKey);
    if (cachedData) {
      console.log(`[Cache Hit] ${cacheKey}`);
      return cachedData;
    }
    console.log(`[Cache Miss] ${cacheKey}`);

    const url = `${BASE_URL}/search?page=${page}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: normalizedQuery }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to search places: ${response.status} - ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = (await response.json()) as RegisterPlacesResponse;
    cache.set(cacheKey, data);
    console.log(`[Cache Set] ${cacheKey}`);
    return data;
  }

  /**
   * Fetch a place by id. YHIS returns `{ data: place }`; we unwrap to the place.
   * Returns undefined when YHIS responds 404.
   */
  async getPlaceById(id: number): Promise<RegisterPlace | undefined> {
    const url = `${BASE_URL}/${id}`;
    const cacheKey = `place_${id}`;

    const cachedData = cache.get<RegisterPlace>(cacheKey);
    if (cachedData) {
      console.log(`[Cache Hit] ${cacheKey}`);
      return cachedData;
    }
    console.log(`[Cache Miss] ${cacheKey}`);

    const response = await fetch(url);
    if (response.status === 404) {
      return undefined;
    }
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} - ${errorText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const body = (await response.json()) as RegisterPlaceResponse;
    const place = body?.data;
    if (!place) {
      return undefined;
    }

    cache.set(cacheKey, place);
    console.log(`[Cache Set] ${cacheKey}`);
    return place;
  }

  async getPlaceDetails(id: string): Promise<RegisterPlace | undefined> {
    return this.getPlaceById(parseInt(id, 10));
  }

  async getPlacePhotos(id: string): Promise<PhotosResponse> {
    const url = `${BASE_URL}/${id}/photos`;
    return this.fetchWithCache<PhotosResponse>(url, `place_photos_${id}`);
  }

  async getPhoto(
    id: string,
    photoId: string
  ): Promise<{ buffer: Buffer; contentType: string }> {
    const url = `${BASE_URL}/${id}/photos/${photoId}`;
    const cacheKey = `photo_${id}_${photoId}`;

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
