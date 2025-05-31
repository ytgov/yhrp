# Places Module

## Overview

The Places module handles the management and display of places in the YHRP Site Registry Viewer. It provides functionality for viewing, searching, and managing place entries.

## Directory Structure

```
places/
├── components/     # Reusable UI components specific to places
├── data/          # Mock data and data types
│   └── mock/      # Markdown-based mock data and conversion scripts
├── router/        # Route definitions for places
├── services/      # API integration and data fetching
└── views/         # Main view components
```

## Features

- Place listing and search
- Place details view with rich content display
- Markdown-based mock data with custom parser
- Data transformation layer for UI components
- Proper error handling and loading states
- Image handling with fallback support

## Development Status

- [x] Basic component structure
- [x] Mock data implementation with markdown parser
- [x] Data transformation layer
- [x] Error handling
- [x] Loading states
- [x] Image handling with fallbacks
- [ ] API integration (pending backend)
- [ ] Pagination (pending backend)

## Data Structure

The module uses a consistent data structure for places:

```typescript
interface Place {
  placeId: string;
  name: string;
  location: string;
  description: string;
  coordinates: [number, number];
  designations: string[];
  heritageValues: {
    title: string;
    items: string[];
  }[];
  historicalSources: {
    title: string;
    items: string[];
  }[];
  culturalHistory: string;
}
```

## Mock Data

Mock data is stored in markdown format and converted to JSON using a custom parser. The markdown files follow a specific structure:

- Overview section with basic information
- Designation details
- Description
- Heritage values with subsections
- Historical sources
- Cultural history

See `data/mock/README.md` for detailed format specifications.

## Future Work

- Complete backend API implementation
- Add proper pagination handling
- Implement search functionality
- Add filtering options
- Enhance image handling with proper backend integration
- Add support for multiple languages
- Implement proper data validation
- Add unit tests for data transformation
- Add integration tests for API calls
