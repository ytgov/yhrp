# Application Overview

## Purpose

The Yukon Register of Historic Places (YHRP) is a public-facing web application that provides access to the official register of designated heritage sites in Yukon, Canada. It serves as a read-only viewer for data maintained in the Yukon Heritage Information System (YHIS).

**Key characteristics:**
- Bilingual (English and French)
- Read-only public access
- No authentication required

**Upstream API:** https://github.com/ytgov/yhsi

## Architecture

### System Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vue 3 SPA     │────▶│  Express Proxy  │────▶│   YHIS API      │
│   (Frontend)    │     │   (Backend)     │     │  (Government)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │  node-cache     │
                        │  (15 min TTL)   │
                        └─────────────────┘
```

### Frontend (src/web/)

Built with Vue 3 and Vuetify 3, the frontend is a single-page application with:

- **Composition API** - All components use `<script setup>` syntax
- **Service-based data fetching** - No global state management
- **Leaflet maps** - Interactive mapping for place locations
- **Responsive design** - Works on desktop and mobile

**Key modules:**
- `home` - Landing page with featured places
- `places` - List view and detail pages
- `map` - Full-screen interactive map

### Backend (src/api/)

An Express.js server (TypeScript) that acts as a caching proxy:

- **Proxies requests** to the government YHIS API
- **Caches responses** for 15 minutes to reduce load
- **Serves static files** (compiled frontend) in production
- **Single deployment** - Frontend and backend in one container

**API Endpoints:**
| Endpoint | Description |
|----------|-------------|
| `GET /api/register` | Paginated list of places |
| `GET /api/register/:id` | Single place details |
| `GET /api/register/:id/photos` | Photos for a place |
| `GET /api/register/:id/photos/:photoId` | Single photo file |

## Data Flow

1. **User visits page** → Vue router loads appropriate view
2. **View mounts** → Calls service function (e.g., `fetchPlaces()`)
3. **Service calls** → Local Express API (`/api/register/...`)
4. **Express checks cache** → Returns cached data if valid
5. **Cache miss** → Fetches from YHIS API, caches response
6. **Data returned** → Vue component renders content

## Key Technologies

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Vue 3 | UI framework |
| UI Components | Vuetify 3 | Material Design components |
| Maps | Leaflet | Interactive maps |
| Backend | Express.js | API server |
| Language | TypeScript | Type-safe backend |
| Caching | node-cache | In-memory response cache |
| Build | Vite | Frontend bundling |
| Deployment | Docker | Containerization |

## Bilingual Content

The application supports English and French. The YHSI API returns content in paired fields:

| Content Type | English Field | French Field |
|--------------|---------------|--------------|
| Place Description | `placeDescriptionEn` | `placeDescriptionFr` |
| Heritage Value | `heritageValueEn` | `heritageValueFr` |
| Character Definition | `characterDefEn` | `characterDefFr` |
| Boundary Description | `descBoundEn` | `descBoundFr` |
| Additional Info | `additionalInfoEn` | `additionalInfoFr` |

The frontend displays content based on the user's language selection, typically stored in component state as `currentLang` (`'EN'` or `'FR'`).

**API Reference:** See [register-router.ts](https://github.com/ytgov/yhsi/blob/main/api/routes/register-router.ts) in the YHSI repo for how bilingual fields are populated.

## Security Considerations

- **Read-only** - No user input is written to any database
- **CORS enabled** - Configured for expected origins
- **No authentication** - Public data, no login required
- **Caching** - Reduces exposure to upstream API issues

## Performance

- **15-minute cache** - Reduces calls to government API
- **Lazy loading** - Routes loaded on demand
- **Image optimization** - Thumbnails served from API
- **Single container** - Minimizes deployment complexity
