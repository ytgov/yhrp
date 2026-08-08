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
 * Type for a single register place response ({ data: place })
 */
export type RegisterPlaceResponse = SingleItemResponse<RegisterPlace>;

/**
 * Photo record from YHIS register photos endpoint.
 * Extra YHIS fields may be present; we type the ones the app uses.
 */
export interface RegisterPhoto {
  id: number;
  rowId?: string;
  placeId?: number;
  originalFileName?: string;
  featureName?: string;
  communityName?: string;
  caption?: string | null;
  isYRHPCoverImage?: boolean;
  ThumbFile?: {
    type?: string;
    data?: number[];
    base64?: string;
  } | null;
}

/**
 * Photos list response from our proxy / YHIS
 */
export type PhotosResponse = {
  data: RegisterPhoto[];
  meta?: Record<string, unknown>;
};
