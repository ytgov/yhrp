# Yukon Register of Historic Places (YHRP)

A public-facing web application for browsing and exploring designated heritage sites throughout Yukon, Canada.

## What This App Does

YHRP provides citizens with access to the Yukon Register of Historic Places - a database of heritage sites maintained by the Yukon Government. Users can:

- Browse a paginated list of historic places with photos
- View detailed information about each place (designation, heritage value, boundaries, etc.)
- See place locations on an interactive map
- Explore all places on a full-screen map view
- View content in **English or French** (bilingual)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Vue 3 Frontend (Vuetify 3)                   │
│                                                                 │
│  Routes:                                                        │
│    /           → Home page with featured places carousel        │
│    /places     → Paginated grid of all historic places          │
│    /places/view/:id → Place details with photos & map           │
│    /map        → Full-screen interactive map                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express API (Caching Proxy)                  │
│                                                                 │
│  Endpoints:                                                     │
│    GET /api/register          → Paginated places list           │
│    GET /api/register/:id      → Single place details            │
│    GET /api/register/:id/photos → Photos for a place            │
│    GET /api/register/:id/photos/:photoId → Single photo file    │
│                                                                 │
│  Features:                                                      │
│    • 15-minute in-memory cache (node-cache)                     │
│    • Serves frontend static files in production                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              Yukon Heritage Information System (YHSI) API       │
│              https://yhis.gov.yk.ca/api/register               │
│                                                                 │
│  Source: github.com/ytgov/yhsi                                 │
│  (External government API - source of truth for place data)    │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend Framework | Vue 3 (Composition API) |
| UI Components | Vuetify 3 |
| Maps | Leaflet |
| Backend | Express.js + TypeScript |
| Caching | node-cache (15-min TTL) |
| Deployment | Docker (single container) |

## Bilingual Support

The application supports English and French. Users can toggle language via the navbar.

**Two types of bilingual content:**

1. **API Content** - Place descriptions come from YHIS with paired fields (`*En` / `*Fr`)
2. **UI Strings** - Labels and buttons are managed in a CSV file

**For translators and developers:** See [src/docs/translations.md](src/docs/translations.md) for:
- How to add new translated labels
- Working with translation services
- CSV file format and workflow

## Project Structure

```
yhrp/
├── src/
│   ├── api/                    # Express backend
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic + caching
│   │   ├── models/             # TypeScript interfaces
│   │   ├── routes/             # Route definitions
│   │   └── index.ts            # App entry point
│   │
│   ├── web/                    # Vue 3 frontend
│   │   └── src/
│   │       ├── modules/        # Feature modules
│   │       │   ├── home/       # Home page
│   │       │   ├── places/     # Places list & details
│   │       │   └── map/        # Map views
│   │       ├── components/     # Shared components
│   │       ├── layouts/        # Page layouts
│   │       ├── plugins/        # Vuetify setup
│   │       └── services/       # Shared services
│   │
│   └── docs/                   # Documentation
│       ├── architecture/       # Technical docs
│       ├── processes/          # Dev workflows
│       └── development/        # Dev guides
│
├── Dockerfile                  # Production build
└── CHANGELOG.md               # Version history
```

## Development Setup

### Prerequisites

- Node.js 20+
- npm

### Quick Start

```bash
# Install dependencies
cd src/api && npm install
cd ../web && npm install

# Start development servers (2 terminals)

# Terminal 1 - API (port 3000)
cd src/api
npm run start:dev

# Terminal 2 - Frontend (port 5173)
cd src/web
npm run dev
```

Access the app at http://localhost:5173

### Available Scripts

**Frontend (`src/web/`):**
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run tests
```

**Backend (`src/api/`):**
```bash
npm run start:dev    # Start with hot reload
npm run build:api    # Compile TypeScript
npm test             # Run tests
```

## Deployment

### Docker Build

```bash
# Build image
docker build -t yhrp-viewer .

# Run container
docker run -p 8222:3000 -e NODE_ENV=production --restart=on-failure yhrp-viewer
```

The Docker build:
1. Compiles the Vue frontend
2. Compiles the Express backend
3. Bundles everything into a single Node.js container
4. Serves frontend as static files from Express

## Contributing

See `src/docs/processes/` for:
- `branching-strategy.md` - Git workflow
- `release-process.md` - Release procedures
- `CHANGELOG_GUIDE.md` - Changelog format

### Branch Naming

- Features: `feature/description`
- Bugfixes: `bugfix/description`
- Hotfixes: `hotfix/description`
- Releases: `release/vX.Y.Z`

### Commit Format

Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

## License

Internal use only - Yukon Government
