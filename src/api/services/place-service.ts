import NodeCache from "node-cache";

// Cache configuration - items expire after 15 minutes
const cache = new NodeCache({ stdTTL: 900 });

const BASE_URL = "https://yhis.gov.yk.ca/api/register";

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

  async getPlaceAll(skip: number, take: number): Promise<ApiResponse<any>> {
    const url = `${BASE_URL}/?skip=${skip}&take=${take}`;
    return this.fetchWithCache(url, `places_${skip}_${take}`);
  }

  async getPlaceInPlaceCount(): Promise<number> {
    const url = `${BASE_URL}/count`;
    return this.fetchWithCache(url, "place_count");
  }

  async getPlaceById(id: number): Promise<any> {
    const url = `${BASE_URL}/${id}`;
    return this.fetchWithCache(url, `place_${id}`);
  }

  async getPlaces(page: number = 1): Promise<ApiResponse<any>> {
    const skip = (page - 1) * 12;
    const take = 12;
    return this.getPlaceAll(skip, take);
  }

  async getPlaceDetails(id: string): Promise<any> {
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
