# URLs and Endpoints Documentation

## External Services

### Map Services

1. **OpenStreetMap**

   - Tile Service: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
   - Attribution: OpenStreetMap contributors
   - Usage: Base map layer in MapLoader.vue and BasicMap.vue
   - Features:
     - Free and open-source
     - Global coverage
     - Standard tile format

2. **ArcGIS**

   - Server: `https://yukon.maps.arcgis.com`
   - WebMap ID: `5e6f859dadad41e5894b33a506c67f0a`
   - Usage: Advanced map visualization in AdvancedMap.vue
   - Features:
     - Yukon-specific data
     - Advanced GIS capabilities
     - Integration with GeoYukon services

3. **GeoYukon Services**
   - Base URL: `https://mapservices.gov.yk.ca/arcgis/rest/services/`
   - Culture Heritage Layer: `GeoYukon/GY_CultureHeritage/MapServer/0`
   - Usage: Heritage data visualization in BasicMap.vue
   - Features:
     - Government-hosted services
     - Yukon-specific heritage data
     - ArcGIS REST API

### Image Services

1. **Place Images**
   - Base URL: `http://register.yukonhistoricplaces.ca/Images/Places/`
   - URL Structure: `http://register.yukonhistoricplaces.ca/Images/Places/${siteID}/${photoIndex}.jpg`
   - Example: `http://register.yukonhistoricplaces.ca/Images/Places/598/1.jpg`
   - Usage: PlacesForm.vue carousel component
   - Features:
     - Organized by site ID
     - Sequential photo indexing
     - JPG format
     - External hosting

### Authentication Service

- Auth0 Domain: `cirque.auth0.com`
- Client ID: `KNtKQKCEIGLJYSDH8rj3WhCkzK9QECqF`
- Audience: `testing`

## Internal API Endpoints

### Base Configuration

- Development: `http://localhost:3000`
- Production: Relative path `/api`
- Configuration Endpoint:
  - Development: `http://localhost:3000/api/config`
  - Production: `/api/config`

### Active Endpoints

1. **User Services**

   - `/api/users/me` - User profile endpoint
   - Usage: Profile.vue component

2. **System Services**

   - `/api/healthcheck` - Health check endpoint
   - Usage: System monitoring

3. **Map Services**

   - `${MAPS_URL}` - Maps service endpoint
   - Usage: AdvancedMap.vue component

4. **Generic Endpoint**
   - `/api/some-endpoint` - Testing endpoint
   - Usage: SecureAPI.vue component

## Asset URLs

### Map Assets

- Marker Icons:
  - `leaflet/dist/images/marker-icon-2x.png`
  - `leaflet/dist/images/marker-icon.png`
  - `leaflet/dist/images/marker-shadow.png`

### Image Assets

- Place Photos:
  - External hosting on register.yukonhistoricplaces.ca
  - Sequential numbering (1.jpg, 2.jpg, etc.)
  - Organized by site ID
  - Used in carousel components

## API Call Patterns

### Authentication Flow

1. Token Acquisition:
   ```javascript
   getAccessTokenSilently();
   ```
2. Secure API Calls:
   ```javascript
   secureCall(method, url);
   ```

### Error Handling

- Centralized in ApiStore
- Status code handling
- Error message formatting
- Notification system integration

## Map Configuration

### Default Settings

- Center Coordinates: `[64.0, -135.0]` (Yukon)
- Default Zoom: `8`
- Map Attribution: OpenStreetMap contributors

## Security Considerations

1. **Authentication**

   - Token-based authentication
   - Secure API calls
   - Token refresh mechanism

2. **API Access**

   - All calls go through ApiStore
   - Secure/non-secure call separation
   - Error handling centralization

3. **Environment Configuration**

   - Development vs Production URLs
   - Environment variable management
   - Secure credential handling

4. **External Resources**
   - External image hosting
   - Map service authentication
   - Cross-origin resource handling

## Usage Patterns

1. **Map Components**

   - OpenStreetMap for base layers
   - ArcGIS for advanced features
   - Custom markers and overlays

2. **API Components**

   - SecureAPI.vue for testing
   - Profile.vue for user data
   - MapLoader.vue for spatial data

3. **Image Components**

   - Carousel display in PlacesForm.vue
   - External image hosting
   - Sequential photo loading

4. **Store Integration**
   - Centralized API calls
   - Token management
   - Error handling

## Notes

- All API calls require proper authentication
- Map services have their own authentication
- Environment-specific configurations
- Secure credential handling
- External image hosting requires proper CORS configuration
