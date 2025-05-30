# Places API Schema Documentation

## Overview

This document outlines the API endpoints and request/response schemas for the Places module. The API supports CRUD operations, search, and filtering capabilities for historic places.

## Base URL

```
http://localhost:3000/api/places
```

## Endpoints

### 1. Get Places List

```
GET /api/places
```

#### Query Parameters

```typescript
interface PlacesQueryParams {
  page?: number; // Page number (default: 1)
  page_size?: number; // Items per page (default: 10)
  sort?: string; // Sort field
  order?: "asc" | "desc"; // Sort order
  search?: string; // Search term
}
```

#### Response

```typescript
interface PlacesListResponse {
  placesList: PlaceListItem[];
  page: number;
  numberOfPages: number;
  page_size: number;
  totalLength: number;
}
```

### 2. Get Place Details

```
GET /api/places/:id
```

#### Response

```typescript
interface PlaceResponse {
  PlaceId: string;
  PrimaryName: string;
  Community: string;
  recognitionDate: string;
  designations: string;
  latitude: string;
  longitude: string;
  fieldsByLang: {
    En: LanguageContent;
    Fr: LanguageContent;
  };
  photos: number[];
}
```

### 3. Search Places

```
POST /api/places/search
```

#### Request Body

```typescript
interface SearchRequest {
  query: QueryCondition[];
  page?: number;
  page_size?: number;
  sort?: string;
  order?: "asc" | "desc";
}

interface QueryCondition {
  field: string;
  operator: string;
  value: string;
}
```

#### Response

```typescript
interface SearchResponse {
  placesList: PlaceListItem[];
  page: number;
  numberOfPages: number;
  page_size: number;
  totalLength: number;
}
```

### 4. Create Place

```
POST /api/places
```

#### Request Body

```typescript
interface CreatePlaceRequest {
  PrimaryName: string;
  Community: string;
  recognitionDate: string;
  designations: string;
  latitude: string;
  longitude: string;
  fieldsByLang: {
    En: LanguageContent;
    Fr: LanguageContent;
  };
  photos: number[];
}
```

#### Response

```typescript
interface CreatePlaceResponse {
  PlaceId: string;
  // ... other place fields
}
```

### 5. Update Place

```
PUT /api/places/:id
```

#### Request Body

```typescript
interface UpdatePlaceRequest {
  PrimaryName?: string;
  Community?: string;
  recognitionDate?: string;
  designations?: string;
  latitude?: string;
  longitude?: string;
  fieldsByLang?: {
    En?: Partial<LanguageContent>;
    Fr?: Partial<LanguageContent>;
  };
  photos?: number[];
}
```

#### Response

```typescript
interface UpdatePlaceResponse {
  success: boolean;
  message: string;
}
```

### 6. Delete Place

```
DELETE /api/places/:id
```

#### Response

```typescript
interface DeletePlaceResponse {
  success: boolean;
  message: string;
}
```

## Error Responses

### Standard Error Format

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

### Common Error Codes

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Authentication

All endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Rate Limiting

- Maximum 100 requests per minute per IP
- Maximum 1000 requests per hour per IP

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Page number (1-based)
- `page_size`: Number of items per page (default: 10)

## Sorting

Supported sort fields:

- `PrimaryName`
- `Community`
- `recognitionDate`
- `latitude`
- `longitude`

## Search Operators

Available operators for search queries:

- `equals`
- `contains`
- `startsWith`
- `endsWith`
- `greaterThan`
- `lessThan`
- `between`

## Examples

### Search Request Example

```javascript
{
  "query": [
    {
      "field": "PrimaryName",
      "operator": "contains",
      "value": "historic"
    },
    {
      "field": "Community",
      "operator": "equals",
      "value": "Whitehorse"
    }
  ],
  "page": 1,
  "page_size": 20,
  "sort": "recognitionDate",
  "order": "desc"
}
```

### Create Place Example

```javascript
{
  "PrimaryName": "Historic Building",
  "Community": "Whitehorse",
  "recognitionDate": "2023-01-01",
  "designations": "Municipal Heritage Site",
  "latitude": "60.7212",
  "longitude": "-135.0568",
  "fieldsByLang": {
    "En": {
      "placeDescription": "A historic building...",
      "heritageValue": "Significant for...",
      "characterDef": "Defined by...",
      "descBound": "Bounded by...",
      "additionalInfo": "Additional details..."
    },
    "Fr": {
      // French translations
    }
  },
  "photos": [1, 2, 3]
}
```
