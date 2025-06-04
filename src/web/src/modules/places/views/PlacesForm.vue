<template>
  <div class="places-form">
    <PlaceHeader
      :current-lang="currentLang"
      :place-name="currentPlace?.name"
      @lang-change="handleLangChange"
    />

    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-2">{{ communityName }}</h1>
          <div class="d-flex justify-end">
            <v-btn
              v-if="!isMobile"
              class="button mx-1"
              @click="handlePrint"
              color="primary"
              variant="flat"
            >
              Print
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <PlaceGallery :place-id="currentPlaceId" :photos="photos" />
        </v-col>
        <v-col cols="12" md="4">
          <v-card color="#BDBDBD" class="mx-auto" :height="mapHeight">
            <PlaceLocationMap
              :latitude="latitude"
              :longitude="longitude"
              :place-name="primaryName"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h4 class="text-h5">{{ primaryName }}</h4>
          <div class="text-subtitle-1">
            {{ currentPlace?.constructionPeriod }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <PlaceInfo
            :designations="currentPlace?.designations || []"
            :place-description="fieldsByLang[currentLang].placeDescription"
            :heritage-value="fieldsByLang[currentLang].heritageValue"
            :character-defining-elements="
              currentPlace?.heritageValues?.find(
                (v) => v.title === 'Character Defining Elements'
              )?.content || []
            "
            :boundaries="
              currentPlace?.heritageValues?.find(
                (v) => v.title === 'Description of Boundaries'
              )?.content || []
            "
            :cultural-history="currentPlace?.culturalHistory"
            :historical-sources="currentPlace?.historicalSources || []"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PlaceLocationMap from "@/modules/map/components/PlaceLocationMap.vue";
import PlaceGallery from "../components/PlaceGallery.vue";
import PlaceHeader from "../components/PlaceHeader.vue";
import PlaceInfo from "../components/PlaceInfo.vue";
import { fetchPlaceById } from "../services/placesApi";

export default {
  name: "PlacesForm",
  components: {
    PlaceHeader,
    PlaceGallery,
    PlaceLocationMap,
    PlaceInfo,
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
    panel: [0, 1, 2, 3],
    fieldsByLang: {
      EN: {
        placeDescription: "",
        heritageValue: "",
        characterDef: "",
        descBound: "",
        additionalInfo: "",
      },
      Fr: {
        placeDescription: "",
        heritageValue: "",
        characterDef: "",
        descBound: "",
        additionalInfo: "",
      },
    },
    primaryName: "",
    communityName: "",
    latitude: "",
    longitude: "",
    recognitionDate: "",
    designations: "",
    photos: [1, 2, 3, 4],
    infoLoaded: false,
    loading: false,
    error: null,
    currentPlace: null,
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
        const place = await fetchPlaceById(this.currentPlaceId);
        this.currentPlace = place;

        // Map basic information
        this.primaryName = place.name;
        this.communityName = place.location;
        this.latitude = place.coordinates[0];
        this.longitude = place.coordinates[1];

        // Map designations
        this.designations = place.designations
          .map((designation) => ({
            level: designation.level,
            date: designation.date,
            bylaw: designation.bylaw,
            reasons: designation.reasons.join(", "),
          }))
          .join("\n");

        // Map heritage values
        const heritageValues = place.heritageValues.reduce((acc, value) => {
          acc[value.title.toLowerCase().replace(/\s+/g, "")] = Array.isArray(
            value.content
          )
            ? value.content.join("\n")
            : value.content;
          return acc;
        }, {});

        // Map language fields
        this.fieldsByLang.EN = {
          placeDescription: place.description,
          heritageValue: place.description,
          characterDef: heritageValues.characterdefiningelements || "",
          descBound: heritageValues.descriptionofboundaries || "",
          additionalInfo: place.culturalHistory || "",
        };

        // For now, using English content for French
        this.fieldsByLang.Fr = { ...this.fieldsByLang.EN };

        this.infoLoaded = true;
      } catch (error) {
        console.error("Error fetching place details:", error);
        this.error = "Failed to load place details. Please try again later.";
      } finally {
        this.loading = false;
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
.places-form {
  min-height: 100vh;
}

.button {
  background-color: #0097a9 !important;
  color: white !important;
}

@media print {
  .button {
    display: none;
  }
}

@media (max-width: 600px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }

  .text-h5 {
    font-size: 1.25rem !important;
  }
}
</style>
