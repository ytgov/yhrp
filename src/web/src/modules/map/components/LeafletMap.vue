<template>
  <div class="place-map" ref="mapContainer">
    <div class="layer-control">
      <v-btn
        v-for="layer in baseLayers"
        :key="layer.id"
        size="small"
        :color="currentLayer === layer.id ? 'primary' : 'grey'"
        class="layer-btn"
        @click="changeBaseLayer(layer.id)"
        :title="layer.name"
      >
        <v-icon>{{ layer.icon }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { fetchPlacePhotos, fetchPlaces } from "../../places/services/placesApi";
import { createTealPinMarker } from "../utils/markerDefinitions";
import "../utils/markerStyles.css";

// Reactive refs
const mapContainer = ref(null);
const currentLayer = ref("esri-topo");
const isLoading = ref(false);
const photoUrls = ref(new Map());

// Map instance refs
let map = null;
let currentBaseLayer = null;
let placesLayer = null;

// Base layer configuration
const baseLayers = [
  {
    id: "esri-topo",
    name: "Topographic",
    icon: "mdi-map",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
  },
  {
    id: "satellite",
    name: "Satellite",
    icon: "mdi-satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "© Esri",
  },
  {
    id: "terrain",
    name: "Terrain",
    icon: "mdi-terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "© OpenTopoMap",
  },
];

// Extract coordinates from place data
const extractCoordinates = (place) => {
  // Handle coordinates in array format [latitude, longitude]
  if (
    place.coordinates &&
    Array.isArray(place.coordinates) &&
    place.coordinates.length === 2
  ) {
    return {
      latitude: place.coordinates[0],
      longitude: place.coordinates[1],
    };
  }

  // Fallback to separate latitude/longitude properties
  if (place.latitude && place.longitude) {
    return {
      latitude: place.latitude,
      longitude: place.longitude,
    };
  }

  return null;
};

const loadPhotoUrls = async (places) => {
  for (const place of places) {
    try {
      const photos = await fetchPlacePhotos(place.id);
      if (photos && photos.length > 0) {
        photoUrls.value.set(place.id, photos[0].imageUrl);
      }
    } catch (error) {
      console.error(`Error loading photo for place ${place.id}:`, error);
    }
  }
};

// Load places and add them to the map
const loadPlaces = async () => {
  try {
    isLoading.value = true;
    console.log("Loading places...");

    const response = await fetchPlaces(); // Load first 100 places
    console.log("Places response:", response);

    if (!response?.places) {
      console.log("No places data in response");
      return;
    }

    const places = response.places;
    console.log("Places data:", places);

    await loadPhotoUrls(places);

    // Create a layer group for places
    if (placesLayer) {
      map.removeLayer(placesLayer);
    }
    placesLayer = L.layerGroup();

    for (const place of places) {
      const coordinates = extractCoordinates(place);

      if (!coordinates) {
        console.log("Place missing coordinates:", place);
        continue;
      }

      const { latitude, longitude } = coordinates;

      const marker = L.marker([latitude, longitude], {
        icon: createTealPinMarker(),
      });

      const title = place.name || "Untitled Place";
      const thumbnail = photoUrls.value.get(place.id) || "";
      const placeId = place.id;

      // Use plain HTML for the popup content
      let popupHtml = `<div class='place-popup' style='text-align:center; max-width:600px; background-color: white; padding: 16px; border-radius: 4px;'>`;

      if (thumbnail) {
        popupHtml += `<img src='${thumbnail}' alt='${title}' style='max-width:250px; border-radius:8px; margin-bottom:12px; display:block; margin-left:auto; margin-right:auto;' />`;
      }

      popupHtml += `<div style='font-size:18px; font-weight:600; margin-bottom:12px; color:#333;'>${title}</div>`;

      if (placeId) {
        popupHtml += `<a href='/places/view/${placeId}' target='_blank' style='display:inline-block; padding:8px 16px; background:#0097a9; color:white; border-radius:4px; text-decoration:none; font-size:14px; font-weight:500;'>View Details</a>`;
      }

      popupHtml += `</div>`;

      marker.bindPopup(popupHtml, {
        className: "custom-popup",
        closeButton: false,
      });

      placesLayer.addLayer(marker);
    }

    placesLayer.addTo(map);
    console.log("Places layer added to map");
  } catch (error) {
    console.error("Error loading places:", error);
  } finally {
    isLoading.value = false;
  }
};

// Change base layer
const changeBaseLayer = (layerId) => {
  console.log("changeBaseLayer called with:", layerId);
  const layer = baseLayers.find((l) => l.id === layerId);

  if (!layer || !map) {
    return;
  }

  if (currentBaseLayer) {
    console.log("Removing current base layer");
    map.removeLayer(currentBaseLayer);
  }

  console.log("Adding tile layer");
  currentBaseLayer = L.tileLayer(layer.url, {
    attribution: layer.attribution,
  }).addTo(map);

  currentLayer.value = layerId;
};

// Initialize map
const initMap = async () => {
  console.log("initMap called");
  if (!mapContainer.value) {
    console.error("mapContainer is null");
    return;
  }

  console.log("Initializing map...");
  // Initialize the map centered on Yukon
  map = L.map(mapContainer.value).setView([64.8255, -135.0], 6);
  console.log("Map initialized:", map);

  // Set initial base layer
  console.log("Setting initial base layer");
  changeBaseLayer("esri-topo");

  // Load places
  await loadPlaces();
};

// Cleanup function
const cleanup = () => {
  if (map) {
    map.remove();
    map = null;
  }
  currentBaseLayer = null;
  placesLayer = null;
};

// Lifecycle hooks
onMounted(async () => {
  await nextTick();
  await initMap();
});

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
.place-map {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
}

.layer-control {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  padding: 3px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.layer-btn {
  min-width: 30px !important;
  height: 30px !important;
  padding: 0 !important;
}

:deep(.layer-btn .v-icon) {
  font-size: 18px !important;
}

/* Popup Styles for LeafletMap */
:deep(.custom-popup .leaflet-popup-content-wrapper) {
  background: white;
  color: #333;
  border-radius: 4px;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.custom-popup .leaflet-popup-tip) {
  background: white;
}

:deep(.custom-popup .leaflet-popup-content) {
  margin: 0;
  padding: 0;
}

:deep(.custom-popup .leaflet-popup-close-button) {
  color: #666;
  font-size: 18px;
  padding: 8px;
}
</style>
