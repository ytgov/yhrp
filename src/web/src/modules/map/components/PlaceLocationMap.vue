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

<script>
import * as esriLeaflet from "esri-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { nextTick, onMounted, ref, watch } from "vue";

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
    let currentBaseLayer = null;
    const currentLayer = ref("esri-topo");

    const baseLayers = [
      {
        id: "esri-topo",
        name: "Topographic",
        icon: "mdi-map",
        esri: true,
        attribution:
          "Tiles © Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
      },
      // {
      //   id: "streets",
      //   name: "Streets",
      //   icon: "mdi-map",
      //   url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      //   attribution: "© OpenStreetMap contributors",
      // },
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

    const changeBaseLayer = (layerId) => {
      console.log("changeBaseLayer called with:", layerId);
      const layer = baseLayers.find((l) => l.id === layerId);
      if (layer && map) {
        if (currentBaseLayer) {
          console.log("Removing current base layer");
          map.removeLayer(currentBaseLayer);
        }
        if (layer.esri) {
          console.log("ESRI Leaflet available:", !!esriLeaflet);
          if (!esriLeaflet) {
            console.error("ESRI Leaflet not loaded");
            return;
          }
          console.log("Adding ESRI base layer");
          currentBaseLayer = esriLeaflet
            .basemapLayer("Topographic", {
              attribution: layer.attribution,
            })
            .addTo(map);
        } else {
          console.log("Adding standard tile layer");
          currentBaseLayer = L.tileLayer(layer.url, {
            attribution: layer.attribution,
          }).addTo(map);
        }
        currentLayer.value = layerId;
      }
    };

    const initMap = () => {
      console.log("initMap called");
      if (!mapContainer.value) {
        console.error("mapContainer is null");
        return;
      }

      console.log(
        "Initializing map with coordinates:",
        props.latitude,
        props.longitude
      );
      // Initialize the map
      map = L.map(mapContainer.value).setView(
        [props.latitude, props.longitude],
        13
      );
      console.log("Map initialized:", map);

      // Create custom icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="marker-pin"></div>
        `,
        iconSize: [25, 35],
        iconAnchor: [12.5, 35],
        popupAnchor: [0, -35],
      });

      // Add marker with custom icon
      marker = L.marker([props.latitude, props.longitude], {
        icon: customIcon,
      })
        .addTo(map)
        .bindPopup("", {
          className: "custom-popup",
          closeButton: false,
        });
      console.log("Marker added:", marker);

      // Set initial base layer
      console.log("Setting initial base layer");
      changeBaseLayer("esri-topo");
      console.log("centerMapOnMarker");
      centerMapOnMarker();
    };

    const centerMapOnMarker = () => {
      if (map && marker) {
        map.setView(marker.getLatLng(), map.getZoom(), {
          animate: true,
          duration: 1,
        });
      }
    };

    const updatePopupContent = async () => {
      if (marker) {
        await nextTick();
        marker.setPopupContent(
          `<div class="popup-content">${props.placeName}</div>`
        );
        marker.openPopup();
      }
    };

    // Watch for changes in coordinates
    watch(
      () => [props.latitude, props.longitude],
      ([newLat, newLng]) => {
        if (map && marker) {
          marker.setLatLng([newLat, newLng]);
          centerMapOnMarker();
        }
      }
    );

    // Watch for changes in placeName
    watch(
      () => props.placeName,
      () => {
        updatePopupContent();
      }
    );

    onMounted(async () => {
      await nextTick();
      initMap();
      updatePopupContent();
    });

    return {
      mapContainer,
      baseLayers,
      currentLayer,
      changeBaseLayer,
    };
  },
};
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
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
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

:deep(.custom-marker) {
  position: relative;
}

:deep(.marker-pin) {
  width: 25px;
  height: 25px;
  border-radius: 50% 50% 50% 0;
  background: #0097a9;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -12.5px 0 0 -12.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

:deep(.marker-pin::after) {
  content: "";
  width: 11px;
  height: 11px;
  position: absolute;
  background: #fff;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

:deep(.custom-popup .leaflet-popup-content-wrapper) {
  background: #0097a9;
  color: white;
  border-radius: 4px;
  padding: 8px 12px;
}

:deep(.custom-popup .leaflet-popup-tip) {
  background: #0097a9;
}

:deep(.custom-popup .leaflet-popup-content) {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  color: white;
}

:deep(.popup-content) {
  color: white;
  text-align: center;
  font-weight: bold;
}
</style>
