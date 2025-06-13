import NodeCache from "node-cache";

// Cache configuration - items expire after 15 minutes
const cache = new NodeCache({ stdTTL: 900 });

const BASE_URL = "https://yhis.gov.yk.ca/api/register";

export class PhotoService {
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

    const data = (await response.json()) as T;
    cache.set(cacheKey, data);
    return data;
  }

  async getAllForPlace(id: number): Promise<any[]> {
    const url = `${BASE_URL}/${id}/photos`;
    return this.fetchWithCache(url, `place_photos_${id}`);
  }

  async getFileById(photoId: string): Promise<{ file: Buffer } | null> {
    const url = `${BASE_URL}/photos/${photoId}`;
    const cacheKey = `photo_${photoId}`;

    // Check cache first
    const cachedPhoto = cache.get<{ file: Buffer }>(cacheKey);
    if (cachedPhoto) {
      return cachedPhoto;
    }

    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const imageBuffer = await response.arrayBuffer();
    const photoData = {
      file: Buffer.from(imageBuffer),
    };

    cache.set(cacheKey, photoData);
    return photoData;
  }
}

export const photoService = new PhotoService();
