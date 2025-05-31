<template>
  <v-app-bar flat class="text-grey-darken-1">
    <v-breadcrumbs
      :items="[
        {
          title: 'Places',
          disabled: false,
          to: '/places',
        },
        {
          title: currentPlace?.name || '',
          disabled: true,
        },
      ]"
      divider=">"
    >
    </v-breadcrumbs>
    <template v-slot:append>
      <v-tooltip text="English">
        <template v-slot:activator="{ props }">
          <span
            v-bind="props"
            class="text-body-1 font-weight-bold"
            @click="lang('EN')"
            >EN</span
          ></template
        ></v-tooltip
      >|
      <v-tooltip text="Français">
        <template v-slot:activator="{ props }">
          <span
            v-bind="props"
            class="text-body-1 font-weight-bold"
            @click="lang('FR')"
            >FR</span
          ></template
        ></v-tooltip
      >
    </template>
  </v-app-bar>

  <v-container width="100%" class="">
    <v-row justify="center">
      <v-col cols="9">
        <h1>{{ communityName }}</h1>
      </v-col>
      <v-col cols="3">
        <v-btn
          class="button"
          v-if="currentLang == 'En'"
          @click="handleClick('Fr')"
          >Francais</v-btn
        >
        <v-btn
          class="button"
          v-if="currentLang == 'Fr'"
          @click="handleClick('En')"
          >English</v-btn
        >
        <v-btn class="mx-1 form-header">Print</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-card>
          <v-carousel cycle height="500">
            <v-carousel-item
              v-for="(photo, i) in photos"
              :key="i"
              :src="photoURL(i + 1)"
              reverse-transition="fade-transition"
              transition="fade-transition"
              hide-delimiter-background
            ></v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card color="#BDBDBD" class="mx-auto" height="500">
          <div style="height: 500">Map will go here</div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4>{{ primaryName }}</h4>
        <div class="text-subtitle-1">
          {{ currentPlace?.constructionPeriod }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-title color="primary" class="font-weight-black">
              Designation
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                v-for="(designation, index) in currentPlace?.designations"
                :key="index"
              >
                <div class="text-subtitle-1">{{ designation.level }}</div>
                <div>Date: {{ designation.date }}</div>
                <div>Bylaw: {{ designation.bylaw }}</div>
                <div>Reasons:</div>
                <ul>
                  <li
                    v-for="(reason, rIndex) in designation.reasons"
                    :key="rIndex"
                  >
                    {{ reason }}
                  </li>
                </ul>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title color="primary" class="font-weight-black">
              Place Description
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ fieldsByLang[currentLang].placeDescription }}
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title color="primary" class="font-weight-black">
              Heritage Value
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ fieldsByLang[currentLang].heritageValue }}
              <div>
                <v-expansion-panels class="pt-5">
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      color="#BDBDBD"
                      class="font-weight-black"
                    >
                      Character Defining Elements
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <ul>
                        <li
                          v-for="(
                            item, index
                          ) in currentPlace?.heritageValues?.find(
                            (v) => v.title === 'Character Defining Elements'
                          )?.content"
                          :key="index"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      color="#BDBDBD"
                      class="font-weight-black"
                    >
                      Description of Boundaries
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <ul>
                        <li
                          v-for="(
                            item, index
                          ) in currentPlace?.heritageValues?.find(
                            (v) => v.title === 'Description of Boundaries'
                          )?.content"
                          :key="index"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      color="#BDBDBD"
                      class="font-weight-black"
                    >
                      Cultural History
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      {{ currentPlace?.culturalHistory }}
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title color="primary" class="font-weight-black">
              Historical Sources
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                v-for="(source, index) in currentPlace?.historicalSources"
                :key="index"
              >
                <div class="text-subtitle-1">{{ source.title }}</div>
                <ul>
                  <li v-for="(item, i) in source.content" :key="i">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import PrintButton from "../components/PrintButton";
// import MapLoader from "../components/MapLoader";
// import BasicMap from "@/modules/components/BasicMap";

import { fetchPlaceById } from "../services/placesApi";

export default {
  name: "PlacesForm",
  props: {
    placeId: {
      type: [String, Number],
      required: true,
      validator: (value) => {
        return value !== undefined && value !== null && value !== "";
      },
    },
  },
  components: {
    // BasicMap,
    //MapLoader,
    // PrintButton,
  },
  data: () => ({
    currentLang: "En",
    panel: [0, 1, 2, 3],
    fieldsByLang: {
      En: {
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
    selectedImage: null,
    photos: [1, 2, 3, 4],
    infoLoaded: false,
    loading: false,
    error: null,
    currentPlace: null,
  }),
  computed: {
    currentPlaceId() {
      return this.placeId;
    },
    printData() {
      return {
        primaryName: this.primaryName,
        communityName: this.communityName,
        latitude: this.latitude,
        longitude: this.longitude,
        recognitionDate: this.recognitionDate,
        designations: this.designations,
        ...this.fieldsByLang[this.currentLang],
      };
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
        this.fieldsByLang.En = {
          placeDescription: place.description,
          heritageValue: place.description, // Using description as heritage value for now
          characterDef: heritageValues.characterdefiningelements || "",
          descBound: heritageValues.descriptionofboundaries || "",
          additionalInfo: place.culturalHistory || "",
        };

        // For now, using English content for French
        this.fieldsByLang.Fr = { ...this.fieldsByLang.En };

        this.infoLoaded = true;
      } catch (error) {
        console.error("Error fetching place details:", error);
        this.error = "Failed to load place details. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    photoURL(index) {
      return `http://register.yukonhistoricplaces.ca/Images/Places/${this.currentPlaceId}/${index}.jpg`;
    },
    handleClick(lang) {
      this.currentLang = lang;
    },
    lang(lang) {
      this.currentLang = lang;
    },
  },
};
</script>

<style>
/* Custom CSS for the query builder */
.button {
  background-color: #0097a9 !important;
}
</style>
