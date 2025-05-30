# API Consumption Documentation

## Map Module

### AdvancedMap.vue

- **Map Service API**:
  - Endpoint: `MAPS_URL` (configured in urls.js)
  - Features:
    - ArcGIS WebMap integration
    - Layer management
    - Basemap gallery
    - Search functionality
    - Legend display
  - Authentication:
    - Uses token-based authentication
    - Token management through `loadToken` action

### MapLoader.vue

- **Map Data API**:
  - Endpoint: `/api/maps`
  - Features:
    - Map data loading
    - Layer configuration
    - Spatial data visualization

## Places Module

### PrintButton.vue

- **Data Export API**:
  - Features:
    - PDF generation using jsPDF
    - Data formatting for export
    - Custom section handling
  - No direct API calls, but processes data for export

### QueryMultiSelect.vue

- **Search API**:
  - Features:
    - Multi-select search functionality
    - Place data filtering
    - Dynamic query building

## Home Module

### SecureAPI.vue

- **Generic API Interface**:
  - Endpoints: Dynamic based on path input
  - Methods:
    - GET
    - POST
    - PUT
    - DELETE
  - Features:
    - Secure API calls through `ApiStore`
    - Response handling
    - Error management

### Profile.vue

- **User API**:
  - Endpoint: `/api/user/me`
  - Features:
    - User profile management
    - Team information
    - Role-based access

## Common Patterns

1. **Authentication**:

   - Token-based authentication
   - Secure API calls through centralized store
   - Role-based access control

2. **Data Handling**:

   - Centralized state management
   - Response formatting
   - Error handling

3. **API Integration**:

   - Use of Vuex/Pinia stores
   - Axios for HTTP requests
   - Environment-based configuration

4. **Map Services**:
   - ArcGIS integration
   - Layer management
   - Spatial data handling

## API Endpoints Summary

1. **Map Services**:

   - `MAPS_URL` - Base URL for map services
   - `/api/maps` - Map data endpoint

2. **User Services**:

   - `/api/user/me` - User profile
   - `/api/auth` - Authentication endpoints

3. **Place Services**:

   - `/api/place` - Place data
   - `/api/community` - Community data
   - `/api/first-nation` - First Nation data

4. **Media Services**:

   - `/api/photo` - Photo management
   - `/api/photobatch` - Batch photo operations

5. **History Services**:
   - `/api/ytplacehistory` - Place history
   - `/api/ytplace` - Place data

## Security Features

1. **Authentication**:

   - Token-based authentication
   - Secure API calls
   - Role-based access control

2. **Data Protection**:

   - Environment variable management
   - Secure API endpoints
   - Input validation

3. **Session Management**:
   - Token refresh
   - Session timeout handling
   - Secure storage
