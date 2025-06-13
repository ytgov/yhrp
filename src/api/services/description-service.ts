import NodeCache from "node-cache";

// Cache configuration - items expire after 15 minutes
const cache = new NodeCache({ stdTTL: 900 });

const BASE_URL = "https://yhis.gov.yk.ca/api/register";

export class DescriptionService {
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

  async getForPlace(id: number): Promise<any[]> {
    const url = `${BASE_URL}/${id}/descriptions`;
    return this.fetchWithCache(url, `place_descriptions_${id}`);
  }
}

export const descriptionService = new DescriptionService();
