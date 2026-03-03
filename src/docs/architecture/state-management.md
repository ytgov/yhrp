# State Management

## Approach

YHRP uses **local component state** and **service functions** for data fetching. This keeps the codebase simple for a read-only data display application.

## Local Component State

Each component manages its own state using Vue 3's Composition API:

```javascript
const data = ref([]);
const loading = ref(false);
const error = ref(null);
```

## Services for API Calls

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

## Props and Events for Component Communication

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

## Shared Composables

For state that needs to be shared across components (like language preference), we use composables with module-level refs:

```javascript
// In composables/useLanguage.js
const currentLanguage = ref(localStorage.getItem("lang") || "en");

export function useLanguage() {
  return { currentLanguage, toggleLanguage, t };
}
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
