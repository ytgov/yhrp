# Frontend Module Structure

## Overview

The YHRP frontend uses a feature-based module structure. Each module is self-contained with its own components, views, services, and routes.

## Module Location

All modules are in `src/web/src/modules/`

## Standard Module Structure

```
module-name/
├── components/       # Reusable components specific to this module
├── views/            # Page-level components (1:1 with routes)
├── services/         # API calls and business logic
├── router/           # Route definitions (index.js)
├── models/           # Data models/classes (optional)
└── data/             # Static data, constants (optional)
```

## Current Modules

### home/
Landing page module.

```
home/
├── components/
│   └── HeroCarousel.vue    # Featured places carousel
├── views/
│   ├── Home.vue            # Landing page
│   └── NotFound.vue        # 404 page
└── router/
    └── index.js            # Route: /
```

### places/
Historic places browsing and detail views.

```
places/
├── components/
│   ├── PlaceCard.vue       # Card for places grid
│   ├── PlaceGallery.vue    # Photo gallery
│   ├── PlaceHeader.vue     # Detail page header
│   └── PlaceDesignation.vue # Designation info
├── views/
│   ├── Places.vue          # Paginated places list
│   └── PlacesForm.vue      # Place detail page
├── services/
│   └── placesApi.js        # API integration
├── models/
│   └── Place.js            # Place data model
├── router/
│   └── index.js            # Routes: /places, /places/view/:id
└── data/
    ├── places.json         # Sample/fallback data
    └── mock/               # Mock data for development
```

### map/
Interactive map views.

```
map/
├── components/
│   ├── LeafletMap.vue      # Full-page map with all places
│   └── PlaceLocationMap.vue # Single place location map
├── utils/
│   ├── markerDefinitions.js # Shared marker icons
│   └── markerStyles.css     # Marker styling
└── router/
    └── index.js            # Route: /map
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Vue Components | PascalCase | `PlaceCard.vue` |
| Views | PascalCase | `Places.vue` |
| Services | camelCase | `placesApi.js` |
| Router | index.js | `router/index.js` |
| Models | PascalCase | `Place.js` |

## Adding a New Module

1. Create module folder in `src/web/src/modules/`
2. Add router/index.js with route definitions
3. Import routes in `src/web/src/router.js`:
   ```javascript
   import newModuleRoutes from "@/modules/new-module/router";
   
   const routes = [
     {
       path: "/",
       children: [
         ...homeRoutes,
         ...placesRoutes,
         ...mapRoutes,
         ...newModuleRoutes,  // Add here
       ],
     },
   ];
   ```

## Shared Resources

Components used across multiple modules go in `src/web/src/components/`:
- `AppNavbar.vue` - Main navigation
- `DesktopNavbar.vue` - Desktop nav
- `MobileNavbar.vue` - Mobile nav
- `NavMenu.vue` - Navigation menu
- `Notifications.vue` - Toast notifications

Layouts go in `src/web/src/layouts/`:
- `Default.vue` - Standard layout with navbar
- `Blank.vue` - Minimal layout (used as route wrapper)
