<template>
  <v-row>
    <v-col cols="12">
      <div>
        <l-map
          class="map"
          ref="myMap"
          :center="center"
          :zoom="zoom"
          style="height: 500px; width: 100%"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :draggable="false" :lat-lng="marker.latLng"> </l-marker>
        </l-map>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { Icon, latLng } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
// import _ from 'lodash';

/* eslint-enable */
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    fields: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          Object.prototype.hasOwnProperty.call(value, "lat") &&
          Object.prototype.hasOwnProperty.call(value, "long")
        );
      },
    },
  },
  data: () => ({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    // Site marker
    marker: {
      latLng: [0, 0],
    },
    //predefined map & marker
    zoom: 8,
    center: latLng(64.0, -135.0),
  }),
  async mounted() {
    this.getFields();
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  },

  methods: {
    getFields() {
      if (!this.fields) {
        return;
      }

      let lat = parseFloat(this.fields.lat);
      let long = parseFloat(this.fields.long);
      this.addMarker(lat, long);
    },
    addMarker(lat, long) {
      if (isNaN(lat) || isNaN(long)) return;
      this.center = latLng(lat, long);
      this.marker.latLng = latLng(lat, long);
      this.$refs.myMap.mapObject.panTo(latLng(lat, long));
    },
  },
};
</script>

<style scoped>
.map {
  z-index: 1;
  height: 500px;
}
</style>
