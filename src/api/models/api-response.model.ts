import { RegisterPlace } from "./register-place.model";

/**
 * Standard API response structure for paginated lists
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    page_size: number;
    item_count: number;
    page_count: number;
  };
}

/**
 * Standard API response structure for single items
 */
export interface SingleItemResponse<T> {
  data: T;
}

/**
 * Standard API error response
 */
export interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * Type for the register places list response
 */
export type RegisterPlacesResponse = PaginatedResponse<RegisterPlace>;

/**
 * Type for a single register place response
 */
export type RegisterPlaceResponse = SingleItemResponse<RegisterPlace>;

/**
 * Type for the photos list response
 */
export interface Photo {
  id: number;
  url: string;
  description?: string;
  dateTaken?: string;
}

export type PhotosResponse = SingleItemResponse<Photo[]>;
