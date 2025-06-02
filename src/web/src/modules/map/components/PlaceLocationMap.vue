<template>
  <div class="place-map" ref="mapContainer"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref, watch } from "vue";

export default {
  name: "PlaceLocationMap",
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    placeName: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const mapContainer = ref(null);
    let map = null;
    let marker = null;

    const initMap = () => {
      if (!mapContainer.value) return;

      // Initialize the map
      map = L.map(mapContainer.value).setView(
        [props.latitude, props.longitude],
        13
      );

      // Add the OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add marker
      marker = L.marker([props.latitude, props.longitude])
        .addTo(map)
        .bindPopup(props.placeName || "Location");
    };

    // Watch for changes in coordinates
    watch(
      () => [props.latitude, props.longitude],
      ([newLat, newLng]) => {
        if (map && marker) {
          marker.setLatLng([newLat, newLng]);
          map.setView([newLat, newLng]);
        }
      }
    );

    onMounted(() => {
      initMap();
    });

    return {
      mapContainer,
    };
  },
};
</script>

<style scoped>
.place-map {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
