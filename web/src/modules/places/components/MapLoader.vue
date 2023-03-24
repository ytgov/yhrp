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
					<l-marker
						:draggable="false"
						:lat-lng="marker.latLng"
					>
					</l-marker>
				</l-map>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import { latLng, Icon } from "leaflet";
import {
	LMap,
	LTileLayer,
	LMarker,
} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
// import _ from 'lodash';


/* eslint-enable */
export default {
	components: {
		LMap,
		LTileLayer,
		LMarker,
	},
	data: () => ({
		url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
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
				iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
				iconUrl: require('leaflet/dist/images/marker-icon.png'),
				shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
			});
	},

	methods: {
		getFields() {
			if (!this.fields) {
				return;
			}

			let lat = parseFloat(this.fields.lat);
			let long = parseFloat(this.fields.long);
			this.addMarker(lat, long)

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
