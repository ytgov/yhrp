<template>
  <div class="fill-height">
    <PlaceHeader
      :current-lang="currentLang"
      :place-name="placeData?.name"
      @lang-change="handleLangChange"
      @print="handlePrint"
    />

    <v-container>
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>

      <template v-else-if="error">
        <v-row>
          <v-col cols="12" class="text-center">
            <v-alert type="error">{{ error }}</v-alert>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="placeData">
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 mb-2">{{ placeData.name }}</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8">
            <PlaceGallery :place-id="currentPlaceId" :photos="photos" />
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="#BDBDBD" class="mx-auto" :height="mapHeight">
              <PlaceLocationMap
                :latitude="placeData.coordinates[0]"
                :longitude="placeData.coordinates[1]"
                :place-name="placeData.name"
              />
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h4 class="text-subtitle-1 mb-4">
              {{
                placeData.description ||
                placeData.teaserEnglish ||
                placeData.placeDescriptionEn ||
                ""
              }}
            </h4>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-title class="bg-grey-lighten-4"
                  >Designation</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="preformatted">
                    <strong>Level:</strong>
                    {{ placeData.designations[0]?.level || "" }}<br />
                    <strong>Date:</strong>
                    {{ placeData.designations[0]?.date || "" }}
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title class="bg-grey-lighten-4"
                  >Place Description</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="preformatted">
                    {{ placeData.placeDescriptionEn }}
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title class="bg-grey-lighten-4"
                  >Heritage Value</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="preformatted">
                    {{ placeData.heritageValueEn }}
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title class="bg-grey-lighten-4"
                  >Character Definition</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="preformatted">
                    {{ placeData.characterDefEn }}
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title class="bg-grey-lighten-4"
                  >Additional Information</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="preformatted">
                    {{ placeData.additionalInfoEn }}
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title class="bg-grey-lighten-4"
                  >Description of Boundaries</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <div class="preformatted">
                    {{ placeData.descBoundEn }}
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>

        <!-- Debug section -->
        <v-row>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title class="bg-grey-lighten-4"
                  >Debug: Raw API Data</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <pre
                    class="pa-4 rounded bg-grey-lighten-3 text-body-2"
                    style="white-space: pre-wrap; word-break: break-word"
                  >
                    {{ JSON.stringify(placeData, null, 2) }}
                  </pre>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import PlaceLocationMap from "@/modules/map/components/PlaceLocationMap.vue";
import PlaceDesignation from "../components/PlaceDesignation.vue";
import PlaceGallery from "../components/PlaceGallery.vue";
import PlaceHeader from "../components/PlaceHeader.vue";
import { fetchPlaceById, fetchPlacePhotos } from "../services/placesApi";

export default {
  name: "PlacesForm",
  components: {
    PlaceHeader,
    PlaceGallery,
    PlaceLocationMap,
    PlaceDesignation,
  },
  props: {
    placeId: {
      type: [String, Number],
      required: true,
      validator: (value) => {
        return value !== undefined && value !== null && value !== "";
      },
    },
  },
  data: () => ({
    currentLang: "EN",
    photos: [],
    loading: false,
    error: null,
    placeData: null,
    windowWidth: window.innerWidth,
  }),
  computed: {
    currentPlaceId() {
      return this.placeId;
    },
    isMobile() {
      return this.windowWidth < 600;
    },
    mapHeight() {
      return this.windowWidth < 600 ? "300" : "500";
    },
  },
  watch: {
    currentPlaceId: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchPlaceDetails();
          this.fetchPhotos();
        }
      },
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    async fetchPlaceDetails() {
      this.loading = true;
      try {
        this.placeData = await fetchPlaceById(this.currentPlaceId);
      } catch (error) {
        console.error("Error fetching place details:", error);
        this.error = "Failed to load place details. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    async fetchPhotos() {
      try {
        this.photos = await fetchPlacePhotos(this.currentPlaceId);
      } catch (error) {
        console.error("Error fetching photos:", error);
        this.error = "Failed to load photos. Please try again later.";
      }
    },
    handleLangChange(lang) {
      this.currentLang = lang;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    handlePrint() {
      window.print();
    },
  },
};
</script>

<style scoped>
.preformatted {
  white-space: pre-line;
}
</style>
