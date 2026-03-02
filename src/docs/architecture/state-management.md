# State Management

## Philosophy

YHRP uses a **service-based architecture** instead of global state management libraries. This keeps the codebase simple and appropriate for a read-only data display application.

## Why No Vuex/Pinia?

This application:
- Displays read-only data from an external API
- Has no complex state that needs to be shared globally
- Has no user accounts or session state
- Has simple, linear data flow

Global state management would add unnecessary complexity.

## Current Approach

### Local Component State

Each component manages its own state using Vue 3's Composition API:

```javascript
const data = ref([]);
const loading = ref(false);
const error = ref(null);
```

### Services for API Calls

API integration is handled by service modules that export functions:

```javascript
// In services/placesApi.js
export const fetchPlaces = async (page = 1) => {
  const response = await fetch(`${API_BASE_URL}?page=${page}`);
  return response.json();
};

// In component
import { fetchPlaces } from "../services/placesApi";
const places = await fetchPlaces(1);
```

### Props and Events for Component Communication

Parent-child communication uses standard Vue patterns:

```vue
<!-- Parent -->
<PlaceCard 
  :place="place" 
  @click="handleCardClick" 
/>

<!-- Child -->
<script setup>
const props = defineProps(['place']);
const emit = defineEmits(['click']);
</script>
```

## Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                      View Component                       │
│                                                          │
│  ┌─────────┐  calls   ┌─────────────┐  returns  ┌─────┐ │
│  │ onMount │ ───────▶ │ API Service │ ────────▶ │ ref │ │
│  └─────────┘          └─────────────┘           └─────┘ │
│                                                    │     │
│                                                    ▼     │
│                                              ┌─────────┐ │
│                                              │ Template│ │
│                                              └─────────┘ │
└──────────────────────────────────────────────────────────┘
```

## When to Consider Global State

Add Pinia only if the app grows to need:
- User authentication state
- Shopping cart or similar cross-page state
- Complex form data that persists across routes
- Real-time collaborative features

For this read-only heritage site viewer, local state is sufficient.

## Notification Service

The one piece of "shared" state is the notification service (`src/web/src/services/notificationService.js`), which provides toast notifications:

```javascript
import { useNotificationService } from "@/services/notificationService";

const { showSuccess, showError } = useNotificationService();
showSuccess("Place loaded");
showError("Failed to load data");
```

Note: This service currently creates new refs per call. If notifications need to work across components, refactor to use module-level shared refs.
