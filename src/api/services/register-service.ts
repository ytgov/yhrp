import NodeCache from "node-cache";

// Cache configuration - items expire after 15 minutes
const cache = new NodeCache({ stdTTL: 900 });

const BASE_URL = "https://yhis.gov.yk.ca/api/register";

export class RegisterService {
  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    // Check cache first
    const cachedData = cache.get<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

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
    return data;
  }

  async getPlaces(page: number = 1): Promise<any> {
    const url = `${BASE_URL}/?page=${page}`;
    return this.fetchWithCache(url, `places_page_${page}`);
  }

  async getPlaceDetails(id: string): Promise<any> {
    const url = `${BASE_URL}/${id}`;
    return this.fetchWithCache(url, `place_${id}`);
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

export const registerService = new RegisterService();
