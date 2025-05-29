# Places Data Schema Documentation

## Overview

This document outlines the data schema used by the Places module components and views. The schema supports a bilingual (English/French) historic places registry with geographic data, media management, and search capabilities.

## Core Data Structure

### Place Object

```typescript
interface Place {
  // Core Identification
  id: number; // Unique identifier for the place
  primaryName: string; // Primary name of the place
  community: string; // Community name
  recognitionDate: string; // Date of recognition
  designations: string; // Designation information

  // Geographic Data
  latitude: string; // Geographic coordinates
  longitude: string; // Geographic coordinates

  // Language-Specific Content
  fieldsByLang: {
    En: LanguageContent;
    Fr: LanguageContent;
  };

  // Media
  ThumbFile: {
    data: number[]; // Binary image data
    base64?: string; // Base64 encoded image
  };

  // Additional Fields
  nTSMapSheet?: string; // NTS Map Sheet reference
  bordenNumber?: string; // Borden Number
  cIHBNumber?: string; // CIHB Number
  fHBRONumber?: string; // FHBRO Number
  yGBuildingNumber?: string; // YG Building Number
  yGReserveNumber?: string; // YG Reserve Number
  yHSIId?: string; // YHSI ID
  yHSPastUse?: string; // Past use information
  yHSThemes?: string; // Themes information
  groupYHSI?: string; // YHSI Group
  lAGroup?: string; // LA Group
  siteDistrictNumber?: string; // Site District Number
  townSiteMapNumber?: string; // Town Site Map Number
  planNumber?: string; // Plan Number
  block?: string; // Block information
  lot?: string; // Lot information
  buildingSize?: string; // Building size
  hectareArea?: string; // Area in hectares
  physicalAddress?: string; // Physical address
  physicalCountry?: string; // Country
  physicalProvince?: string; // Province
  physicalPostalCode?: string; // Postal code
  previousAddress?: string; // Previous address
  otherCommunity?: string; // Other community
  otherLocality?: string; // Other locality
  locationComment?: string; // Location comments
  locationContext?: string; // Location context
  currentUseComment?: string; // Current use comments
  conditionComment?: string; // Condition comments
  resourceType?: string; // Resource type
  zoning?: string; // Zoning information

  // Status and Conditions
  siteStatus?: number; // Site status
  floorCondition?: number; // Floor condition
  wallCondition?: number; // Wall condition
  doorCondition?: number; // Door condition
  roofCondition?: number; // Roof condition
  coordinateDetermination?: number; // Coordinate determination method
  ownerConsent?: number; // Owner consent status
  jurisdiction?: number; // Jurisdiction
  category?: number; // Category
  statuteId?: number; // Statute ID
  statute2Id?: number; // Secondary Statute ID

  // Boolean Flags
  isPubliclyAccessible?: boolean; // Public access status
  showInRegister?: boolean; // Show in register status

  // Arrays
  associations?: any[]; // Associations
  constructionPeriods?: any[]; // Construction periods
  contacts?: any[]; // Contacts
  contributingResources?: any[]; // Contributing resources
  dates?: any[]; // Dates
  descriptions?: any[]; // Descriptions
  designations?: any[]; // Designations
  firstNationAssociations?: any[]; // First Nation associations
  functionalUses?: any[]; // Functional uses
  historicalPatterns?: any[]; // Historical patterns
  names?: any[]; // Names
  ownerships?: any[]; // Ownerships
  previousOwnerships?: any[]; // Previous ownerships
  records?: any[]; // Records
  revisionLogs?: any[]; // Revision logs
  siteCategories?: any[]; // Site categories
  themes?: any[]; // Themes
  webLinks?: any[]; // Web links
}

interface LanguageContent {
  placeDescription: string; // General description of the place
  heritageValue: string; // Heritage significance
  characterDef: string; // Character-defining elements
  descBound: string; // Boundary description
  additionalInfo: string; // Additional information
}
```

## List View Schema

```typescript
interface PlacesListResponse {
  data: PlaceListItem[];
  meta: {
    page: number;
    page_size: number;
    item_count: number;
    page_count: number;
  };
}

interface PlaceListItem {
  id: number;
  community: string;
  primaryName: string;
  ThumbFile: {
    data: number[];
    base64?: string;
  };
}
```

## Search and Filter Schema

```typescript
interface SearchRequest {
  query: {
    search?: string;
    sortBy?: string[];
    page?: number;
    itemsPerPage?: number;
    groupBy?: string[];
    groupDesc?: string[];
  };
}

interface SearchResponse {
  data: PlaceListItem[];
  meta: {
    page: number;
    page_size: number;
    item_count: number;
    page_count: number;
  };
}
```

## API Endpoints

### Get Places List

```
GET /api/places
Query Parameters:
- page: number (default: 1)
- page_size: number (default: 10)
```

### Get Place Details

```
GET /api/places/:id
```

### Search Places

```
POST /api/places/search
Body: SearchRequest
```

### Create Place

```
POST /api/places
Body: Place
```

### Update Place

```
PATCH /api/places/:id
Body: Partial<Place>
```

### Delete Place

```
DELETE /api/places/:id
```

### Add Photo

```
POST /api/places/:id/photo
Body: FormData with file
```

### Get Primary Photo

```
GET /api/places/:id/primary-photo
```

## Notes

- All text fields should support Unicode characters for proper bilingual support
- Geographic coordinates should be stored as strings to preserve precision
- Photo data is handled as binary arrays that can be converted to base64 for display
- Pagination metadata includes total item count and page count
- Search supports multiple sort fields and grouping options
- Many fields are optional and may be null
- Numeric condition fields use predefined codes
- Boolean flags control visibility and access
- Arrays contain related entities that may have their own schemas
